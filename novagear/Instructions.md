# NovaGear — Codex Build Instructions

## Project Context

Build a high-fidelity e-commerce prototype for **SEG3125 Assignment 4: E-Commerce Site**.

The project is a React + Vite + Tailwind CSS website called **NovaGear**.

NovaGear is a dark gamer-aesthetic e-commerce store selling gaming accessories such as keyboards, mice, headsets, monitors, controllers, and mousepads.

The site must satisfy the assignment requirements:
- A functional product exploration process using **faceted search**
- A clear buying/checkout process that shows users what step they are on
- A short survey/feedback process
- Thoughtful verbal communication with:
  - incite-to-action language
  - informative product language
  - engaging survey/feedback language
- Strong visual design using contrast, scale, balance, hierarchy, spacing, and consistency
- Support for a later heuristic evaluation using Nielsen's 10 usability heuristics

## Tech Stack

Use:
- React
- Vite
- React Router
- Tailwind CSS
- JavaScript

Do not use:
- Backend/database
- Real payment processing
- Authentication/accounts
- Overly complex state management libraries

Keep the app simple, polished, and easy to deploy.

---

## Tailwind CSS Setup

Use the current Vite plugin setup for Tailwind CSS.

Run inside the actual Vite project folder:

```bash
npm install tailwindcss @tailwindcss/vite
```

Update `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

In `src/index.css`, use:

```css
@import "tailwindcss";
```

Make sure `src/main.jsx` imports `index.css`.

---

## Branding

Brand name:

```txt
NovaGear
```

Tagline:

```txt
Level Up Your Setup.
```

Brand personality:
- Modern
- Dark
- Gamer-focused
- Confident
- Slightly premium
- Clear and helpful, not childish

Target audience:
- University students
- PC gamers
- Console gamers
- Casual and enthusiast gamers
- People upgrading their setup

---

## Visual Style

Use a dark gamer aesthetic.

Recommended colors:
- Page background: `#07070B`
- Card background: `#11111A`
- Secondary surface: `#181824`
- Border: `#2A2A3A`
- Primary accent: purple/violet such as `#8B5CF6`
- Accent hover: brighter purple such as `#A855F7`
- Success: green
- Sale/discount: red
- Main text: white or near-white
- Secondary text: zinc/slate gray

Visual feel:
- Dark background
- Purple glow accents
- Rounded cards
- Strong hierarchy
- Good spacing
- Product cards with hover effects
- Clear call-to-action buttons
- Responsive design

Typography:
- Use a bold futuristic heading style if easy, but do not overcomplicate.
- If not importing Google Fonts, use Tailwind's default sans-serif with large bold headings.
- If importing fonts, use Orbitron for headings and Inter for body text.

---

## Required Pages

Create these pages:

```txt
Home
Products
Cart
Checkout
Confirmation
Survey
```

Use React Router routes:

```txt
/
/products
/cart
/checkout
/confirmation
/survey
```

---

## Suggested Folder Structure

```txt
src/
  App.jsx
  main.jsx
  index.css

  components/
    Navbar.jsx
    Footer.jsx
    ProductCard.jsx
    FilterSidebar.jsx
    CheckoutStepper.jsx

  data/
    products.js

  pages/
    Home.jsx
    Products.jsx
    Cart.jsx
    Checkout.jsx
    Confirmation.jsx
    Survey.jsx
```

---

## App Requirements

### Shared Layout

Every main page should have:
- Navbar
- Footer
- Consistent dark theme
- Responsive layout

Navbar should include:
- NovaGear logo/name
- Home
- Products
- Cart
- Survey
- A visible cart count if possible

---

## Home Page

Purpose:
- Introduce NovaGear
- Incite user to shop
- Show product categories and deals

Include:
- Hero section
- Tagline: `Level Up Your Setup.`
- Promotional call-to-action
- Featured categories
- Deal/discount section
- Button linking to Products page

Example copy:
- `Level Up Your Setup.`
- `Premium gaming gear built for speed, comfort, and control.`
- `Save up to 30% on selected gear this week.`
- `Shop Gear`

This page satisfies incite-to-action communication.

---

## Products Page

This is the most important page.

It must include functional **faceted search**.

Layout:
- Left filter sidebar
- Right product grid
- Result count
- Clear filters button
- Optional sort dropdown

Filters to implement:
- Category
  - Keyboard
  - Mouse
  - Headset
  - Monitor
  - Controller
  - Mousepad
- Brand
  - NovaGear
  - Razer
  - Logitech
  - SteelSeries
  - HyperX
  - Corsair
- Price
  - Under $50
  - $50-$100
  - $100-$200
  - $200+
- Connection
  - Wired
  - Wireless
- RGB
  - Yes
  - No
- Rating
  - 4+
  - 4.5+

Product cards should show:
- Product name
- Category
- Brand
- Price
- Rating
- Short description
- Badges like `Sale`, `Wireless`, `RGB`
- Add to Cart button

Faceted search should update the visible products immediately based on selected filters.

This page satisfies the explore divergent/convergent process.

---

## Product Data

Create at least 12 products in `src/data/products.js`.

Each product should include:

```js
{
  id: 1,
  name: "NovaStrike Pro Keyboard",
  category: "Keyboard",
  brand: "NovaGear",
  price: 129.99,
  connection: "Wired",
  rgb: true,
  rating: 4.8,
  description: "Mechanical keyboard with fast switches, full RGB lighting, and a durable aluminum frame.",
  sale: true
}
```

Use simple emoji or gradient placeholders instead of real product images if needed.

