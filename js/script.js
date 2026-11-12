var produits = [
  { id: 1, nom: "Collier Croissant de Lune", cat: "bijoux", prix: 120, ancien: 150, pop: 95, nouveau: false, photos: ["collier-1.jpg", "collier-2.jpg"], desc: "Un collier délicat en forme de croissant de lune, porté au quotidien.", matiere: "Argent 925", dim: "Chaîne 45 cm", couleurs: ["Argent", "Doré"], tailles: [], gravure: true },
  { id: 2, nom: "Bague Améthyste", cat: "bijoux", prix: 180, ancien: 0, pop: 80, nouveau: true, photos: ["bague-1.jpg", "bague-2.jpg"], desc: "Une pierre d'améthyste sertie à la main, symbole de calme.", matiere: "Argent et améthyste", dim: "Pierre 8 mm", couleurs: ["Violet"], tailles: ["52", "54", "56"], gravure: false },
  { id: 3, nom: "Bracelet Perles Lilas", cat: "bijoux", prix: 75, ancien: 0, pop: 70, nouveau: false, photos: ["bracelet-1.jpg", "bracelet-2.jpg"], desc: "Perles lilas enfilées une à une sur un fil élastique solide.", matiere: "Perles de verre", dim: "Tour de poignet 17 cm", couleurs: ["Lilas", "Rose"], tailles: [], gravure: true },
  { id: 4, nom: "Robe Lin Lavande", cat: "vetements", prix: 280, ancien: 340, pop: 90, nouveau: false, photos: ["robe-1.jpg", "robe-2.jpg"], desc: "Robe fluide en lin, coupe évasée, teintée à la lavande.", matiere: "Lin 100% naturel", dim: "Longueur 105 cm", couleurs: ["Lavande", "Blanc"], tailles: ["S", "M", "L"], gravure: false },
  { id: 5, nom: "Écharpe Laine Mauve", cat: "vetements", prix: 140, ancien: 0, pop: 60, nouveau: true, photos: ["echarpe-1.jpg", "echarpe-2.jpg"], desc: "Écharpe tricotée main, très douce, pour les journées fraîches.", matiere: "Laine mérinos", dim: "180 × 40 cm", couleurs: ["Mauve", "Rose"], tailles: [], gravure: false },
  { id: 6, nom: "Bougie Lavande", cat: "deco", prix: 55, ancien: 75, pop: 98, nouveau: false, photos: ["bougie-1.jpg", "bougie-2.jpg"], desc: "Bougie coulée à la main, parfum apaisant de lavande de Provence.", matiere: "Cire de soja", dim: "200 g · 40 h", couleurs: ["Lavande", "Blanc"], tailles: [], gravure: false },
  { id: 7, nom: "Vase Céramique Violet", cat: "deco", prix: 160, ancien: 200, pop: 75, nouveau: false, photos: ["vase-1.jpg", "vase-2.jpg"], desc: "Vase modelé et émaillé à la main, chaque pièce est unique.", matiere: "Céramique émaillée", dim: "Hauteur 25 cm", couleurs: ["Violet", "Lilas"], tailles: [], gravure: false },
  { id: 8, nom: "Sac Brodé Lilas", cat: "accessoires", prix: 195, ancien: 0, pop: 85, nouveau: true, photos: ["sac-1.jpg", "sac-2.jpg"], desc: "Sac en toile brodé de petites fleurs, assez grand pour tous les jours.", matiere: "Coton brodé", dim: "30 × 25 cm", couleurs: ["Lilas", "Blanc"], tailles: [], gravure: true }
];
var categories = [                                // "photo" = une photo déjà utilisée par un produit
  { id: "bijoux", nom: "Bijoux", photo: "collier-1.jpg" },
  { id: "vetements", nom: "Vêtements", photo: "robe-1.jpg" },
  { id: "deco", nom: "Déco", photo: "bougie-1.jpg" },
  { id: "accessoires", nom: "Accessoires", photo: "sac-1.jpg" }
];
var codesPromo = { LUNE10: 10, LAVANDE20: 20 };   // code -> pourcentage de réduction
var avis = {                                      // avis clients (ceux de départ)
  1: [{ nom: "Salma", note: 5, texte: "Magnifique, la finition est parfaite !" }],
  6: [{ nom: "Amine", note: 4, texte: "Odeur douce et relaxante." }]
};
var PAR_PAGE = 6;                                 // produits par page (pagination)
var PRIX_GRAVURE = 15;                            // supplément gravure (en dinars)
var panier = JSON.parse(localStorage.getItem("panier")) || []; // panier gardé dans le navigateur
var promo = "";                                   // code promo appliqué
var pageActuelle = 1;                             // page de la boutique
var noteChoisie = 5;                              // note choisie pour un avis
var slideActuel = 0;                              // numéro du slide affiché

