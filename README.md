# SuiRankup – Ranked Gamified NFTs Marketplace with zkLogin to better bridge Web2 to Web3.

## 🏆 Overview

**SuiRankup** is a **gamified NFT marketplace** built on **Sui** that allows NFTs to **level up or rank up** when completing certain quests or tasks.  
Our mission is to create a **better bridge from Web2 to Web3**, making blockchain accessible, rewarding, and fun.

Players and collectors can **buy, sell, auction, and interact** with NFTs that evolve dynamically over time — creating a sense of progression like in gaming.  
We also implement **zkLogin** for seamless onboarding and **dynamic NFT fields** to support special items, seasonal promotions, and rewards for active buyers.

---

## 🎯 Key Features

### 🖼 NFT Marketplace Core
- **Mint NFTs** with security checks.
- **Buy & Sell NFTs** with configurable transaction fees (2–5%).
- **Auction System** with bidding logic.
- **Dynamic NFTs** that level up or rank up based on trades, purchases, or quest completions.
- **Rarity Display** on all listing cards.
- **Special/Seasonal Categories** (e.g., Summer Sale).

### 🎮 Gamification & Rewards
- Incentivized early buyers and reviewers via **Reward Pool**.
- Rank-up system for frequent traders.
- Coupons and perks for loyal buyers.

### 🛡 Web3 & Security
- zkLogin integration for **passwordless authentication**.
- Gas optimization with verification and parallel processing.
- Optional Web2 backend integration (Supabase) for history and user profiles.

### 🌍 Blockchain for Good
Aligned with **United Nations’ Sustainable Development Goals (SDGs)**, QuestismOS promotes:
- **Sustainable commerce** through transparent NFT provenance.
- **Global accessibility** with zkLogin for non-crypto-native users.

---

## 📂 Project Structure


### Frontend (React + TypeScript)
```text
devmatch2/src/
  ├── components/
  │ ├── AuctionPopUp.tsx # Auction interaction UI
  │ ├── ListingPopUp.tsx # NFT listing form
  │ ├── Navbar.tsx # Navigation bar
  │ ├── nftCard.tsx # NFT card with rarity display
  ├── pages/
  │ ├── Auction.tsx # Auction page
  │ ├── Landing.tsx # Home & marketplace overview
  │ ├── Minting.tsx # NFT minting page
  ├── App.tsx # App routing & layout
  ├── constants.ts # Contract addresses & config
  ├── index.css # Styling
  ├── Layout.tsx # Page layout wrapper
  ├── main.tsx # App entry point
  ├── marketplace.tsx # Marketplace UI & contract integration
  ├── networkConfig.ts # Sui network settings
  ├── OwnedObjects.tsx # Display user-owned NFTs
  ├── WalletStatus.tsx # Wallet connection & status
  └── vite-env.d.ts
  ```


### Smart Contracts (Move)
```text
marketplace_contract/
├── sources/
│ ├── bidding.move # Auction and bidding logic
│ ├── marketplace.move # Core marketplace functions (list, buy, sell)
│ ├── nft.move # NFT object definitions and minting logic
├── tests/
│ └── marketplace_contract_tests.move
└── Move.toml # Sui Move package configuration
```

---

## 🛠 Tech Stack

### Blockchain & Smart Contracts
- **Sui Move** – Marketplace, NFT, and auction logic.
- **zkLogin** – Secure passwordless authentication.
- **Dynamic Fields** – For NFT rank-up and seasonal categorization.

### Frontend
- **React + TypeScript**
- **Vite** – Fast build and hot-reload.
- **Supabase (optional)** – Web2 backend for user history and profiles.

### Development Tools
- **Figma** – UI/UX prototyping.
- **Lucidchart** – Architecture diagramming.
- **Canva** – Pitch deck creation.

---

## 🏗 Architecture

*import the pic later..


---

## 🚀 Getting Started on your own local machine..

### Prerequisites
- Node.js 18+
- pnpm / npm
- Sui CLI installed and configured

### Install Frontend
```bash
cd devmatch2
pnpm install
pnpm run dev
```

---

## 📜 Hackathon Tracks
### SUI Track 2

- On-chain Marketplace – Dynamic NFTs & auctions.

### Blockchain for Good Track
Aligns with SDG 17 goals for sustainability and accessibility. (be more specific later..)

## 🤝 Contributions
Smart Contracts: Wen Zhe, Ian Hon

Frontend & Wallet Integration: Ang Jianming, Ian Hon, Jun Kai

Backend (Supabase): Ian Hon

UI/UX: Jun Kai, Yao Ren

Slides & Pitch Deck: Yao Ren , Ang Jianming


## 📄 License

Apache License – See LICENSE for details.


