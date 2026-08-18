# KAS Social Media

KAS is a small React and TypeScript social feed powered by the DummyJSON API. It supports browsing and searching posts, reading a post with its comments, creating a post, and deleting a post from its detail page.

DummyJSON simulates create and delete operations without saving them permanently. KAS therefore keeps those changes in browser memory until the page is refreshed.

## Run with Bun

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To build the production assets:

```bash
bun run build
```

To run the production server:

```bash
bun start
```

## Run in Docker

On Windows, Docker Desktop needs WSL 2. Open PowerShell as administrator once,
run `wsl --install`, and restart Windows if requested.

```bash
docker build -t y-social-media .
docker run --rm -p 3000:3000 y-social-media
```

Open http://localhost:3000. The included `fly.toml` is configured to deploy the same Docker image to Fly.io.

## Project links

- Deployed site: https://flykas.fly.dev/
- GitHub: https://github.com/Kyrylo-Vorona/y-social-media
- Authors: Azade, Samuele, Kyrylo