/* ---------- 2. OUTILS ---------- */
function dt(n) {                                 // affiche un montant en dinars tunisiens : 120 -> "120 DT"
  return (Math.round(n * 100) / 100) + " DT";
}
function appliquerTheme(t) {                      // applique le thème "light" ou "dark"
  document.documentElement.setAttribute("data-theme", t);   // le CSS lit cet attribut
  localStorage.setItem("theme", t);               // on retient le choix du visiteur
  document.getElementById("themeBtn").textContent = (t == "dark") ? "☀️" : "🌙";
}
function changerTheme() {                         // clic sur le bouton : on inverse
  var actuel = document.documentElement.getAttribute("data-theme");
  appliquerTheme(actuel == "dark" ? "light" : "dark");
}
function proteger(texte) {                        
  return String(texte).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function trouverProduit(id) {                     
  for (var i = 0; i < produits.length; i++) {
    if (produits[i].id == id) return produits[i];
  }
}
function carteProduit(p) {                        
  var badge = "";
  if (p.ancien) badge += '<span class="badge">-' + Math.round((1 - p.prix / p.ancien) * 100) + '%</span>'; // % de réduction
  if (p.nouveau) badge += '<span class="badge new">Nouveau</span>';
  var ancien = p.ancien ? "<s>" + dt(p.ancien) + "</s>" : "";
  return '<div class="card" onclick="ouvrirProduit(' + p.id + ')">' + badge +
    '<div class="photo"><img loading="lazy" src="images/' + p.photos[0] + '" alt="' + p.nom + '"></div>' +
    '<div class="card-body"><h3>' + p.nom + '</h3><p class="price">' + ancien + dt(p.prix) + '</p></div></div>';
}
function etoiles(n) {                            
  var s = "";
  for (var i = 1; i <= 5; i++) s += (i <= n ? "★" : "☆");
  return s;
}
function sauverPanier() {                         // enregistre + met à jour le compteur
  localStorage.setItem("panier", JSON.stringify(panier));
  var total = 0;
  for (var i = 0; i < panier.length; i++) total += panier[i].qte;
  document.getElementById("cartCount").textContent = total;
}

/* ---------- 3. NAVIGATION ---------- */
function showPage(nom) {
  var pages = document.querySelectorAll(".page");
  for (var i = 0; i < pages.length; i++) pages[i].classList.remove("show-page"); // cache tout
  document.getElementById("page-" + nom).classList.add("show-page");             // montre la page voulue
  if (nom == "shop") afficherBoutique();
  if (nom == "cart") afficherPanier();
  if (nom == "checkout") afficherPaiement();
  document.getElementById("menu").classList.remove("open");                      // ferme le menu mobile
  window.scrollTo(0, 0);
}
function toggleMenu() {                           // ouvre / ferme le menu mobile
  document.getElementById("menu").classList.toggle("open");
}

/* ---------- 4. ACCUEIL ---------- */
function afficherAccueil() {
  var html = "";
  for (var i = 0; i < categories.length; i++) {   // catégories
    var c = categories[i];
    html += '<div class="cat" onclick="ouvrirCategorie(\'' + c.id + '\')"><div class="rond"><img src="images/' + c.photo + '" alt="' + c.nom + '"></div>' + c.nom + '</div>';
  }
  document.getElementById("catList").innerHTML = html;

  var tries = produits.slice();                   // populaires : tri par popularité décroissante
  tries.sort(function (a, b) { return b.pop - a.pop; });
  html = "";
  for (var j = 0; j < 3; j++) html += carteProduit(tries[j]);
  document.getElementById("popularList").innerHTML = html;

  html = "";                                      // promotions : produits qui ont un ancien prix
  for (var k = 0; k < produits.length; k++) {
    if (produits[k].ancien) html += carteProduit(produits[k]);
  }
  document.getElementById("promoList").innerHTML = html;

  var pts = "";                                   // points du slider
  for (var d = 0; d < 3; d++) pts += '<span onclick="allerSlide(' + d + ')"></span>';
  document.getElementById("dots").innerHTML = pts;
  allerSlide(0);
}
function ouvrirCategorie(id) {                    // clic sur une catégorie -> boutique filtrée
  document.getElementById("fCat").value = id;
  filtrer();
  showPage("shop");
}
function allerSlide(n) {                          // affiche le slide n
  var slides = document.querySelectorAll(".slide");
  var points = document.querySelectorAll(".dots span");
  slideActuel = (n + slides.length) % slides.length; // reste entre 0 et 2
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.toggle("show", i == slideActuel);  // seul le bon slide est visible
    points[i].classList.toggle("on", i == slideActuel);
  }
}
function changerSlide(sens) { allerSlide(slideActuel + sens); } // flèches : -1 ou +1
setInterval(function () { changerSlide(1); }, 5000);           // automatique toutes les 5 s

