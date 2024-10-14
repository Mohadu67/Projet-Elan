document.addEventListener('DOMContentLoaded', function() {
    let combinaisonCorrecte;

    const boutonEssai = document.getElementById('boutonEssai');
    const boutonRecommencer = document.getElementById('boutonRecommencer');
    const nombreUtilisateur = document.getElementById('nombreUtilisateur');
    const messageResultat = document.getElementById('messageResultat');

    function genererCombinaison() {
        let combinaison = '';
        for (let i = 0; i < 4; i++) {
            combinaison += Math.floor(Math.random() * 10);
        }
        return combinaison;
    }

    function initialiserJeu() {
        combinaisonCorrecte = genererCombinaison();
        messageResultat.textContent = "";
        nombreUtilisateur.value = "";
        boutonEssai.disabled = false;
    }

    boutonEssai.addEventListener('click', function() {
        const saisieUtilisateur = nombreUtilisateur.value;

        if (saisieUtilisateur.length !== 4 || !/^\d{4}$/.test(saisieUtilisateur)) {
            messageResultat.textContent = "Veuillez entrer une combinaison valide de 4 chiffres.";
            messageResultat.style.color = "red";
            return;
        }

        let correctPosition = 0;
        let correctChiffre = 0;

        const combinaisonCorrecteArray = Array.from(combinaisonCorrecte);
        const saisieUtilisateurArray = Array.from(saisieUtilisateur);


        for (let i = 0; i < 4; i++) {
            if (saisieUtilisateurArray[i] === combinaisonCorrecteArray[i]) {
                correctPosition++;
                combinaisonCorrecteArray[i] = null; 
                saisieUtilisateurArray[i] = null; 
            }
        }

  
        for (let i = 0; i < 4; i++) {
            if (saisieUtilisateurArray[i] !== null && combinaisonCorrecteArray.includes(saisieUtilisateurArray[i])) {
                correctChiffre++;
                combinaisonCorrecteArray[combinaisonCorrecteArray.indexOf(saisieUtilisateurArray[i])] = null; 
            }
        }

        if (saisieUtilisateur === combinaisonCorrecte) {
            messageResultat.textContent = "Bravo ! Vous avez trouvé la combinaison correcte.";
            messageResultat.style.color = "green";
            boutonEssai.disabled = true;
        } else {
            messageResultat.textContent = `Combinaison incorrecte. ${correctPosition} chiffre(s) correct(s) et au bon endroit, ${correctChiffre} chiffre(s) correct(s) mais mal placé(s). Essayez encore !`;
            messageResultat.style.color = "red";
        }
    });

    boutonRecommencer.addEventListener('click', function() {
        initialiserJeu();
    });

    initialiserJeu(); 
});
