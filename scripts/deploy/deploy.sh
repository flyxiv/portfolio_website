#!/usr/bin/env bash
# Installed root-owned; called only through the forced SSH command.
set -Eeuo pipefail
umask 027
base=/mnt/data/portfolio
[[ "${SSH_ORIGINAL_COMMAND:-}" =~ ^deploy\ ([0-9a-f]{40})$ ]] || { echo 'Only deploy <commit SHA> is allowed' >&2; exit 1; }
revision=${BASH_REMATCH[1]}
exec 9>"$base/deploy.lock"
flock -w 600 9 || { echo 'Deployment is busy' >&2; exit 1; }
incoming=$(mktemp -d "$base/releases/.incoming.XXXXXX")
preview_pid=''
previous=$(readlink -f "$base/current")
switched=false

point_current() {
  ln -sfn "$1" "$base/current.next"
  mv -Tf "$base/current.next" "$base/current"
}

cleanup() {
  result=$?
  trap - EXIT
  set +e
  if [[ -n "$preview_pid" ]]; then kill "$preview_pid" 2>/dev/null; wait "$preview_pid" 2>/dev/null; fi
  if [[ $result -ne 0 && "$switched" == true ]]; then
    echo "Activation failed; restoring $previous" >&2
    point_current "$previous"
    sudo -n /usr/bin/systemctl restart portfolio.service
    if healthy 3001 "$(cat "$previous/public/deployment-revision.txt")"; then
      echo 'Previous release restored' >&2
    else
      echo 'CRITICAL: rollback health check failed' >&2
    fi
  fi
  rm -rf -- "$incoming"
  exit "$result"
}
trap cleanup EXIT

healthy() {
  local port=$1 expected=$2 actual
  for attempt in $(seq 1 30); do
    actual=$(curl -fsS --max-time 2 "http://127.0.0.1:$port/deployment-revision.txt" 2>/dev/null) || actual=''
    if [[ "$actual" == "$expected" ]] && curl -fsS --max-time 5 "http://127.0.0.1:$port/" -o /dev/null; then return 0; fi
    sleep 1
  done
  return 1
}

# Limit compressed input before parsing; extraction validates expanded sizes/paths.
head -c 262144001 > "$incoming/release.tar.gz"
[[ $(stat -c %s "$incoming/release.tar.gz") -le 262144000 ]] || { echo 'Archive too large' >&2; exit 1; }
mkdir "$incoming/unpacked"
python3 /usr/local/lib/portfolio/extract-release.py "$incoming/release.tar.gz" "$incoming/unpacked"
[[ $(cat "$incoming/unpacked/public/deployment-revision.txt") == "$revision" ]] || { echo 'Revision mismatch' >&2; exit 1; }
release="$base/releases/$revision"
if [[ ! -d "$release" ]]; then mv "$incoming/unpacked" "$release"; fi
if [[ "$release" == "$previous" ]] && healthy 3001 "$revision"; then
  echo "Already active: $revision (previous rollback target preserved)"
  exit 0
fi
cd "$release"
PORT=3002 HOSTNAME=127.0.0.1 NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 \
  /bin/bash ./start.sh > "$incoming/preview.log" 2>&1 &
preview_pid=$!
if ! healthy 3002 "$revision"; then cat "$incoming/preview.log" >&2; exit 1; fi
curl -fsS --max-time 30 'http://127.0.0.1:3002/_next/image?url=%2Fimages%2Fnaver_icon.png&w=96&q=75' -o /dev/null
kill "$preview_pid"
wait "$preview_pid" 2>/dev/null || true
preview_pid=''
point_current "$release"
switched=true
sudo -n /usr/bin/systemctl restart portfolio.service
healthy 3001 "$revision"
ln -sfn "$previous" "$base/previous"
switched=false
echo "Activated $revision"

# Keep the active release, previous release, and three other recent releases.
kept=0
while IFS= read -r candidate; do
  [[ "$candidate" =~ ^[0-9a-f]{40}$ ]] || continue
  path="$base/releases/$candidate"
  [[ "$path" == "$release" || "$path" == "$previous" ]] && continue
  kept=$((kept + 1))
  if [[ $kept -gt 3 ]]; then rm -rf -- "$path"; fi
done < <(find "$base/releases" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %f\n' | sort -nr | cut -d' ' -f2)
