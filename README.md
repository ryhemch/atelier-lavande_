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
