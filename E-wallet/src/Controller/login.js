import { FindUser } from "../Model/data.js";

const inputmail=document.getElementById("mail");
const inputpassword=document.getElementById("password");
const message=document.getElementById("result");
const submitbtn=document.getElementById("submitbtn");
submitbtn.addEventListener("click",submit);

let user=null;
function submit(){
    message.textContent="Verification.....";
    let email=inputmail.value;
    let pass=inputpassword.value;
    if(!email || !pass){
        setTimeout(()=>{
        message.textContent = "Email ou mot de passe incorrect ";
        message.style.color = "red";
        },1000);
       
    }
    else{
        user=FindUser(email,pass);
         if (!user) {
            setTimeout(()=>{
            message.textContent = "Email ou mot de passe incorrect ";
            message.style.color = "red";
            },1000);

         }
          else {
             sessionStorage.setItem("user", JSON.stringify(user));
             
             setTimeout(()=>{
             message.textContent = "Succes";
             message.style.color = "green";
            
            window.location.href = "/src/view/dashboard.html";
        
            },1000)
        
    }

}
    } 
   
