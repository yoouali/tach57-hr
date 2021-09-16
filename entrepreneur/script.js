//send request
let formData;
const url = "https://stagiaire.herokuapp.com/api/auto-entrepreneur/store";
let formElement = document.querySelector("form");

formElement.addEventListener('keydown', (e) => {if(e.keyCode === 13){e.preventDefault();}})
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!checkForm())
        return;
    moveInAnimation();
    formData = new FormData(formElement);
    for (var [key, value] of formData.entries()) {console.log(key, value);}
    let request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Accept", "application/json");
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            var status = request.status;
            checkAniamtion(request.responseText);
            if (status === 0 || (status >= 200 && status < 400)) {
                // The request has been completed successfully
                console.log(request.responseText);
            }
            else {
                console.log(request.responseText);
                // Oh no! There has been an error with the request!
            }
        }
    }
    request.send(formData);
})
//end request send


//check Form
var formError = document.getElementById("FormError");
var prenom = document.getElementById("Prenom");
var nom = document.getElementById("Nom");
var cin = document.getElementById("CIN");
var tel = document.getElementById("TEL");
var email = document.getElementById("Email");
var dateNaissance = document.getElementById("DateDeNaissance");
var lieuNaissance = document.getElementById("LieuDeNaissance");
var identifiant = document.getElementById("Identifiant");
var dateAdhesion = document.getElementById("DateDadhesion");
var valableJusquau = document.getElementById("ValableJusquau");

function checkForm(){
    if (prenom.value == ""){setClassError(prenom, "Prenom");return false;}
    return true;
}

// setclassError
function setClassError(e, filed){
    formError.innerText = "Ples file " + filed + " filed";
    setTimeout(function(){formError.innerText = "";}, 3000)
}

// end check Form

//aniamtion
var entrepreneur = document.getElementById("EntrepreneurForm");
var loading = document.getElementById("loading");
var loadingCheck = document.getElementById("loadingCheck");
var loadingIcon = document.getElementById("loadingIcon");
var resultMessage = document.getElementById("ResultMessage");

//slide divs
function moveInAnimation(){
    entrepreneur.classList.remove("movein2");
    entrepreneur.classList.add("moveout");
    loading.classList.remove("moveout2");
    loading.classList.add("movein");
}
function moveOutAnimation(){
    entrepreneur.classList.remove("moveout");
    entrepreneur.classList.add("movein2");
    loading.classList.remove("movein");
    loading.classList.add("moveout2");
}

//reauest check
function checkAniamtion(e){
    console.log("the respone text :");
    console.log(e);
    if (e === "true"){
        loadingCheck.classList.add("check-animation");
        setTimeout(function() {loadingIcon.classList.add("check-icon");}, 800);
        setTimeout(function() {resultMessage.style.display="block";loading.style.display="none"}, 1600);
    }
    else{
        loadingCheck.classList.add("error-animation");
        setTimeout(function() {loadingCheck.classList.remove("error-animation");}, 800);
        setTimeout(function() {moveOutAnimation();;}, 800);
    }
}
//end aniamtion