/* ---------- 5. BOUTIQUE ---------- */
function remplirFiltres() {                       // ajoute automatiquement les couleurs et tailles existantes
  var couleurs = [], tailles = [];
  for (var i = 0; i < produits.length; i++) {
    for (var c = 0; c < produits[i].couleurs.length; c++) {
      if (couleurs.indexOf(produits[i].couleurs[c]) == -1) couleurs.push(produits[i].couleurs[c]); // évite les doublons
    }
    for (var t = 0; t < produits[i].tailles.length; t++) {
      if (tailles.indexOf(produits[i].tailles[t]) == -1) tailles.push(produits[i].tailles[t]);
    }
  }
  for (var a = 0; a < couleurs.length; a++) document.getElementById("fCouleur").innerHTML += "<option>" + couleurs[a] + "</option>";
  for (var b = 0; b < tailles.length; b++) document.getElementById("fTaille").innerHTML += "<option>" + tailles[b] + "</option>";
}
function filtrer() { pageActuelle = 1; afficherBoutique(); }   // un filtre change -> retour page 1
function afficherBoutique() {
  var mot = document.getElementById("search").value.toLowerCase();
  var cat = document.getElementById("fCat").value;
  var prixMax = Number(document.getElementById("fPrix").value);
  var couleur = document.getElementById("fCouleur").value;
  var taille = document.getElementById("fTaille").value;
  var promoSeul = document.getElementById("fPromo").checked;
  var tri = document.getElementById("fTri").value;

  var liste = [];
  for (var i = 0; i < produits.length; i++) {     // 1) FILTRER : le produit doit passer tous les tests
    var p = produits[i];
    var ok = (cat == "all" || p.cat == cat) &&
             p.prix <= prixMax &&
             (couleur == "all" || p.couleurs.indexOf(couleur) != -1) &&
             (taille == "all" || p.tailles.indexOf(taille) != -1) &&
             (!promoSeul || p.ancien > 0) &&
             (p.nom + " " + p.desc).toLowerCase().indexOf(mot) != -1;
    if (ok) liste.push(p);
  }
  liste.sort(function (a, b) {                    // 2) TRIER
    if (tri == "asc") return a.prix - b.prix;
    if (tri == "desc") return b.prix - a.prix;
    return b.pop - a.pop;
  });

  var nbPages = Math.ceil(liste.length / PAR_PAGE);            // 3) PAGINER
  var debut = (pageActuelle - 1) * PAR_PAGE;
  var html = "";
  for (var k = debut; k < debut + PAR_PAGE && k < liste.length; k++) html += carteProduit(liste[k]);
  document.getElementById("shopList").innerHTML = html;
  document.getElementById("noResult").style.display = liste.length == 0 ? "block" : "none";

  var boutons = "";                               // boutons 1, 2, 3...
  for (var n = 1; n <= nbPages && nbPages > 1; n++) boutons += '<button class="' + (n == pageActuelle ? "on" : "") + '" onclick="allerPage(' + n + ')">' + n + '</button>';
  document.getElementById("pagination").innerHTML = boutons;
}
function allerPage(n) { pageActuelle = n; afficherBoutique(); window.scrollTo(0, 0); }

