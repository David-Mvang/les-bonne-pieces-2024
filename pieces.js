// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

function genererPieces(pieces){
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
}
genererPieces(pieces)

// Ajout du listener pour trier les pieces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function (){
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a,b){
        return a.prix - b.prix
    })
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesOrdonnees)
})

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

// Ajout du listener pour filtrer les pieces non abordables
const boutonFiltrer = document.querySelector(".btn-filtrer")
boutonFiltrer.addEventListener("click", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= 35;
    })
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
})

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



