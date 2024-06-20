
# PetSoft

PetSoft is a SaaS application built on Next.js 14, utilizing the App Router and Server Actions for efficient data mutation.
PetSoft is designed to help pet daycare businesses manage their operations efficiently.  
Users can sign up, make a secure payment through Stripe for lifetime access, and manage their pet daycare business by adding new pets with various details.

# Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Set up Prisma & Seed the database](#set-up-prisma--seed-the-database)
- [Running the Development Server](#running-the-development-server)
- [Building for Production](#building-for-production)
- [Running the Production Server](#running-the-production-server)
- [Technologies Used](#technologies-used)
- [Stripe Webhook](#stripe-webhook)
- [Live Demo](#live-demo)

# Prerequisites
Stripe Account: Required for payment processing functionalities.

# Installation

1. Clone the repository:
```bash
git clone git@github.com:SiegfriedBz/next-saas-petsoft.git
cd petsoft
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a .env file in the root directory and add the following environment variables
    
    CANONICAL_URL=http://localhost:3000
    
    # Next-auth
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-nextauth-secret

    # Stripe
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
    STRIPE_SECRET_KEY=your-stripe-secret-key
    STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
    
    # Prisma DEV
    DATABASE_URL="file:./dev.db"
    
    # Prisma PRODUCTION
    POSTGRES_URL="your-postgres-url"
    POSTGRES_PRISMA_URL="your-postgres-prisma-url"
    POSTGRES_URL_NO_SSL="your-postgres-url-no-ssl"
    POSTGRES_URL_NON_POOLING="your-postgres-url-non-pooling"
    POSTGRES_USER="your-postgres-user"
    POSTGRES_HOST="your-postgres-host"
    POSTGRES_PASSWORD="your-postgres-password"
    POSTGRES_DATABASE="your-postgres-database"
    
    # Opengraph image
    NEXT_PUBLIC_OG_IMAGE_URL="your-opengraph-1200x600-image" 


# Set up Prisma & Seed the database

Initialize Prisma:
```bash
npx prisma init
```

Generate Prisma Client:
```bash
npx prisma generate
```

Seed the database:
```bash
npx prisma db seed
```
       
# Running the Development Server
To start the development server, run:

```bash
npm run dev
  ```

# Building for Production
To build the project for production, run:

```bash
npm run build
```

# Running the Production Server
After building the project, you can start the production server with:

```bash
npm start
```

# Stripe Webhook
To enable secure payment processing, configure the Stripe webhook to listen for checkout.session.completed events. Upon successful payment completion, the user's record in the database will be updated, setting the hasAccess field to true, granting them lifetime access to the software.

# Technologies Used

- **Framework**: React, Next.js 14 (App Router)
- **TypeScript**: Provides type safety and improved development experience.
- **Zod** (for client-side and server-side validation)

## Frontend:
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS, shadcn/ui, responsive design

## Backend:
- **ORM**: Prisma
- **DB**: PostgreSQL
- **Authentication**: NextAuth.js with Credentials Provider

## Payment Processing:
- **Stripe**

## Live Demo
Visit the live demo of [PetSoft](https://next-saas-petsoft.vercel.app/) deployed on Vercel.