/* ---------- 6. PAGE PRODUIT ---------- */
function ouvrirProduit(id) {
  var p = trouverProduit(id);
  var liste = avis[id] || [];
  var somme = 0;
  for (var a = 0; a < liste.length; a++) somme += liste[a].note;
  var moyenne = liste.length ? Math.round(somme / liste.length) : 0;   // note moyenne arrondie

  var minis = "";                                 // miniatures de la galerie
  for (var i = 0; i < p.photos.length; i++) minis += '<img src="images/' + p.photos[i] + '" class="' + (i == 0 ? "on" : "") + '" onclick="changerPhoto(this)" alt="Vue ' + (i + 1) + '">';
  var optCouleurs = "";
  for (var c = 0; c < p.couleurs.length; c++) optCouleurs += "<option>" + p.couleurs[c] + "</option>";
  var blocTaille = "";
  if (p.tailles.length) {                         // option taille seulement si le produit en a
    var optT = "";
    for (var t = 0; t < p.tailles.length; t++) optT += "<option>" + p.tailles[t] + "</option>";
    blocTaille = '<div class="opt-row"><label>Taille</label><select id="selTaille">' + optT + '</select></div>';
  }
  var blocGravure = p.gravure ? '<div class="opt-row"><label>Gravure d\'un prénom (+' + dt(PRIX_GRAVURE) + ')</label><input id="gravure" maxlength="12" placeholder="Ex : Sarra" oninput="majGravure()"></div>' : "";
  var htmlAvis = "";
  for (var v = 0; v < liste.length; v++) htmlAvis += '<div class="avis"><span class="stars">' + etoiles(liste[v].note) + "</span><br><b>" + proteger(liste[v].nom) + "</b> : " + proteger(liste[v].texte) + "</div>";
  var ancien = p.ancien ? "<s>" + dt(p.ancien) + "</s>" : "";

  document.getElementById("page-product").innerHTML =
    '<div class="detail"><div>' +
      '<div class="zoom" onmousemove="zoomer(event)" onmouseleave="resetZoom()"><img id="grandePhoto" src="images/' + p.photos[0] + '" alt="' + p.nom + '"><div class="gravure-apercu" id="apercu"></div></div>' +
      '<div class="thumbs">' + minis + '</div></div>' +
    '<div><p class="hand">fait main</p><h2>' + p.nom + '</h2>' +
      '<div class="stars">' + etoiles(moyenne) + ' <small style="display:inline">(' + liste.length + ' avis)</small></div>' +
      '<p class="price" style="font-size:1.7rem">' + ancien + dt(p.prix) + '</p><p>' + p.desc + '</p>' +
      '<ul class="specs"><li><b>Matériaux :</b> ' + p.matiere + '</li><li><b>Dimensions :</b> ' + p.dim + '</li></ul>' +
      '<div class="opt-row"><label>Couleur</label><select id="selCouleur">' + optCouleurs + '</select></div>' +
      blocTaille + blocGravure +
      '<button class="btn full" onclick="ajouterAuPanier(' + p.id + ')">Ajouter au panier</button></div></div>' +
    '<h2 class="title">Avis clients</h2>' + (htmlAvis || "<p class='center'>Aucun avis pour le moment.</p>") +
    '<div class="box avis-form"><h3>Laissez votre avis</h3><div class="stars" id="noteStars"></div>' +
    '<input id="avisNom" placeholder="Votre prénom"><textarea id="avisTexte" rows="3" placeholder="Votre avis…"></textarea>' +
    '<button class="btn" onclick="publierAvis(' + p.id + ')">Publier</button></div>' +
    '<h2 class="title">Vous aimerez aussi</h2><div class="grid" id="similaires"></div>';

  var sim = "";                                   // produits similaires = même catégorie
  for (var s = 0; s < produits.length; s++) {
    if (produits[s].cat == p.cat && produits[s].id != p.id) sim += carteProduit(produits[s]);
  }
  document.getElementById("similaires").innerHTML = sim || "<p class='center'>Bientôt d'autres créations</p>";
  noteChoisie = 5;
  choisirNote(5);
  showPage("product");
}
function changerPhoto(mini) {                     // galerie : clic sur une miniature
  document.getElementById("grandePhoto").src = mini.src;
  var toutes = mini.parentNode.querySelectorAll("img");
  for (var i = 0; i < toutes.length; i++) toutes[i].classList.remove("on");
  mini.classList.add("on");
}
function zoomer(e) {                              // ZOOM : agrandit la photo là où passe la souris
  var cadre = e.currentTarget.getBoundingClientRect();
  var x = (e.clientX - cadre.left) / cadre.width * 100;   // position de la souris en %
  var y = (e.clientY - cadre.top) / cadre.height * 100;
  var img = document.getElementById("grandePhoto");
  img.style.transformOrigin = x + "% " + y + "%";
  img.style.transform = "scale(2)";
}
function resetZoom() { document.getElementById("grandePhoto").style.transform = "scale(1)"; } // retour normal
function majGravure() {                           // aperçu en direct du prénom gravé
  document.getElementById("apercu").textContent = document.getElementById("gravure").value; // textContent est sans danger (pas de HTML interprété)
}
function choisirNote(n) {                         // étoiles cliquables pour noter
  noteChoisie = n;
  var s = "";
  for (var i = 1; i <= 5; i++) s += '<span onclick="choisirNote(' + i + ')">' + (i <= n ? "★" : "☆") + "</span>";
  document.getElementById("noteStars").innerHTML = s;
}
function publierAvis(id) {
  var texte = document.getElementById("avisTexte").value.trim();
  var nom = document.getElementById("avisNom").value.trim() || "Anonyme";
  if (texte == "") return alert("Écrivez votre avis");
  if (!avis[id]) avis[id] = [];                   // crée la liste si elle n'existe pas encore
  avis[id].push({ nom: nom, note: noteChoisie, texte: texte });
  ouvrirProduit(id);                              // réaffiche la page avec le nouvel avis
}

