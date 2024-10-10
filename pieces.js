// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++){
    // recuperation de l'element DOM qui acceuillera les fiches
    const sectionFiches = document.querySelector(".fiches")
    // creation d'une balise dedier a une piece automobile
    const pieceElement = document.createElement("article")
    // creation des elelements de cette piece
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
    stockElement.innerText = pieces[i].Disponibilite ? "En stock" : "Rupture de stock";        

    // On rattache la balise article a la section fiche
    sectionFiches.appendChild(pieceElement)

    // On rattache nos elements crees a piecesElement (la balise article)
    pieceElement.appendChild(imageElement)
    pieceElement.appendChild(nomElement)
    pieceElement.appendChild(prixElement)
    pieceElement.appendChild(categorieElement)
    pieceElement.appendChild(descriptionElement)
    pieceElement.appendChild(stockElement)
}

// ***Reordonner les elements de la liste lors du clic sur le bouton Trier***
// Triage ordre croissant 
// Recuperation de l'element DOM du bouton Trier
const boutonTrier = document.querySelector(".btn-trier");
// Ecoutons l'evenement par click sur le bouton Trier
boutonTrier.addEventListener("click", function (){
    // Creation du copie de notre liste afin de ne pas modifier la liste origanale 
    const piecesCopie = Array.from(pieces);
    piecesCopie.sort(function(a,b){
        return a.prix - b.prix
    })
    console.log(piecesCopie)
})
// Triage ordre decroissant 
// Recuperation de l'element DOM du bouton Trier Ordre decroissant
const boutonTrierOrdreDecroissant = document.querySelector(".btn-trier-decroissant");
// Ecoutons l'evenement par click sur le bouton Trier
boutonTrierOrdreDecroissant.addEventListener("click", function (){
    // Creation du copie de notre liste afin de ne pas modifier la liste origanale 
    const piecesCopieDecroissant = Array.from(pieces);
    piecesCopieDecroissant.sort(function(a,b){
        return b.prix - a.prix
    })
    console.log(piecesCopieDecroissant)
})

// ***Filtrage des elements de la liste lors du click sur le bouton filtrer***
// Recuperation de l'element DOM du bouton Filtrer
const boutonFiltrer = document.querySelector(".btn-filtrer")
// Ecoutons l'evenement par click sur le bouton filtrer 
boutonFiltrer.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= 35;
    })
    console.log(piecesFiltrees)
})
// Recuperation de l'element DOM du bouton Filtrer avec description
const boutonFiltrerAvecDescription = document.querySelector(".btn-filtrer-description")
// Ecoutons l'evenement par click sur le bouton filtrer 
boutonFiltrerAvecDescription.addEventListener("click", function(){
    const piecesFiltreesDescription = pieces.filter(function(piece){
        return piece.description;
    })
    console.log(piecesFiltreesDescription)
})

// Copie de la liste en affichant que le nom des pieces dont prix le est inferieur a 35
const noms = pieces.map(piece => piece.nom)
for(let i = pieces.length -1; i >= 0; i--){
    if(pieces[i].prix > 35){
       noms.splice(i,1) 
    }
}
console.log(noms)
// creation de la balise liste qui va contenir tous les noms des elements abordables
const abordablesElement = document.createElement("ul")
// Ajout de chaque nom a la liste abordable
for(let i = 0; i < noms.length; i++){
    const nomElement = document.createElement("li")
    nomElement.innerText = noms[i]
    abordablesElement.appendChild(nomElement)
}
// Ajout de la liste au bloc resultat fiches
document.querySelector(".abordables")
.appendChild(abordablesElement)

// Copie de la liste en affichant que le nom et prix des pieces disponibles
const nomsEtPrixPiecesDisponibles = pieces
.filter(piece => piece.Disponibilite)
.map(piece => `${piece.nom} - ${piece.prix} €.`)
console.log(nomsEtPrixPiecesDisponibles)
// creation de la balise liste qui va contenir tous les noms et prix des pieces disponibles
const piecesDisponible = document.createElement("ul")
// Ajout de chaque nom a la liste abordable
for(let i = 0; i < nomsEtPrixPiecesDisponibles.length; i++){
    const nomPrixPiece = document.createElement("li")
    nomPrixPiece.innerText = nomsEtPrixPiecesDisponibles[i]
    piecesDisponible.appendChild(nomPrixPiece)
}
// Ajout de la liste au bloc resultat fiches
document.querySelector(".disponibles")
.appendChild(piecesDisponible)



