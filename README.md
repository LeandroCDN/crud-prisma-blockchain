This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

## 1. Branch Initial Set Up

To get this reposit run

npx create-next-app@latest

```bash
√ What is your project named? ... name
√ Would you like to use TypeScript? ... / Yes
√ Would you like to use ESLint? ...  / Yes
√ Would you like to use Tailwind CSS? ...  / Yes
√ Would you like to use src/ directory? ... / Yes
√ Would you like to use App Router? (recommended) ...  / Yes
√ Would you like to customize the default import alias (@/*)? »  / Yes
```

1. First use npm install to install all dependencies.

```bash
npm install
```

2. Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 2. Connect Wallet branch

Here we use [Web3Modal](https://web3modal.com/) (with Ethers 5) to mannage our connection with the user wallets.

1. install web3modal/ethers and ethers v@5.7.2

```bash
npm install @web3modal/ethers5 ethers@5.7.2
```

2. Create a folder 'components' inot src (not in app!)
3. Create a file components/Nav.tsx
4. Make a simple 'nav bar' with html/css/ts'
5. Create a folder context into src
6. Create file context/Web3Modal.tsx
7. Use ConnectWallet into the NavBar
8. Edit layout.tsx

## 3. api POST Method

In this branch (apiPOSTMethod) we will cover a simple POST method with mongo DB and Prisma.
I assume you know how to create a mongo db account.

1. Install the Prisma CLI as a development dependency:

```bash
npm i -D prisma
```

2. To initialize Prisma within the project, simply run:

```bash
npx prisma init --datasource-provider mongodb
```

This create a folder root/prisma/scheme.prisma

3. install Prisma extension for vsCode
4. Create a db in mongo an your keys(database Access).
5. SetUp your .env whit keys of mongo (Remember add last part) "... mongodb.net/COLLECTIONNAME"
6. Model data in ~/prisma/scheme.prisma
7. npx prisma db push. (in this poit, you may see the collection in mongo db)
8. Run

```bash
npx prisma db push
```

```bash
npx prisma generate
```

9. create global state for prisma objet in libs/prisma.ts
10. Create api in app with a name of route, in this case, app/api/login/route.ts
11. In login/route.ts you can create a POST method, importing the global prisma object
12. Create a 'form' component and import it in app/page.tsx, take care with the data, it must have the same names that have in your scheme.
13. You can use the form in you frontend to push data to mongoDB.

### note

- We add GetWalletData.tsx in components to get wallet data , you can use this component in development to view its data in console.

## RoutesAndContext

In this Step we make a lot of thinks

- new GET method in api/login/[id] (dynamic routes)
- Check user in the form compnents/LoginForm.tsx
- Create a dashboard page to show de user data
- use a Context to create a global state in the app to pass data between pages

1. Crete a folder [id] in api/login and route.tsx
2. Create loadingContext in ./context/
3. wrap your layout.tsx between <LoadingProvider></LoadingProvider>. This is the permit to use your context un your all app.
4. Import the useLoading In your form (LoginForm in this case), this file have some changes.
5. Populate the context with `res`
6. Use context in the dashboard/[id]/page.tsx to get your data.

# Deposit And Withdraw api

    In this stage, we introduce several connection system changes by creating a ConnectButton.tsx file and removing the LoginForm. The ConnectButton now handles connection calls and encompasses the login logic.

    The primary modifications are made in BalanceButton.tsx and the api/deposit and api/withdraw files, where deposit and withdrawal functionalities are managed.

    As a best practice, we've included an actions folder to encapsulate common functions. This folder must be invoked on the server-side for optimal functionality.

Changed files:
D: Archivo eliminado.
A: Archivo añadido (nuevo).
A abis/ERC20.json
A .vscode/settings.json
A src/constants/web3.tsx
A src/app/actions/get-user.ts
A src/components/ConnectButton.tsx
A src/components/BalanceButton.tsx
A src/components/SimpleBoxCard.tsx
A src/app/actions/get-address-from-signature.ts
A src/app/api/deposit/[address]/[hash]/route.ts
A src/app/api/withdraw/[address]/[value]/route.ts

M: Archivo modificado.
M .env
M src/app/api/login/route.ts : Add balance value
M .gitignore : add .env
M prisma/schema.prisma : Add balance param
M src/app/dashboard/[id]/page.tsx : add commented status
M src/app/layout.tsx : - change 1 line
M src/app/page.tsx : commmented some lines
M src/components/Nav.tsx : hard changes - add BalanceButton component & ConnnectButton
M src/context/Web3Modal.tsx : Add bscTestnet

# Assets (api)

1. Create asset appi calls in api/assets/route.ts
2. update prisma schema
3. upadate crete user in api/login/route.ts. For now, i harcoded some assets, but in the futere we will delete this.
4. Go to dashboard/[id] update stiles.
5. In Connect button, add a call to api/assets/route.ts to get all assets and save this in context.
6. wrap all 'useClient' this in componnets/tools.tsx import this component in page.tsx
7.
