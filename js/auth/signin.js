const mailInput=document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(){
    //appeler API pour vérifier crédentials
    //données factices pour test
    let dataForm= new FormData(signinForm);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "username": sanitizeHtml(dataForm.get("email")),
    "password": sanitizeHtml(dataForm.get("mdp"))
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch(apiURL+"login", requestOptions)
    .then((response) => {
        if(response.ok){
            return response.json();
        }else{
            EmailInput.classList.add("is-invalid");
            PasswordInput.classList.remove("is-invalid");
        }
  
    })
    .then((result) => {
        const token = result.apiToken;
        setToken(token);

        setCookie(RoleCookieName, result.roles[0], 7);
        window.location.replace("/");
    })
    .catch((error) => console.error('error', error));


}