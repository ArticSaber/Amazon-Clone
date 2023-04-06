This is a Amazon clone built with ReactJS, Supabase for authentication. The project also utilizes Context API for State Management, Toastify for toast messages, React Icons for icons, React-router-dom for routing/navigation. The project uses Vite as a build tool and is hosted on Netlify.

[![Netlify Status](https://api.netlify.com/api/v1/badges/4dae2283-b13a-4ef7-874b-17a5a25bdf74/deploy-status)](https://app.netlify.com/sites/devrev-amazon-clone/deploys)

Project is hosted on https://devrev-amazon-clone.netlify.app/

## Table of Contents
- Getting Started
  - Prerequisites
  - Installation
  - Usage
- Built With
- Features


## Getting Started
To get a local copy up and running follow these simple steps.

### Prerequisites
You should have Node.js and npm installed on your machine.

### Installation
1. Clone the repository:

```
git clone https://github.com/articsaber/devrev-round-2-amazon-clone
```

2. Install node packages:
```
step 1: npm install yarn
step 2: yarn 
```

3. Create a .env file in the root directory of the project with the following variables:
```
VITE_SUPABASE_URL=<YOUR_SUPABASE_URL>
VITE_SUPABASE_KEY=<YOUR_SUPABASE_KEY>
```
You can obtain your Supabase URL and API key by signing up for a free account on supabase.io and creating a new project. 

Usage
To run the project locally, run the following command in the terminal:

```
yarn dev
```
This will start a local development server at http://localhost:5173.

To build the project for production, run the following command:

```
yarn build
```
This will create a production-ready build in the `dist/` directory.

## Features
- User authentication using Supabase
- Browse items by category
- Add items to the cart
- View your cart and edit items
- Checkout your products

## Built With
- ReactJS
- Supabase
- Toastify
- React Icons
- React-router-dom

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/ArticSaber/DevRev-Round-2-Amazon-Clone/blob/main/LICENSE) file for details.
