# Lil Bits restaurant - Lokaverkefni NTV.
16.Jan: I know now I should have chosen context instead of params.

## Main Commands to Use the Project
- npm install - Installs all required packages and dependencies for the project.
- npm run dev - Starts the development server at http://localhost:3000. The application automatically reloads on code changes.
- npm run build - Creates an optimized production build of the application.
- npm start - This starts the production server using the optimized build.
- npm run lint - Runs ESLint to check for code issues.

## Overview

This project is a "full-stack" web application guiding users through a seamless order process:
**Homepage → Dish Page → Drink Page → Booking Page → Receipt Page**.  
Orders are saved locally to `data/orders.json` and can be retrieved later by the user.

### Order Flow:

1. **Homepage:**  
   Users navigate to start a new order or look up existing orders.

2. **Select Dish Page:**

   - **What Happens:** Users select dishes and specify quantities.
   - **How:**
     - The frontend fetches random dishes from TheMealDB.
     - Dish details (`strMeal`, `quantity`) are passed as JSON in query parameters to the next step.

3. **Select Drink Page:**

   - **What Happens:** Users select drinks and specify quantities.
   - **How:**
     - Similar to the Dish Page but fetches data from TheCocktailDB.
     - Selected drinks are added to the query parameters along with the dishes.

4. **Booking Page:**

   - **What Happens:** Users enter booking information (date, time, people, email).
   - **How:**
     - The page collects booking info and combines it with previous selections.
     - All data (`dishes`, `drinks`, booking info) is passed as query parameters to the Receipt Page.

5. **Receipt Page:**

   - **What Happens:** Displays the final order with calculated totals and stores the order.
   - **How:**
     - The page reads all query parameters.
     - It dynamically calculates dish and drink totals.
     - Performs a final **POST** request to `/api/orders` to save the order in `data/orders.json`.
     - Displays the receipt with final details.

6. **Older Orders Page:**
   - **What Happens:** Users can look up their past orders by providing their email.
   - **How:**
   - The page uses a utility function to read orders from data/orders.json.
   - Looking up: Filters orders matching the provided email.
   - Update: Navigates to an update page where users can modify order details.
   - Re-order: Provides an option to re-order past orders by pre-filling selection steps.
   - Delete: Allows users to delete an order, removing it from data/orders.json.

### Total Calculation

- **Dish Total:** Calculated based on a set price per dish multiplied by quantity.
- **Drink Total:** Calculated from hardcoded drink prices multiplied by quantity.
- **Grand Total:** Sum of dish and drink totals.

### Backend Utilities

- **Reading Orders:**  
  A function in `utils/files.ts` reads the list of current orders from `data/orders.json`, using the provided email to filter orders when necessary.

- **Saving Orders:**  
  When the final order is submitted on the Receipt Page, a POST request to `/api/orders` saves the order to `data/orders.json`.

### Glossary and Additional Information

**Framendi:** Refers to the frontend, which fetches information from `/api/orders`.

**VIRKNIN Á PÖNTUNARFERLI:**

1. **SelectDish** → User picks dishes, hits Next → pass `dishes` as JSON in query.
2. **SelectDrinks** → User picks drinks, hits Next → pass `dishes` + `drinks` in query.
3. **Booking** → User sets date/time/people/email, hits Next → pass `dishes`, `drinks`, plus booking info in query.
4. **Receipt** → Read **all** from query, do a final **POST** to store in JSON, then display the final info.
5. **Older-orders** → Gets orders that match the Email from `data/orders.json`, else shows no-order page.

### Project Structure
tree -I "node_modules|.git" 

.
├── README.md
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── postcss.config.ts
├── public
│   └── photos
│       └── lb.png
├── src
│   ├── app
│   │   ├── about
│   │   │   └── page.tsx
│   │   ├── api
│   │   │   └── orders
│   │   │       ├── [id]
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   ├── blink.css
│   │   ├── booking
│   │   │   └── page.tsx
│   │   ├── components
│   │   │   ├── common
│   │   │   │   ├── Carousel.tsx
│   │   │   │   ├── DrinkCarousel.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   └── MiniOrderFlow.tsx
│   │   │   ├── forms
│   │   │   │   └── ContactForm.tsx
│   │   │   ├── layout
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Header.tsx
│   │   │   └── orders
│   │   │       ├── BookingForm.tsx
│   │   │       ├── CreateOrder.tsx
│   │   │       ├── DishDrinkPreview.tsx
│   │   │       ├── DishSelectorModal.tsx
│   │   │       ├── DrinkSelectorModal.tsx
│   │   │       ├── NavButton.tsx
│   │   │       ├── ReceiptComponent.tsx
│   │   │       ├── SelectDishes.tsx
│   │   │       └── SelectDrinks.tsx
│   │   ├── contact
│   │   │   └── page.tsx
│   │   ├── create-order
│   │   │   └── page.tsx
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── menu
│   │   │   └── page.tsx
│   │   ├── orders
│   │   │   ├── layout.tsx
│   │   │   ├── no-orders
│   │   │   │   └── page.tsx
│   │   │   ├── older-orders
│   │   │   │   └── page.tsx
│   │   │   └── update-order
│   │   │       └── page.tsx
│   │   ├── page.tsx
│   │   ├── receipt
│   │   │   └── page.tsx
│   │   ├── select-dishes
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── select-drinks
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── types.ts
│   └── data
│       └── orders.json
├── tailwind.config.js
├── tsconfig.json
└── utils
    └── files.ts

30 directories, 51 files

## Technologies Used

- **Next.js (React):**

  - **What:** A powerful React framework for building server-rendered applications and API routes.
  - **Why:** Provides built-in routing, server-side rendering, and API capabilities, ideal for full-stack applications.
  - **How:** Used to build pages, handle backend API routes, and manage server-side logic.

- **Tailwind CSS:**

  - **What:** A utility-first CSS framework.
  - **Why:** Simplifies styling with utility classes, speeds up development, and ensures a responsive, consistent UI.
  - **How:** Applied throughout components to style layouts, typography, spacing, and responsiveness.

- **Node.js File System (fs):**

  - **What:** Node.js module for interacting with the file system.
  - **Why:** Allows saving and reading orders from a JSON file locally, ideal for development without a database.
  - **How:** Used in utility functions (`utils/files.ts`) to read from and write to `data/orders.json`.

- **External APIs (TheMealDB & TheCocktailDB):**
  - **What:** APIs providing data and images for meals and drinks.
  - **Why:** Enables dynamic content, variety in selections, and a richer user experience without storing images locally.
  - **How:** Fetches random dishes and drinks for display in selection pages and the carousel.

## Why These Technologies Are Being Used

- **Next.js** streamlines building a robust, full-stack React application with minimal configuration, including API development and server-side rendering.
- **Tailwind CSS** allows for rapid styling with a consistent and responsive design approach without writing custom CSS for each component.
- **Node.js fs** facilitates a simple method for persisting data locally during development, removing the need for a complex database setup.
- **External APIs** provide high-quality, varied images and information on dishes and drinks, enhancing the user interface and reducing the burden of managing local assets.
