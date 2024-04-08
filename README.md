# NFT-marketplace-web
This is the Next.js frontend repo for the Trait Marketplace project. This repo will perform on-chain actions using Metamask wallet and Mumbai network, and perform off-chain actions by calling the backend API.

### Prerequisites

In order to compile and run everything you will need:

- Node installed (^[v18.14.2](https://nodejs.org/en/blog/release/v18.14.2) recommended)

- Yarn installed (^1.22.19 recommended)

## Install and Setup

Install the app with yarn:

### `yarn install`

### `yarn compile`

Then copy file env.example and rename it to .env:
```sh
    cp env.example .env
```

## Start with localhost

Runs the app in the development mode.

### `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Build into production

### `yarn build`

Builds the app for production to the `.next` folder. After run:

### `yarn start`

for start production mode.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
