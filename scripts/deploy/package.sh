#!/usr/bin/env bash
set -euo pipefail
revision=${1:?Expected commit SHA}
archive=${2:?Expected archive output path}
[[ "$revision" =~ ^[0-9a-f]{40}$ ]] || { echo 'Invalid revision' >&2; exit 1; }
[[ $(uname -s) == Linux && $(uname -m) == x86_64 ]] || { echo 'Package on Linux x64' >&2; exit 1; }
test -f .next/standalone/server.js
stage=$(mktemp -d)
trap 'rm -rf -- "$stage"' EXIT
cp -a .next/standalone/. "$stage/"
mkdir -p "$stage/.next"
cp -a .next/static "$stage/.next/static"
cp -a public "$stage/public"
cp "$(command -v node)" "$stage/node"
printf '%s\n' "$revision" > "$stage/public/deployment-revision.txt"
cat > "$stage/start.sh" <<'START'
#!/usr/bin/env bash
set -euo pipefail
exec ./node server.js
START
chmod 755 "$stage/node" "$stage/start.sh"
tar -C "$stage" -czf "$archive" .
echo "Packaged revision $revision ($(du -h "$archive" | cut -f1))"
