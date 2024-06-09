# FinansFokus
## How to run the app
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
Text

## ER-Diagram
Image here

## Prerequisites

- Node.js
- Docker
- Docker-Compose

## Tech Stack for "dis-webapp-project"

### Core Technologies
- Next.js
- React
- Node
- Tailwind CSS

### Development Tools
- TypeScript
- ESLint
- Prisma

### Dependencies
- react-hook-form
- @hookform/resolvers
- date-fns
- @radix-ui/react-accordion
- @radix-ui/react-popover
- @radix-ui/react-toast
- @radix-ui/react-label
- @radix-ui/react-slot
- lucide-react
- clsx
- tailwind-merge
- tailwindcss-animate
- zod

## Deploy: Push to Production

**Description:**
Ready to merge into `prod`. This will kick off the CI/CD for automatic deployment. Key updates include:

- **New Features:** [Describe briefly]
- **Bug Fixes:** [List fixes]
- **Improvements:** [Mention improvements]

Please review and merge to deploy.
