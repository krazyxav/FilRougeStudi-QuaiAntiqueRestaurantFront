const mailInput=document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(){
    //appeler API pour vérifier crédentials
    //données factices pour test

    if (mailInput.value=="test@mail.com" && passwordInput.value=="123"){
        alert("Vous êtes connecté");

        const token = "emklbjbmerljmlrglmzeglmzghzlmg";
        setToken(token);


        window.location.replace("/");
    }else{
        mailInput.classList.add("is-invalid");
        mailInput.classList.remove("is-valid");
    }
}