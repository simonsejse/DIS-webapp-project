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

It is not possible to delete a transaction or categories/subcategories.

## ER-Diagram
Image here

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
