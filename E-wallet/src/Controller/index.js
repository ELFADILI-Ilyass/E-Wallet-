const loginbtn=document.getElementById("Loginbtn");
loginbtn.addEventListener("click",callback);

function callback(){
    loginbtn.textContent="Loading..."
    setTimeout(()=>{
        window.location.href="/src/view/login.html";
    },1000)
}