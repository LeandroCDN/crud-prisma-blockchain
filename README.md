This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Branch Initial Set Up

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

- First use npm install to install all dependencies.

- Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Connect Wallet branch

Here we use [Web3Modal](https://web3modal.com/) (with Ethers 5) to mannage our connection with the user wallets.

1. install web3modal/ethers and ethers v@5.7.2

```bash
npm install @web3modal/ethers5 ethers@5.7.2
```

2. Create a folder 'components' inot src (not in app!)
3. Create a file components/Nav.tsx
4. Make a simple 'nav bar' with html/css/ts'
5. Create a file components/ConnectWallet.tsx
6. Create a folder context into src
7. Create file context/Web3Modal.tsx
8. Use ConnectWallet into the NavBar
9. Edit layout.tsx
