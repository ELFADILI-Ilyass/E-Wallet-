import {FindTransaction} from "../Model/data.js";

const welcome_message=document.getElementById("welcome_message");
const montant=document.getElementById("balance");
const date=document.getElementById("date");
const transac=document.getElementById("transactions");
const filterS=document.getElementById("filterX");
const transfer=document.getElementById("transferer");
const payerbtn=document.getElementById("payer");
const rechargerBtn=document.getElementById("recharger");


const user = JSON.parse(sessionStorage.getItem("user"));
welcome_message.textContent ="Bonjour " + user.nom;
montant.textContent=user.balance+"  MAD";

const allTransactions=user.transaction;

function returnF(list) {
    transac.innerHTML = "";
    if (!list || list.length === 0) {
    transac.innerHTML = `
      <tr>
        <td colspan="4" class="no-transactions">
          Aucune transaction disponible
        </td>
      </tr>
    `;
    return;
  } 
    
    list.forEach(t => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td>${t.type}</td>
            <td>${t.montant}</td>

        `;
        transac.appendChild(tr);
    });
}
returnF(allTransactions);

filterS.addEventListener("change",()=>{

    if(filterS.value==="E"){

        const crediter=FindTransaction(user,"+");
        returnF(crediter);

    }
      if(filterS.value==="S"){

      const debiter=FindTransaction(user,"-");
      returnF(debiter);

      }
      if(filterS.value==="T"){
        returnF(allTransactions);
        
      }
    });
 
    
    
    //payer



payerbtn.addEventListener("click",()=>{
    const isHidden = paymentContainer.style.display === "none";
    paymentContainer.style.display = isHidden ? "block" : "none";

})

const confirmBtn =document.getElementById("Confirm");
const status = document.getElementById("paymentStatus");

const checkSolde=(prix)=>{
  return new Promise((resolve,reject)=>{
    if(user.balance>=prix && prix>0){
      resolve('Success');
    }
    else if (prix <= 0) {
            reject("Montant invalide");
        } else {
            reject("Solde insuffisant");
        }
  })
}


const checkUser=(inputPassword)=>{
   return new Promise ((resolve,reject)=>{
    setTimeout(()=>{

      if(!user){
          reject(" Utulisateur introuvable");
      }
      else if(inputPassword!==user.numCompte)
      {
        reject("Please try again");
          
      }
      else{
        resolve("Bonjour "+user.nom);
      }
   },1000)
    })  
  
  }

  const updateData = (amount) => {
    user.balance -= amount;

    const newT = {
        date:"2025-12-31" ,
        description: "Paiement Service",
        type: "-",
        montant: amount
    };
    user.transaction.push(newT);
    sessionStorage.setItem("user", JSON.stringify(user));

    montant.textContent = user.balance + " MAD";
    
    returnF(user.transaction); 
};

confirmBtn.addEventListener("click",()=>{
  const montant= parseFloat(document.getElementById("prixInput").value);
  const pass= document.getElementById("passInput").value;

  status.textContent="Verification...."
  status.style.color="orange";

  checkUser(pass)
    .then((message)=>{
      status.textContent=message+"  Verification du solde...";
      return checkSolde(montant);
    })
    .then(() => {

            updateData(montant);

            status.textContent = "Paiement réussi !";
            status.style.color = "green";
        })
        .catch((error) => {
            status.textContent = error;
            status.style.color = "red";
        });

});


// transfer: 

transfer.addEventListener("click",handletransfer);

function handletransfer(){
   setTimeout(()=>{
                  window.location.href="/src/view/Transfer.html";
                },1000);
}

// recharger : 

rechargerBtn.addEventListener("click",()=>{
    window.location.href="../view/recharger.html"

})

//Comptes /cartes: 

// 1. Get the container for the accounts
const accountsContainer = document.getElementById("accounts-container");

// 2. Function to display the cards (pockets)
const displayAccounts = (user) => {
    // Clear the container first
    accountsContainer.innerHTML = "";

    // Check if the user has a 'comptes' array
    if (user.comptes && user.comptes.length > 0) {
        user.comptes.forEach(compte => {
            // Create the card element
            const pocketCard = document.createElement("div");
            pocketCard.classList.add("pocket-card");

            // Fill with content (Type, Icon, and Solde)
            pocketCard.innerHTML = `
                <div class="pocket-icon">${compte.icon || '💳'}</div>
                <div class="pocket-info">
                    <h4>${compte.type}</h4>
                    <p>${compte.solde.toLocaleString()} MAD</p>
                </div>
            `;

            // Add to the grid
            accountsContainer.appendChild(pocketCard);
        });
    } else {
        accountsContainer.innerHTML = "<p>Aucun compte secondaire trouvé.</p>";
    }
};

// 3. Call the function (usually inside your initialization code)
displayAccounts(user);


//     function updateClock() {
//     const now = new Date();
//     // Formats time as HH:MM:SS
//     date.textContent = now.toLocaleTimeString(); 
// }

// // Start the timer
// setInterval(updateClock, 1000);
// updateClock();
// user.transaction.forEach(t => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//         <td>${t.date}</td>
//         <td>${t.description}</td>
//         <td>${t.type}</td>
//         <td>${t.montant}</td>
//     `;

//     transactions.appendChild(tr);
// });
function updateDate() {
    const now = new Date();
    
    // Options to make it look clean: e.g., "29 décembre 2025"
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    
    // Use 'fr-FR' for French or 'en-GB' for English
    date.textContent = now.toLocaleDateString('fr-FR', options); 
}updateDate();