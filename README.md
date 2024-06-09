# FinansFokus
## The web application
The project focuses on simplifying financial management. The app enables users to effortlessly create accounting spreadsheets tailored to specific purposes. Each user can create categories and subcategories within these spreadsheets. Users can add transactions to specific subcategories, making it easy to see which categories incur the most and least expenses. This feature significantly simplifies personal financial management. Additionally, the app includes a comprehensive dashboard that summarizes analytics of the imported data.

In the future, the app aims to support custom budget creation, set specific financial goals, generate various reports, and adjust a range of settings to further enhance ease of financial management. 

## Run the application
To run the app, firstly, set up Docker by pulling the PostgreSQL image:
```bash
docker pull postgres
```

Run the PostgreSQL container on port 5433 (to avoid port conflicts) with the specified user credentials:

```bash
docker run --name db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5433:5432 -d postgres
```

Ensure all necessary dependencies are installed:
```bash
npm install
```

Prisma will manage your database. Set it up with the following commands:

```bash
npx prisma install
npx prisma migrate deploy
```

Start the app with:
```bash
npn run dev
```

If you need to manually add data or view the database, you can run Prisma Studio:

```bash
npx prisma studio
```

## Interact with the app

The web application is currently in the early stages of development due to our ambitious plans for the project. As a result, many functionalities are still marked as work in progress (WIP). At present, users can:
- Create a new account by signing up
- Sign in using their created account
- Create a new 'regnskab' in the 'regnskab' tab
- Access the spreadsheet for a specific 'regnskab' using the buttons on the right-hand side of the 'regnskab' table
- Add categories and subcategories to the spreadsheet using the '+' buttons located under the tables
- Add transactions to subcategories by clicking on the corresponding cell for the specific category, which will update the table

Currently, the app has a limitation: it does not allow users to delete transactions or categories/subcategories. The dashboard also does not show any real values from the database and is also a future feature for the project.

To make it easier for the TA's and lectors to navigate and get an overview of the features, we have created a test-user, which has already been set up with basic data; username: test@gmail.com, password: testing123
This test log-in can be used on the online page, we have set up for the project: http://159.223.237.95/

### Log-in / sign-up page
<img src="https://github.com/simonsejse/dis-webapp-project/assets/40537287/07c1d5c0-902c-4ab8-8ac3-7dc5f0a1bff8" alt="Log-in / sign-up page" style="transform: scale(0.7);">

### Dashboard page
<img src="https://github.com/simonsejse/dis-webapp-project/assets/40537287/1c9347b6-7644-406a-9a08-272956f50b0e" alt="Dashboard page" style="transform: scale(0.7);">

### Regnskaber / spreadsheet page
Image here

## ER-Diagram
<img src="https://github.com/simonsejse/dis-webapp-project/assets/40537287/021a000a-44fc-4d87-856a-fa4af9aca596" alt="Database ER diagram" style="transform: scale(0.3);">

## Use of regular expressions
We effectively use regular expressions to ensure, that any route other than the sign-in and registration pages will be protected by the authentication middleware, requiring users to be authenticated (i.e., to have a valid token) to access them. This is done in  [middleware.ts](./src/middleware.ts), where the matcher array contains the regular expression, that matches the routes. The method can be seen below:
```typescript
export const config = {
  matcher: ["/((?!auth/signin|auth/register).*)"],
};
```
This is also utilized in [utils.ts](./src/lib/utils.ts) to parse numbers. In this regular expression, we sort out any characters other than numbers by replacing them with ''. This can be seen below:
```typescript
export function parseNumber(value: string) {
  return Number(value.replace(/[^0-9.-]+/g, ''));
}
```

## Prerequisites

- Node.js
- Docker
- Docker-Compose

## Core Technologies
- Next.js
- React
- Node
- Tailwind CSS
- Mui
- Shadcn

## Deploy: Push to Production

**Description:**
Ready to merge into `prod`. This will kick off the CI/CD for automatic deployment. Key updates include:

- **New Features:** [Describe briefly]
- **Bug Fixes:** [List fixes]
- **Improvements:** [Mention improvements]

Please review and merge to deploy.
