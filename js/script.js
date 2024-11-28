//utilisable depuis toutes les pages.
//gestion des cookies

const tokenCookieName = "accesstoken";
const signoutBtn = document.getElementById("signout-btn");
const RoleCookieName = "role";
const apiURL= "http://127.0.0.1:8000/api/";
signoutBtn.addEventListener("click", signout);


function getRole(){
    return getCookie(RoleCookieName);
}

function signout(){
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName);
    window.location.reload();
}

function setToken(token){
    setCookie(tokenCookieName, token, 7);
}

function getToken(){
    return getCookie(tokenCookieName);
}

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    console.log("document.cookie : " + document.cookie)
    let ca = document.cookie.split(';');
    for(const element of ca) {
        let c = element;
        while (c.startsWith==' ') c = c.substring(1,c.length);
        //avant correction par sonarlint: if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function isConnected(){
    //console.log("getToken: " + getToken());
    return !(getToken() == null || getToken == undefined);
}

/*
Autre écriture de la même fonction ci-dessus
function isConnected(){
    console.log("getToken: " + getToken());
    if(getToken() == null || getToken == undefined){
        return false;
    }
    else{
        return true;
    }
}
*/


function showAndHideElementsForRoles(){
    const userConnected = isConnected();
    const role = getRole();

    //gestion des éléments de la page
    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element =>{
        switch(element.dataset.show){

            case 'disconnected':
                if(userConnected){
                    element.classList.add("d-none");
                }
                break;

            case 'connected':
                if (!userConnected){
                    element.classList.add("d-none");
                }
                break;

            case 'admin':
                if (!userConnected || role!="admin"){
                    element.classList.add("d-none");
                }
                break;

            case 'client':
                if (!userConnected || role!="client"){
                    element.classList.add("d-none");
                }
                break;
        }
    })
}

function sanitizeHtml(text){
    const tempHtml = document.createElement(`div`);
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}

function getInfoUser(){
    console.log("Récupération des informations de l'utilisateur");

    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

    fetch(apiURL+"account/me", requestOptions)
    .then((response) => {
        if(response.ok){
            return response.json();
        }else{
            console.log("impossible de récupérer les informations utilisateur");
        }
    })
    .then(result=>{
        return result;
        //console.log(result);
    })
    .catch((error) => console.error('error à la récupération des données utilisateur: ', error));
}