




let users = [
   {
    numCompte:"2004",
    balance: 30000,
    email: "ilyass@gmail.com" , 
    password: "2004",
    nom: "Ilyass",
    transaction:[
        {date: "2025-10-23",description: "Salaire",type: "+",montant: 19000,status: "success"},
        { date: "2025-11-05",description: "tv",type: "-",montant: 5000, status: "success"}
    ],
    comptes: [
        { type: "Visa", solde: 20000, icon: "💳" },
        { type: "PayPal", solde: 5000, icon: "🅿️" },
        { type: "Crypto", solde: 5000, icon: "₿" }
    ]

   },
   {
    numCompte:"1111",
    balance: 12650.00,
    email: "Ahmed@gmail.com",
    password: "test",
    nom: "Ahmed",
    transaction: [
      {  date: "2025-10-23",description: "Achat en ligne",type: "+",  montant: 120, status: "success" },
      {  date: "2025-11-05",description: "À : Ali",type: "-",  montant: 2000, status: "failed" },
      {  date: "2025-11-05",description: "Restaurant",type: "-" , montant: 80, status: "success" }
    ],
    comptes: [
        { type: "PayPal", solde: 12650, icon: "🅿️" }
    ]
   },
   {
    numCompte:"0000",
    balance: 10000.00,
    email: "Ali@gmail.com",
    password: "ali",
    nom: "Ali",
    transaction: [
      {  date: "2025-10-23",description: "Achat en ligne",type: "-",  montant: 1120, status: "success" },
      {  date: "2025-12-05",description: "From : Ahmed",type: "+",  montant: 2000, status: "success" },
      {  date: "2025-12-05",description: "Chair",type: "-" , montant: 2000, status: "success" }
    ],
     comptes: [
        { type: "Visa", solde: 4000, icon: "💳" },
        { type: "PayPal", solde: 1000, icon: "🅿️" },
        { type: "Crypto", solde: 1000, icon: "₿" },
        { type: "MasterCard", solde: 4000, icon: "💳" }
    ]
   },

]
function FindUser(email,password){
     let user = null;
     user = users.find((u)=>u.email === email && u.password === password);
     return user ;
 }

 function FindTransaction(user,sign){
     let trans=null;
     trans=user.transaction.filter((u)=>u.type==sign);
     console.log(trans);
    return trans;
 }

 function Finduserbyaccount(numCompte){
   return users.find((u)=>u.numCompte===numCompte);
}


export{FindUser,FindTransaction,Finduserbyaccount};