/* ---------- 7. PANIER ---------- */
function ajouterAuPanier(id) {
  var couleur = document.getElementById("selCouleur").value;
  var taille = document.getElementById("selTaille") ? document.getElementById("selTaille").value : "-"; // "-" si pas de taille
  var gravure = document.getElementById("gravure") ? document.getElementById("gravure").value.trim() : "";
  for (var i = 0; i < panier.length; i++) {       // même article déjà dans le panier ? alors +1
    var l = panier[i];
    if (l.id == id && l.couleur == couleur && l.taille == taille && l.gravure == gravure) {
      l.qte++;
      sauverPanier();
      return alert("Quantité mise à jour");
    }
  }
  panier.push({ id: id, couleur: couleur, taille: taille, gravure: gravure, qte: 1 }); // sinon nouvelle ligne
  sauverPanier();
  alert("Ajouté au panier");
}
function prixLigne(l) {                           // prix d'une ligne = (prix + gravure) x quantité
  return (trouverProduit(l.id).prix + (l.gravure ? PRIX_GRAVURE : 0)) * l.qte;
}
function calculer() {                             // tous les montants
  var sous = 0;
  for (var i = 0; i < panier.length; i++) sous += prixLigne(panier[i]);
  var remise = promo ? Math.round(sous * codesPromo[promo]) / 100 : 0;
  var livraison = (sous == 0 || sous - remise >= 250) ? 0 : 8;  // livraison 8 DT, offerte dès 250 DT
  return { sous: sous, remise: remise, livraison: livraison, total: sous - remise + livraison };
}
function afficherPanier() {
  var html = "";
  for (var i = 0; i < panier.length; i++) {
    var l = panier[i], p = trouverProduit(l.id);
    var details = l.couleur + (l.taille != "-" ? " · taille " + l.taille : "") + (l.gravure ? " · gravure « " + proteger(l.gravure) + " »" : "");
    html += '<div class="item"><img src="images/' + p.photos[0] + '" alt="' + p.nom + '"><div><b>' + p.nom + '</b><br><small style="color:var(--muted);min-height:0">' + details + '</small><span class="price">' + dt(prixLigne(l)) + '</span></div>' +
      '<div><button onclick="changerQte(' + i + ',-1)">−</button> ' + l.qte + ' <button onclick="changerQte(' + i + ',1)">+</button> <button onclick="supprimer(' + i + ')">✕</button></div></div>';
  }
  document.getElementById("cartList").innerHTML = html || "<div class='box center'>Votre panier est vide<br><br><button class='btn' onclick=\"showPage('shop')\">Voir la boutique</button></div>";
  var t = calculer();                             // totaux mis à jour en temps réel
  document.getElementById("sSub").textContent = dt(t.sous);
  document.getElementById("sRem").textContent = "-" + dt(t.remise);
  document.getElementById("sLiv").textContent = t.livraison ? dt(t.livraison) : "Offerte";
  document.getElementById("sTotal").textContent = dt(t.total);
}
function changerQte(i, delta) {
  panier[i].qte += delta;
  if (panier[i].qte < 1) panier.splice(i, 1);     // supprime si la quantité tombe à 0
  sauverPanier(); afficherPanier();
}
function supprimer(i) { panier.splice(i, 1); sauverPanier(); afficherPanier(); }
function appliquerPromo() {                       // vérifie le code promo
  var code = document.getElementById("promoInput").value.trim().toUpperCase();
  var msg = document.getElementById("promoMsg");
  if (codesPromo[code]) { promo = code; msg.textContent = "Code appliqué : -" + codesPromo[code] + " %"; msg.className = "ok"; }
  else { promo = ""; msg.textContent = "Code invalide"; msg.className = "ko"; }
  afficherPanier();
}
function allerPaiement() {
  if (panier.length == 0) return alert("Votre panier est vide");
  showPage("checkout");
}

