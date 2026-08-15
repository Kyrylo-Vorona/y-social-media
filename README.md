# KAS Social Media

KAS is a small React and TypeScript social feed. It supports browsing and searching posts, opening a post with its comments, creating a post, and deleting a post. Posts are stored in browser memory for this MVP, so refreshing restores the example feed.

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

```bash
docker build -t y-social-media .
docker run --rm -p 3000:3000 y-social-media
```

Open http://localhost:3000. The included `fly.toml` is configured to deploy the same Docker image to Fly.io.



by 

Azade - Samuele - Kyrylo



Deployed site

https://flykas.fly.dev/



GitHub link: [Kyrylo-Vorona/y-social-media](https://github.com/Kyrylo-Vorona/y-social-media)