Recommended products:
1. NovaStrike Pro Keyboard
2. PulseLite Wireless Mouse
3. Vortex RGB Headset
4. TitanView 27 Monitor
5. NovaPad XL Mousepad
6. ForgePad Controller
7. Razer BlackWidow V4
8. Logitech G Pro X Mouse
9. SteelSeries Arctis Nova Headset
10. HyperX Cloud Core
11. Corsair K70 Core Keyboard
12. NovaView Compact Monitor

---

## Cart Page

Purpose:
- Show selected products
- Let user adjust quantity
- Let user remove items
- Show subtotal
- Continue to checkout

Must include:
- Product list
- Quantity buttons
- Remove buttons
- Subtotal
- Checkout button

If cart is empty:
- Show friendly empty cart message
- Button back to Products

---

## Checkout Page

This is the required **follow instructions process**.

Show a stepper/progress indicator clearly:

```txt
Cart ✓
Shipping
Payment
Review
```

The current step should be visually highlighted.
Completed steps should show a checkmark.

Checkout should include:
- Shipping form
- Payment form
- Order summary
- Place Order button

Payment is fake only. Do not process real payment.

Shipping fields:
- Full name
- Email
- Address
- City
- Province
- Postal code

Payment fields:
- Name on card
- Card number
- Expiry
- CVV

When the user submits checkout, navigate to `/confirmation`.

This page supports:
- Visibility of system status
- Error prevention
- Recognition rather than recall
- Consistency and standards

---

## Confirmation Page

Purpose:
- Show success feedback
- Offer next actions

Include:
- `Order Confirmed!`
- Friendly message
- Order summary or simple confirmation ID
- Button to Survey
- Button to Continue Shopping

Example:
```txt
Thanks for shopping with NovaGear. Your setup upgrade is on the way.
```

---

## Survey Page

This is the required **communicate process**.

The survey should feel friendly and not intrusive.

Include:
- Rating 1-5
- What did you like?
- What could be improved?
- Would you recommend NovaGear?
- Submit button

After submit:
- Show thank-you message

Engaging copy examples:
- `Help us improve your next upgrade.`
- `Your feedback helps us build a better gaming store.`
- `Thanks for helping us improve NovaGear.`

---

## State Management

Keep it simple.

Use React state in `App.jsx` or create a small cart state passed through props.

Cart functionality should support:
- Add item
- Increase quantity
- Decrease quantity
- Remove item
- Calculate subtotal
- Clear cart after checkout if appropriate

Do not add Redux or complex libraries.

---

## Accessibility

Include:
- Proper labels for form fields
- Buttons with clear text
- Keyboard-focus visible styles
- Good contrast
- Semantic HTML where possible
- Avoid using only color to communicate state

---

## Heuristic Evaluation Support

While coding, make sure the UI gives examples for each Nielsen heuristic:

1. Visibility of system status
   - Checkout stepper, cart count, confirmation messages

2. Match between system and real world
   - Product categories, prices, cart, checkout terms

3. User control and freedom
   - Remove item, clear filters, back to products

4. Consistency and standards
   - Same button styles, cards, navigation

5. Error prevention
   - Required fields, clear form labels, fake payment formatting

6. Recognition rather than recall
   - Visible filters, visible cart summary, product badges

7. Flexibility and efficiency of use
   - Faceted filters, clear filters, direct navigation

8. Aesthetic and minimalist design
   - Clean dark layout, focused cards, no clutter

9. Help users recognize, diagnose, and recover from errors
   - Empty cart message, form validation messages

10. Help and documentation
   - Short helper text on checkout/survey/product filters

---

## Verbal Communication Requirements

Use the following communication purposes:

### Incite to Action
Use promotional language on Home and Products:
- `Save up to 30% this week.`
- `Upgrade your setup today.`
- `Shop the drop.`
- `Limited-time deal.`

### Inform
Use clear product descriptions:
- `Wireless gaming mouse with low-latency connection and lightweight shell.`
- `Mechanical keyboard with RGB lighting and tactile switches.`

### Engage in a Connection
Use friendly feedback language on Survey and Confirmation:
- `We'd love to hear what you think.`
- `Your feedback helps us improve your next upgrade.`
- `Thanks for helping us make NovaGear better.`

Writer/Reader Model:
- The site speaks as NovaGear, a helpful gaming gear brand.
- The reader is a gamer looking to upgrade their setup.
- Tone is confident, clear, helpful, and slightly energetic.

---

## Quality Expectations

The final app should:
- Look polished enough for a high-fidelity prototype
- Be responsive on laptop and mobile
- Have no console errors
- Have working navigation
- Have working faceted search
- Have working cart and checkout flow
- Have a clear survey interaction
- Be easy for the TA to test without asking questions

---

## Deployment Reminder

Later, this project should be pushed to GitHub and deployed through Netlify or another public host.

The user's portfolio must link to the NovaGear prototype.

Do not add private credentials or environment variables.

---

## Build Order for Codex

Implement in this order:

1. Install and configure Tailwind CSS
2. Create project folder structure
3. Set up React Router routes
4. Create Navbar and Footer
5. Create product data
6. Build Home page
7. Build ProductCard and FilterSidebar
8. Build Products page with faceted search
9. Add cart state and Add to Cart behavior
10. Build Cart page
11. Build Checkout page with stepper and fake payment form
12. Build Confirmation page
13. Build Survey page
14. Polish responsive design
15. Check accessibility and required assignment features

---

## Important Constraints

Do not:
- Add real payment processing
- Add authentication
- Add backend/database
- Use copyrighted product images unless placeholders are used
- Make the UI overly complex

Do:
- Prioritize assignment requirements
- Keep code readable
- Use reusable components
- Keep design consistent
- Make it easy to explain in the report
