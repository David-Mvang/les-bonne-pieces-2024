export function ajoutListenerAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button")

    for(let i = 0; i < piecesElements.length; i++){
        piecesElements[i].addEventListener("click", async function (event) {
            const id = event.target.dataset.id;
            const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`); 
            const avis = await reponse.json();
            window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis));
            const pieceElement = event.target.parentElement;

            afficherAvis(pieceElement, avis);
         })
    }
}

export function afficherAvis(pieceElement, avis){
    const avisElement = document.createElement("p")
    for(let i = 0; i < avis.length; i++){
        avisElement.innerHTML += `<p>${avis[i].utilisateur}:</p> ${avis[i].commentaire}</p>${avis[i].nbEtoiles}</br>`
    }
    
    pieceElement.appendChild(avisElement);
}

export function ajoutListenerEnvoyerAvis() {
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function(event){
        event.preventDefault();

        const avis = {
            pieceId: parseInt(event.target.querySelector("[name=piece-id]").value), 
            utilisateur: event.target.querySelector("[name=utilisateur]").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
            nbEtoiles: parseInt(event.target.querySelector("[name=nbEtoiles]").value)
        }
        console.log("nbEtoiles:", event.target.querySelector("[name=nbEtoiles]").value);

        const chargeUtile = JSON.stringify(avis);

        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: chargeUtile
        })
        
        formulaireAvis.reset();
    });
}


