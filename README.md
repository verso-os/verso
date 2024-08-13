# Verso

Open source authentication as a service.

## Development Requirements

-   pnpm
-   EdgeDB

## Getting started

Install the EdgeDB CLI if you don't have it already.

```bash
curl https://sh.edgedb.com --proto '=https' -sSf1 | sh
```

First, initialize the database.

```bash
cd packages/database && edgedb project init
```

Then create the test branch

```bash
edgedb branch create test
```

Then generate the query builder.

```bash
pnpm generate
```

Now the development server can be ran.

```bash
cd ../.. &&  pnpm dev
```
