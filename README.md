# 🛡️ Proof of Project (PoP) Escrow

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Network](https://img.shields.io/badge/Network-Mantle%20Sepolia-emerald)
![Status](https://img.shields.io/badge/Status-MVP%20Completed-success)

> **Secure Your Work, Guarantee Your Pay.** > A decentralized, milestone-based escrow platform built on the Mantle Network using USDY.

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [How It Works](#-how-it-works)
- [Tech Stack](#-tech-stack)

---

## 💡 About the Project

**Proof of Project (PoP)** is a Web3 solution designed to solve trust issues between Clients and Vendors (Freelancers/Agencies). 

In the traditional world, freelancers often face non-payment, and clients face incomplete work. Traditional escrow services are slow, expensive, and rely on human intermediaries.

**PoP Escrow** replaces the middleman with a **Smart Contract**. Funds are locked upfront in **$USDY** (Yield-bearing Stablecoin) and are only released when specific milestones are approved by the Client.

---

## ✨ Key Features

* **🔒 Trustless Funds Locking:** Clients must deposit 100% of the project value into the Smart Contract before the project starts (Proof of Funds).
* **📍 Milestone-Based Payments:** Projects are broken down into steps (e.g., DP, Termin 1, Final). Funds are released partially as work progresses.
* **📄 IPFS Integration:** Contract documents (SPK/Agreement PDFs) are securely uploaded to IPFS via **Pinata**, ensuring immutable references.
* **💸 USDY Integration:** Transactions use mocked Ondo US Dollar Yield ($USDY) to simulate stable, real-world asset payments.
* **⚡ Two-Party Consensus:** A simplified mechanism where the Vendor submits work, and the Client approves the release. No third-party arbiter needed for this MVP.

---

## 🔄 How It Works

1.  **Agreement:** Client creates a project, uploads the PDF contract, and defines milestones.
2.  **Locking:** Client approves the spending cap and initiates the transaction. Funds move from Client -> Smart Contract.
3.  **Work & Review:** Vendor works on the current milestone.
4.  **Approval:** Client reviews the work. If satisfied, Client clicks **"Approve Release"**.
5.  **Settlement:** Smart Contract instantly transfers the specific milestone amount to the Vendor.

---

## 🛠 Tech Stack

**Frontend:**
* React.js + Vite (Framework)
* Tailwind CSS (Styling)
* RainbowKit + Wagmi (Wallet Connection)
* Ethers.js / Viem (Blockchain Interaction)
* Axios + Pinata API (IPFS Storage)

**Blockchain:**
* **Network:** Mantle Sepolia Testnet
* **Language:** Solidity ^0.8.20
* **Framework:** Foundry / Hardhat
* **Tokens:** ERC-20 (Mock USDY)

---

## 👨‍💻 Author

Built for **Mantle Co-Learning Camp** by:
* **Daffa Al Ghifary** - *Blockchain developer and a smart contract engineer*

---