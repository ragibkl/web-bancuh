# web-bancuh

The website for [Bancuh DNS](https://bancuh.com), a free public adblock DNS
service. Built with [Astro](https://astro.build) and
[Starlight](https://starlight.astro.build), and served as static files by nginx.

## Development

Uses the Node version in `.tool-versions` (mise or asdf will pick it up).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-checks, then builds to dist/
npm run preview  # serves dist/
npm run fmt      # prettier
```

## Where things are

| Path                      | What                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `src/content/docs/`       | Every page, in Markdown/MDX. The URL follows the file path.                                       |
| `astro.config.mjs`        | Site settings and the sidebar.                                                                    |
| `src/data/servers.yaml`   | The public DNS servers. Every page, table, map pin and Apple profile is generated from this file. |
| `src/data/locations.yaml` | Server locations and their map coordinates.                                                       |
| `src/components/`         | The server map, server tables and the location picker used by the setup guides.                   |
| `src/pages/profiles/`     | Generates an Apple `.mobileconfig` profile per server.                                            |

### Adding or removing a server

Edit `src/data/servers.yaml` (and `locations.yaml` for a new location). The
build fails if an entry has a missing field or a malformed IP address.

The same server list also lives in the Gatus config in `ragibkl/flux-deploy`
and in `adblock-dns-server/scripts/`, so update those too.

## Releasing

CI builds the site on every pull request and push, then publishes
`ghcr.io/ragibkl/web-bancuh:sha-<short sha>`. Pull requests also get
`pr-<number>`, and `master` also gets `latest`.

To roll out, set the image tag in `ragibkl/flux-deploy`
(`clusters/vmbr1-k3s/services/bancuh-web/web-bancuh.yaml`) to the new
`sha-` tag.

The image is `nginx-unprivileged` listening on port 8080.
