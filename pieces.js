// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

// creation des balises de notre element
const article = pieces[0];
const imageElement = document.createElement("img");
imageElement.src = article.image
const nomElement = document.createElement("h2")
nomElement.innerText = article.nom
const prixElement = document.createElement("p")
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
const categorieElement =  document.createElement("p")
categorieElement.innerText = article.categorie ?? "(aucune categorie)"
const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? ("Pas de description pour le moment")
const stockElement = document.createElement("p")
stockElement.innerText = article.Disponibilite ? "En stock" : "Rupture de stock";

// Ajout des balises crees sur dans notre page web
const sectionFiches = document.querySelector(".fiches")
sectionFiches.appendChild(imageElement)
sectionFiches.appendChild(nomElement)
sectionFiches.appendChild(prixElement)
sectionFiches.appendChild(categorieElement)
sectionFiches.appendChild(descriptionElement)
sectionFiches.appendChild(stockElement)



