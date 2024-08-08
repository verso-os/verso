# Verso

Open source authentication as a service.

## Development Requirements

-   pnpm
-   EdgeDB

## Getting started

First, initialize the database.

```bash
cd packages/database && edgedb project init
```

Install the EdgeDB CLI if you don't have it already.

```bash
curl https://sh.edgedb.com --proto '=https' -sSf1 | sh
```

Then generate the query builder.

```bash
pnpm generate
```

Now the development server can be ran.

```bash
cd ../.. &&  pnpm dev
```
