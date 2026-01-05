import { transferer } from "../Service/transferservice.js";

const numcomptInput = document.querySelector("#numCompte");
const amountInput = document.querySelector("#amount");
const validerbtn = document.querySelector("#valider");

validerbtn.addEventListener("click", handlevalider);
let exp = JSON.parse(sessionStorage.getItem("user"));
console.log(exp);

function handlevalider() {
    let numcompte = numcomptInput.value;
    let amount = amountInput.value;

    if (amount <= 0 || numcompte === "" || exp.numCompte == numcompte) {
        alert("invalide data");
        return;
    }

    // Calling the function using .then() and .catch() instead of await
    transferer(exp, numcompte, amount)
        .then((message) => {
            // This runs if resolve() is called
            window.location.href = "../view/dashboard.html";
            console.log("transfer succesfly added"+message);
        })
        .catch((error) => {
            // This runs if reject() is called
            console.log(error);
        });
}


// // importer la fonction transferer
// import{transferer} from "../Service/transferservice.js"

// const numcomptInput=document.querySelector("#numCompte");
// const amountInput=document.querySelector("#amount");
// const validerbtn=document.querySelector("#valider");

//  validerbtn.addEventListener("click",handlevalider);
//   let exp=JSON.parse(sessionStorage.getItem("user"));
//   console.log(exp);
//  async function handlevalider(){
//     let numcompte=numcomptInput.value;
//     let amount=amountInput.value;
//     if(amount<=0 || numcompte===""||exp.numCompte==numcompte ){
//         alert("invalide data");
//         return;
//     }
// // appel à la fonction  qui fait le transfert
//     try{
//       const message =await transferer(exp,numcompte,amount);
//       window.location.href="../view/dashboard.html";
//       console.log("transfer succesfly added");
//     }catch(error){
//       console.log(error);
//     }
//  }

