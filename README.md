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

Then generate the query builder.

```bash
pnpm generate
```

Now the development server can be ran.

```bash
cd ../.. &&  pnpm dev
```
