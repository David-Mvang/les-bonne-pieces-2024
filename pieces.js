import { ajoutListenerAvis, afficherAvis, ajoutListenerEnvoyerAvis, afficherGraphiqueAvis } from "./avis.js";

// Recuperation des informations dans le local storage
    let pieces = window.localStorage.getItem("pieces");
    if(pieces === null){
        // Récupération des pièces depuis l'API 
        const reponse = await fetch(`http://localhost:8081/pieces`); 
        pieces = await reponse.json();
        // Transformation des donnees en formant json
        const valeurPieces = JSON.stringify(pieces);
        // Stockage des informations dans le localstorage 
        window.localStorage.setItem("pieces", valeurPieces);
    }else{
        pieces = JSON.parse(pieces);
    }

// On appelle la fonction pour ajouter le Listener au formulaire
ajoutListenerEnvoyerAvis();

function genererPieces(pieces){
    for (let i = 0; i < pieces.length; i++){
        // recuperation de l'element DOM qui acceuillera les fiches
        const sectionFiches = document.querySelector(".fiches")
        console.log(sectionFiches)
        // creation d'une balise dedier a une piece automobile
        const pieceElement = document.createElement("article")
        // creation des elelements de cette piece
        // pieceElement.setAttribute("data-id", pieces[i].id);
        pieceElement.dataset.id = pieces[i].id;
        const imageElement = document.createElement("img");
        imageElement.src = pieces[i].image
        const nomElement = document.createElement("h2")
        nomElement.innerText = pieces[i].nom
        const prixElement = document.createElement("p")
        prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
        const categorieElement =  document.createElement("p")
        categorieElement.innerText = pieces[i].categorie ?? "(aucune categorie)"
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = pieces[i].description ?? ("Pas de description pour le moment")
        const stockElement = document.createElement("p")
        stockElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";    
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = pieces[i].id;
        avisBouton.innerText = "Afficher les avis";
            
        // On rattache la balise article a la section fiche
        sectionFiches.appendChild(pieceElement)
    
        // On rattache nos elements crees a piecesElement (la balise article)
        pieceElement.appendChild(imageElement)
        pieceElement.appendChild(nomElement)
        pieceElement.appendChild(prixElement)
        pieceElement.appendChild(categorieElement)
        pieceElement.appendChild(descriptionElement)
        pieceElement.appendChild(stockElement)
        pieceElement.appendChild(avisBouton);
    }
    ajoutListenerAvis();
}
console.log(pieces);
genererPieces(pieces);

for(let i = 0; i < pieces.length; i++){
    const id = pieces[i].id;
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`);
    const avis = JSON.parse(avisJSON);

    if(avis !== null){
        const pieceElement = document.querySelector(`article[data-id="${id}"]`);
        afficherAvis(pieceElement, avis)
    }
}

// Gestion des bouttons
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function (){
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a,b){
        return a.prix - b.prix
    })
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesOrdonnees)
})

const boutonFiltrer = document.querySelector(".btn-filtrer")

boutonFiltrer.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= 35;
    })
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
})

const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
     });
     document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonNoDescription = document.querySelector(".btn-nodesc");

boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});


// Ajout du listener pour afficher les pieces par rapport au prix maximum lors du glissage par la souris
const inputPrixMax = document.querySelector("#prix-max")
const prixAffiche = document.querySelector("#prix-valeur")

inputPrixMax.addEventListener("input", function() {
    prixAffiche.innerText = inputPrixMax.value 

    const piecesFiltrees = pieces
    .filter(piece => piece.prix <= inputPrixMax.value)
    
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
})

// Copie de la liste en affichant que le nom et prix des pieces disponibles
const nomsEtPrixPiecesDisponibles = pieces
.filter(piece => piece.disponibilite)
.map(piece => `${piece.nom} - ${piece.prix} €.`)

const piecesDisponible = document.createElement("ul")

for(let i = 0; i < nomsEtPrixPiecesDisponibles.length; i++){
    const nomPrixPiece = document.createElement("li");
    nomPrixPiece.innerText = nomsEtPrixPiecesDisponibles[i];
    piecesDisponible.appendChild(nomPrixPiece);
}

document.querySelector(".disponibles")
.appendChild(piecesDisponible);

// Copie de la liste en affichant en affichant que les pieces abordables
const listePiecesAbordables = pieces.filter(piece => piece.prix <= 35);
const piecesAbordables = document.createElement("ul");

for(let i = 0; i < listePiecesAbordables.length; i++){
    const elementAbordable = document.createElement("li");
    elementAbordable.innerText = listePiecesAbordables[i].nom;
    piecesAbordables.appendChild(elementAbordable);
}

document.querySelector(".abordables")
.appendChild(piecesAbordables);

// Ajout du listener pour mettre à jour des données du localStorage
const boutonMettreAJour = document.querySelector(".btn-maj");
boutonMettreAJour.addEventListener("click", function () {
  window.localStorage.removeItem("pieces");
});

await afficherGraphiqueAvis();
