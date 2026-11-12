<<<<<<< HEAD
# Ryhem Atelier — Documentation technique
Projet réalisé par **Ryhem Chayeb** · Site e-commerce artisanal « Atelier Lavande » (front-end) · Prix en dinars tunisiens (DT)

## Architecture
ryhem-atelier/
- index.html     : structure (toutes les pages dans un seul fichier, affichées une à une)
- css/style.css  : design (thème mauve clair/sombre, responsive, animations)
- js/script.js   : logique (produits, filtres, pagination, panier, paiement)
- logo.svg   : logo
- images/    : photos (voir liste ci-dessous)

## Technologies
Polices : Playfair Display + Poppins. Icônes : Font Awesome. HTML5, CSS3 (Grid, Flexbox, variables, animations, media queries), JavaScript pur. Aucune librairie.

## Thèmes
Clair et sombre : variables CSS dans :root et [data-theme="dark"], bouton dans l'en-tête, choix sauvegardé dans localStorage.

## Fonctionnement
- Navigation : showPage() affiche une section et cache les autres.
- Panier : tableau JavaScript sauvegardé dans le localStorage.
- Paiement : validation complète du formulaire + simulation d'API (payerAvecAPI).
- Sécurité : validation des champs, proteger() contre l'injection HTML dans les avis.
- Performance : loading="lazy" sur les images, pagination (6 produits/page).

## Configuration serveur
Carte Google Maps intégrée dans le pied de page (iframe, Sahloul, Sousse). Aucune configuration serveur : ouvrir index.html suffit. Pour l'héberger : GitHub Pages ou Netlify.
Évolution possible : backend (Node.js/PHP) + base de données (produits, commandes) + vraie API Stripe/PayPal dans payerAvecAPI().

## Liste des images (dossier images/, format .jpg)
hero-1, hero-2, hero-3 (bannières, paysage)
ryhem (ta photo, page À propos)
collier-1, collier-2 · bague-1, bague-2 · bracelet-1, bracelet-2 · robe-1, robe-2
echarpe-1, echarpe-2 · bougie-1, bougie-2 · vase-1, vase-2 · sac-1, sac-2
=======
# 💜 Atelier Lavande – Handmade Creations

**Atelier Lavande** is a modern and elegant e-commerce website dedicated to handmade and artisanal creations. Based in Sousse, Tunisia, the project showcases unique products through a refined design and a smooth shopping experience.

The website combines a feminine aesthetic, responsive layouts, and interactive JavaScript features to create an attractive online boutique.

## ✨ Features

### 🏠 Home Page
- Elegant hero section with an automatic image slider.
- Featured product categories.
- Popular products and current promotions.
- Highlights of the store's services.

### 🛍️ Online Shop
- Dynamic product display.
- Product search by name or description.
- Category filtering.
- Price filtering.
- Color and size filters.
- Promotional product filtering.
- Sorting by popularity and price.
- Product pagination.

### 🛒 Shopping Cart
- Add products to the cart.
- Manage product quantities.
- Calculate subtotal, discounts, delivery fees, and total.
- Promotional coupon codes.

### 💳 Checkout
- Customer and delivery information form.
- Multiple payment method options.
- Form validation.
- Simulated payment process (no real transactions).

### 🎨 User Experience
- Responsive design for desktop, tablet, and mobile.
- Light and dark mode.
- Elegant animations and transitions.
- Previous-page navigation.
- Mobile-friendly navigation menu.

### 📍 Additional Sections
- About the creator.
- Contact information.
- Social media links (Facebook, Instagram, and WhatsApp).
- Embedded Google Maps location.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling, animations, responsive design |
| JavaScript | Interactive features and dynamic content |
| Google Fonts | Typography (Cormorant Garamond & DM Sans) |
| Font Awesome | Icons |
| Google Maps | Embedded location |

## 📂 Project Structure

```text
Atelier-Lavande/
│
├── index.html
├── logo.svg
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── images/
│   ├── hero-1.jpg
│   ├── hero-2.jpg
│   ├── hero-3.jpg
│   └── ...
│
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ryhemch/Atelier-Lavande.git
```

### 2. Open the project

```bash
cd Atelier-Lavande
```

### 3. Run the website

Open `index.html` in your browser or use the **Live Server** extension in Visual Studio Code.

No backend installation is required.

## 🎨 Design Concept

The visual identity of Atelier Lavande is inspired by elegance, simplicity, and handmade craftsmanship.

- **Color palette:** Soft beige, mauve, lavender, and warm neutral tones.
- **Typography:** Cormorant Garamond for elegant headings and DM Sans for readable content.
- **Design approach:** Minimalist, feminine, modern, and responsive.

## 🎯 Project Objectives

This project was developed to practice and strengthen frontend web development skills, particularly:

- Structuring web pages with HTML5.
- Creating modern interfaces with CSS3.
- Implementing interactive functionality using JavaScript.
- Managing dynamic product data.
- Building responsive layouts.
- Improving user experience and navigation.

## 👩‍💻 Author

Ryhem Chayeb

GitHub: [@ryhemch](https://github.com/ryhemch)

Project: **Atelier Lavande**

Made with ♡ in Tunisia.

---

*Atelier Lavande – The elegance of handmade creations.*
>>>>>>> 261bee1056eac52642d8260bba07dd01bf60a49b
