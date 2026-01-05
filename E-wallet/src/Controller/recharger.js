import { recharger } from "../Service/rechargerService.js"

const choixCompte = document.getElementById("cardSelect");
const montantInput = document.getElementById("rechargeAmount");
const verificationInput = document.getElementById("confirmPass");
const confirmBtn = document.getElementById("validerRecharge");
const statusMsg = document.getElementById("statusMsg");

// Get user from session
let user = JSON.parse(sessionStorage.getItem("user"));

// Populate the dropdown with user's cards/accounts
// Populate dropdown with user's cards
function loadCartes() {
    // Add default option first
    choixCompte.innerHTML = '<option value="">-- Sélectionner --</option>';
    
    user.comptes.forEach(compte => {
        const option = document.createElement("option");
        option.value = compte.type;
        option.textContent = `${compte.type} - ${compte.solde} MAD`;
        choixCompte.appendChild(option);
    });
}

loadCartes();

confirmBtn.addEventListener("click", handleValider);

function handleValider() {
    let numcompte = verificationInput.value;
    let amount = montantInput.value;
    let compteSource = choixCompte.value;

    if (amount <= 0 || numcompte === "" || numcompte !== user.numCompte) {
        alert("Données invalides");
        return;
    }

    recharger(compteSource, numcompte, amount)
        .then((message) => {
            console.log("Recharge réussie: " + message);
            setTimeout(() => {
                window.location.href = "../view/dashboard.html";
            }, 300);
        })
        .catch((error) => {
            console.log("Erreur: " + error);
        });
}