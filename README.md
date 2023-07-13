---
title: ExpressJS Postgres
description: An ExpressJS server that connects to a PostgreSQL database
tags:
  - express
  - postgresql
  - typescript
---

# ExpressJS Postgres Example

This example starts an [ExpressJS](https://expressjs.com/) server that connects
to a Railway PostgreSQL database.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/VUVlu3)

## ✨ Features

- Postgres
- Express
- TypeScript

## 💁‍♀️ How to use

- Install dependencies `yarn`
- [Create a Railway project with the Postgres plugin](https://dev.new)
- Connect to your Railway project `railway link`
- Start the server `railway run yarn dev`

## 📝 Notes

The server started simply returns the current time in the database. The SQL
query is located in `src/index.js`.

## Queries for later

### Get Book Counts By Month/Year

SELECT date_trunc('month', dateread) AS txn_month, sum(pagecount) as monthly_sum
FROM book
GROUP BY txn_month
