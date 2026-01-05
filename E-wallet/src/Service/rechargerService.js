import { Finduserbyaccount } from "../Model/data.js"

function checkUser(numCompte) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let user = Finduserbyaccount(numCompte);
            if (user) {
                resolve(user);
            } else {
                reject('Compte non trouvé');
            }
        }, 100)
    })
}

function addToCard(amount, compte) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (amount > 0) {
                compte.solde += amount;
                resolve("Carte rechargée");
            } else {
                reject("Montant invalide");
            }
        }, 100);
    })
}

function updateBalance(amount, user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (amount > 0) {
                user.balance += amount;
                resolve("Balance mise à jour");
            } else {
                reject("Montant invalide");
            }
        }, 100);
    })
}

function addTransactions(amount, user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let recharge = {
                date: new Date().toLocaleString(),
                description: `RECHARGE`,
                type: "+",
                montant: amount,
                status: "success"
            };
            user.transaction.push(recharge);
            resolve("Transaction ajoutée");
        }, 300);
    })
}

async function recharger(compteSource, numcompte, amount) {
    let user = null;
    try {
        user = await checkUser(numcompte);
        console.log("user found");
        
        const currentUser = JSON.parse(sessionStorage.getItem("user"));
        const compte = currentUser.comptes.find(c => c.type === compteSource);
        
        const cardMessage = await addToCard(parseFloat(amount), compte);
        console.log(cardMessage);
        
        const balanceMessage = await updateBalance(parseFloat(amount), currentUser);
        console.log(balanceMessage);
        
        await addTransactions(parseFloat(amount), currentUser);
        
        sessionStorage.setItem("user", JSON.stringify(currentUser));
    } catch (error) {
        console.log(error);
    }
}

export { recharger };