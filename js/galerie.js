const galerieImage = document.getElementById('allImages');

let titre="titre";
let imgSource = "../images/saumon.jpg";


//récupérer les informations des images en base de données (titre et url)
//requete ajax

//boucle de 1 à  6
let monImage = getImage(titre, imgSource);
galerieImage.innerHTML = monImage;

//fin de boucle


function getImage(titre, urlImage){
    titre = sanitizeHtml(titre);
    urlImage = sanitizeHtml(urlImage);
    return `    <div class="col p-3">
            <div class="image-card text-white">
                <img src="${urlImage}" class="rounded w-100"/>
                <p class="titre-image">${titre}</p>
                <div class="action-image-buttons" data-show="admin">
                    <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditionPhotoModal"><i class="bi bi-pencil-square"></i></button>
                    <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#SuppressionPhotoModal"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        </div>
    `;
}