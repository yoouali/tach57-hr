let formData;
var entrepreneur = document.getElementById("EntrepreneurForm");
var loading = document.getElementById("loading")
const url = "https://stagiaire.herokuapp.com/api/auto-entrepreneur/store";
let formElement = document.querySelector("form");
formElement.addEventListener('keydown', (e) => {if(e.keyCode === 13){e.preventDefault();}})
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    formData = new FormData(formElement);
    for (var [key, value] of formData.entries()) { console.log(key, value); }
    // entrepreneur.style.display="none";
    entrepreneur.classList.add("moveout");
    // loading.style.display="block";
    loading.classList.add("movein");
    var loadingCheck = document.getElementById("loadingCheck");
    var loadingIcon = document.getElementById("loadingIcon");
    let request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function () {
    if(request.readyState === XMLHttpRequest.DONE) {
    var status = request.status;
    if (status === 0 || (status >= 200 && status < 400)) {
    // The request has been completed successfully
        console.log(request.responseText);
        if (request.responseText === "true"){loadingCheck.classList.add("check-animation");loadingIcon.style.display="block";}
        else loadingCheck.classList.add("error-animation");
    }
    else {
    // Oh no! There has been an error with the request!
        loadingCheck.classList.add("error-animation");
    }
    }
    }
    request.send(formData);
})