# Portfolio deployment

Every push to `main` runs `.github/workflows/deploy.yml`.
The workflow can also be run manually on `main`.

GitHub builds with Node 22 and packages Next.js standalone output, public/static assets,
sharp, and the same Linux Node executable. The VM does not install dependencies or build.
Production environment secrets are `VM_SSH_PRIVATE_KEY` and `VM_SSH_KNOWN_HOSTS`;
repository variable `VM_HOST` selects the server. Secrets are never committed.
The production environment allows deployments from `main` only.

## Server layout

- Google Cloud: `junyeopn-devblog`, `us-central1-c`, `instance-20250329-041212`.
- Website: `https://junyeopnaportfolio.dev` (also `www`).
- Original checkout: `/home/ns090200/portfolio_website`, retained for recovery.
- Releases: `/mnt/data/portfolio/releases/<commit SHA>`; `current` and `previous` symlinks.
- Service: `portfolio.service`, running as `portfolio-deploy` on loopback port 3001.
- Preview: temporary loopback port 3002; Nginx proxies production to port 3001.
- Installed deployment handler: `/usr/local/lib/portfolio/deploy.sh` and archive validator.
- SSH key is restricted to the fixed deployment handler, without PTY/forwarding.
- The deployment user can sudo only `systemctl restart portfolio.service`.

`bootstrap.sh` is a one-time administrator setup. It copies the original runtime to
the data disk and starts it under systemd. Before changing Nginx, verify port 3001.
Only the portfolio virtual host's upstream should change from 3000 to 3001; the blog
and TLS configuration are separate and remain untouched. Keep a copy of that virtual
host before changing it, and run `sudo nginx -t` before reloading.

The handler validates archive paths, types, sizes and the revision marker. It starts
the release on port 3002, checks the revision, homepage and image optimizer, then switches
`current` and restarts systemd. An activation failure restores the old symlink and service.
A VM lock and workflow concurrency prevent overlapping deployments. Five recent/active
releases are retained, plus the legacy bootstrap. The workflow checks the public revision
after the VM has activated it. A public connectivity failure fails the job for investigation;
it does not reverse a healthy local release.

## Inspect or recover

As the VM administrator:

```sh
sudo systemctl status portfolio.service
sudo journalctl -u portfolio.service -n 100 --no-pager
readlink -f /mnt/data/portfolio/current
curl -fsS http://127.0.0.1:3001/deployment-revision.txt
curl -fsS https://junyeopnaportfolio.dev/deployment-revision.txt
```

For a manual rollback, hold the same deployment lock, select the saved previous
release, and restart the service:

```sh
sudo -u portfolio-deploy bash -c '
  set -eu
  base=/mnt/data/portfolio
  exec 9>"$base/deploy.lock"
  flock -w 600 9
  previous=$(readlink -f "$base/previous")
  test -f "$previous/start.sh"
  ln -sfn "$previous" "$base/current.next"
  mv -Tf "$base/current.next" "$base/current"
  sudo -n /usr/bin/systemctl restart portfolio.service
'
```

Then check the local and public revision endpoints. Failed preview releases do not
change `current`; rerunning a deployment for an already-staged SHA reuses its release.
Rerunning an already-healthy active SHA preserves the previous rollback target.
To change installed deploy scripts or the service definition, review and reinstall
those files as administrator; an ordinary application deployment cannot rewrite them.
To rotate credentials, replace the restricted authorized key and the matching GitHub
environment secret together. Keep host-key verification enabled.