/* ---------- 8. PAIEMENT ---------- */
function afficherPaiement() {
  document.getElementById("checkoutBox").style.display = "grid";
  document.getElementById("confirmBox").style.display = "none";
  var html = "";
  for (var i = 0; i < panier.length; i++) html += '<p class="line"><span>' + trouverProduit(panier[i].id).nom + ' × ' + panier[i].qte + '</span><b>' + dt(prixLigne(panier[i])) + '</b></p>';
  var t = calculer();
  html += '<p class="line">Livraison <b>' + (t.livraison ? dt(t.livraison) : "Offerte") + '</b></p><p class="line total">Total <b>' + dt(t.total) + '</b></p>';
  document.getElementById("recap").innerHTML = html;
}
function moyenChoisi() { return document.querySelector("input[name=moyen]:checked").value; }
function changerMoyen() {                         // cache les champs carte si PayPal ou Stripe
  document.getElementById("blocCarte").style.display = moyenChoisi() == "carte" ? "block" : "none";
}
function formaterCarte() {                        // ajoute un espace tous les 4 chiffres
  var champ = document.getElementById("carte");
  champ.value = champ.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
}
function erreur(champ, message) {                 // affiche ou efface l'erreur sous un champ ; true si OK
  document.getElementById("e-" + champ).textContent = message;
  document.getElementById(champ).classList.toggle("err", message != "");
  return message == "";
}
function valeur(id) { return document.getElementById(id).value.trim(); }
function validerPaiement(e) {
  e.preventDefault();                             // empêche le rechargement de la page
  var ok = true;
  if (!erreur("nom", valeur("nom").length >= 3 ? "" : "Nom trop court")) ok = false;
  if (!erreur("email", /^\S+@\S+\.\S+$/.test(valeur("email")) ? "" : "Email invalide")) ok = false;
  if (!erreur("adresse", valeur("adresse").length >= 8 ? "" : "Adresse trop courte")) ok = false;
  if (!erreur("ville", valeur("ville").length >= 2 ? "" : "Ville requise")) ok = false;
  if (moyenChoisi() == "carte") {                 // champs carte vérifiés seulement si "Carte"
    if (!erreur("carte", /^\d{16}$/.test(valeur("carte").replace(/\s/g, "")) ? "" : "16 chiffres requis")) ok = false;
    if (!erreur("exp", /^(0[1-9]|1[0-2])\/\d{2}$/.test(valeur("exp")) ? "" : "Format MM/AA")) ok = false;
    if (!erreur("cvv", /^\d{3}$/.test(valeur("cvv")) ? "" : "3 chiffres")) ok = false;
  }
  if (!ok) return;                                // stop s'il y a une erreur
  var commande = { client: valeur("nom"), adresse: valeur("adresse") + ", " + valeur("ville"), moyen: moyenChoisi(), lignes: panier.slice(), total: calculer().total };
  var bouton = document.getElementById("payBtn");
  bouton.textContent = "Paiement en cours…"; bouton.disabled = true;
  payerAvecAPI(commande, function () {            // une fois le paiement "validé"
    bouton.textContent = "Payer maintenant"; bouton.disabled = false;
    afficherConfirmation(commande);
  });
}
function payerAvecAPI(commande, suite) {
  // SIMULATION d'une API de paiement. Avec un vrai serveur, c'est ici qu'on appellerait Stripe ou PayPal
  // (fetch vers le backend qui crée la session de paiement). Sans backend, on attend 1,5 s puis on continue.
  setTimeout(suite, 1500);
}
function afficherConfirmation(c) {                // message de confirmation + détails de la commande
  var detail = "";
  for (var i = 0; i < c.lignes.length; i++) detail += "<p>" + trouverProduit(c.lignes[i].id).nom + " × " + c.lignes[i].qte + "</p>";
  var numero = "RY-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById("checkoutBox").style.display = "none";
  var boite = document.getElementById("confirmBox");
  boite.style.display = "block";
  boite.innerHTML = '<h2>Merci ' + proteger(c.client) + '</h2><p>Votre commande <b>' + numero + '</b> est confirmée.</p><br>' + detail +
    '<br><p>Total payé : <b>' + dt(c.total) + '</b> (' + c.moyen + ')</p><p>Livraison à : ' + proteger(c.adresse) + '</p><p>Arrivée estimée : 3 à 5 jours</p>' +
    '<br><button class="btn" onclick="showPage(\'home\')">Retour à l\'accueil</button>';
  panier = []; promo = ""; sauverPanier();        // le panier est vidé
}

/* ---------- DÉMARRAGE ---------- */
// thème : choix enregistré, sinon celui de l'appareil du visiteur
appliquerTheme(localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
remplirFiltres();    // couleurs et tailles du filtre
afficherAccueil();   // catégories, populaires, promos, slider
sauverPanier();      // compteur du panier
showPage("home");    // page de départ
document.addEventListener("DOMContentLoaded", function () {
    const btnRetour = document.querySelector(".btn-retour");

    if (btnRetour) {
        btnRetour.addEventListener("click", function () {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "index.html";
            }
        });
    }
});