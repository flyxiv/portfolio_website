#!/usr/bin/env bash
# Run once as root from a reviewed copy of scripts/deploy on the VM.
set -euo pipefail
base=/mnt/data/portfolio
legacy=/home/ns090200/portfolio_website
here=$(cd -- "$(dirname -- "$0")" && pwd)
if ! id portfolio-deploy >/dev/null 2>&1; then
  useradd --system --home-dir "$base" --shell /bin/bash --user-group portfolio-deploy
fi
install -d -m 755 -o portfolio-deploy -g portfolio-deploy "$base" "$base/releases"
install -d -m 755 /usr/local/lib/portfolio
install -m 755 "$here/deploy.sh" /usr/local/lib/portfolio/deploy.sh
install -m 644 "$here/extract-release.py" /usr/local/lib/portfolio/extract-release.py
install -m 644 "$here/portfolio.service" /etc/systemd/system/portfolio.service
printf 'portfolio-deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart portfolio.service\n' > /etc/sudoers.d/portfolio-deploy
chmod 440 /etc/sudoers.d/portfolio-deploy
visudo -cf /etc/sudoers.d/portfolio-deploy
if [[ ! -L "$base/current" ]]; then
  bootstrap="$base/releases/bootstrap"
  install -d -m 755 "$bootstrap"
  for item in .next node_modules public package.json next.config.js; do
    cp -a "$legacy/$item" "$bootstrap/"
  done
  printf 'legacy-%s\n' "$(git -C "$legacy" rev-parse HEAD)" > "$bootstrap/public/deployment-revision.txt"
  cat > "$bootstrap/start.sh" <<'START'
#!/usr/bin/env bash
set -euo pipefail
exec /usr/bin/node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port "${PORT:-3001}"
START
  chmod 755 "$bootstrap/start.sh"
  chown -R portfolio-deploy:portfolio-deploy "$bootstrap"
  ln -s "$bootstrap" "$base/current"
fi
systemctl daemon-reload
systemctl enable --now portfolio.service
# Nginx is switched separately only after verifying this bootstrap runtime.
