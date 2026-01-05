import {Finduserbyaccount} from "../Model/data.js"

// check dest
function checkUser(numcompte){
   return new Promise((resolve,reject)=>{
     setTimeout(()=>{
        let dest=Finduserbyaccount(numcompte);
        if(dest){
       resolve(dest);
        }else{
            reject("dest not found");
        }
     },1000)
   }
   );
}
// checkSolde
function checkSolde(exp,amount){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
         if(amount<exp.balance){
            resolve("solde suffisant :)");
         }else {
            reject("solde insuffisant :(");
         }
        },100)
    });
}

// update solde
 function updateSolde(exp,dest,amount){
   return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(amount>0){
     exp.balance-=amount;
    dest.balance+=amount;
    resolve("balance updated");
      }else{
     reject("invalid amount!!!");
      }
    },100);
   })
 }

 // addtransactions
 function addtransactions(exp,dest,amount){
return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        let debit= { 
            date: new Date().toLocaleString(),
            description: `transfer to ${dest.nom}`, 
            type: "-",
            montant: amount,
            status: "success" };
        let credit= { 
            date: new Date().toLocaleString(),
            description: `transfer from ${exp.nom}`, 
            type: "+",
            montant: amount,
            status: "success" };
            exp.transaction.push(debit);
            dest.transaction.push(credit);
            sessionStorage.setItem("user",JSON.stringify(exp));
            resolve("transactions successfly added");
            
    },500);
})

 }
 /***************** Transférer avec la then **************/

/*function transferer(exp, numcompte, amount) {
  let destinataire = null;

  return checkUser(numcompte) // p0
    .then(dest => {
      console.log("user found");
      destinataire = dest;
      return checkSolde(exp, amount); // p1
    })
    .then(soldeMessage => {
      console.log(soldeMessage);
      return updateSolde(exp, destinataire, amount); // p2
    })
    .then(updateMessage => {
      console.log(updateMessage);
      return addtransactions(exp, destinataire, amount); // p3
    })
    .then(() => {
      console.log("transfer completed successfully");
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}*/ 

// Transférer avec async/await (la version moderne de l’utilisation des Promises)
 async function  transferer(exp,numcompte,amount){
    let destinataire=null;
    try{
  destinataire=  await checkUser(numcompte) // p0
     // then attached a p0 et creation p1 (undefined)
        console.log("user found");
   const soldemessage= await checkSolde(exp,amount); // p1 (checksolde) la promesse de checksolde 
              // then attached to checksolde promise et creation p2 (undefined)
        console.log(soldemessage);
   const updatemessage= await updateSolde(exp,destinataire,amount); // p2(updatesolde)
   // then attached p2 updatesolde et creation p3 (undefined)
        console.log(updatemessage);
    await addtransactions(exp,destinataire,amount);// p3(addtransactions)
    }catch(error){
      console.log(error);
    };
}

export{transferer}

