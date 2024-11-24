//vérifier un champ requis

const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputEmail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidatePassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");

//pur le champ inputNom, on écoute (keyup) quand une touche est relachée,
// et on interprète avec la fonction validateForm
inputNom.addEventListener("keyup", validateForm);
inputPrenom.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidatePassword.addEventListener("keyup", validateForm);

function validateForm() {
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPrenom);
    const mailOk = validateMail(inputEmail);
    const passwordOk = validatePassword(inputPassword);
    const validatePasswordOk = validatePasswordEquality(inputValidatePassword.value, inputPassword.value, inputValidatePassword);

    if (nomOk && prenomOk && mailOk && passwordOk && validatePasswordOk) {
        btnValidation.disabled = false;
    }else{
        btnValidation.disabled = true;
    }
}

function validatePasswordEquality(password1, password2, input){
    if (password1==password2){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }else{
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}

function validatePassword(input){
    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateMail(input) {
    //Définir le regex expression régulière
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
       //c'est ok
       input.classList.add("is-valid");
       input.classList.remove("is-invalid");
       return true;
   }else{
       //c'est pas ok
       input.classList.add("is-invalid");
       input.classList.remove("is-valid");
       return false;
   }
}

function validateRequired(input){
    if(input.value != ''){
        //c'est ok
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;

    }else{
        //c'est pas ok
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}

