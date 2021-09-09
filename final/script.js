let formData;
const url = "https://stagiaire.herokuapp.com/api/stagiaire/store";
var slectestage = document.getElementById("TypeDeStage");
var conv = document.getElementById("conv-group");
var scholls = document.getElementById("Scholls");
var filniv = document.getElementById("filniv");
var schollsgroupe = document.getElementById("scholls-groupe");
var value = slectestage.value;
    if (value === "libre" || value === ""){
        conv.style.display="none";
        schollsgroupe.style.display="none";
        filniv.style.display="none";
    }
    else {
        conv.style.display="block";
        schollsgroupe.style.display="block";
        if(scholls.value !== "1337" && scholls.value !== "")
            filniv.style.display="flex";
}
var movebutun = document.getElementById('move1');
movebutun.addEventListener("click", function(){

    if (validatemove())
    {
    var side1 = document.getElementById('per');
    var side2 = document.getElementById('det');
    side1.classList.remove("move2in");
    side1.classList.add("moveout");
    side2.classList.remove("move2out");
    side2.classList.add("movein");
    }
})
var backbutton = document.getElementById('move2');
backbutton.addEventListener("click", function(){
    var side1 = document.getElementById('per');
    var side2 = document.getElementById('det');
    side1.classList.remove("moveout")
    side1.classList.add("move2in");
    side1.classList.remove("movein")
    side2.classList.add("move2out");
})

function validatemove() {
    var moveerror = document.getElementById("move-error");
    let x1 = document.forms["myform"]["Prenom"].value;
    let x2 = document.forms["myform"]["Nom"].value;
    let x3 = document.forms["myform"]["CIN"].value;
    let x4 = document.forms["myform"]["TEL"].value;
    let x5 = document.forms["myform"]["Email"].value;
    let x6 = document.forms["myform"]["DateDeNaissance"].value;
    let x7 = document.forms["myform"]["LieuDeNaissance"].value;
    if([x1, x2, x3, x4, x5, x6, x7].includes(""))
    {
        // document.getElementById("Prenom").classList.add("inputerror");
        moveerror.innerText = "please fill all the fields";
        setTimeout(function(){
            moveerror.innerText = "";
        }, 5000)
        return false;
    }
    if (!emailRegex.test(x5))
    {
            moveerror.innerText = "email invalid";
        setTimeout(function(){
            moveerror.innerText = "";
        }, 5000)
        return false;
    }
    return true;
}
let emailRegex = new RegExp(
/^(?!.{150})(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
slectestage.addEventListener("change", function(e){
    var value = e.target.value;
    if (value === "libre" || value === ""){
        conv.style.display="none";
        schollsgroupe.style.display="none";
        filniv.style.display="none";
    }
    else {
        conv.style.display="block";
        schollsgroupe.style.display="block";
        if(scholls.value !== "1337" && scholls.value !== "")
            filniv.style.display="flex";
}
})
scholls.addEventListener("change", function(e){
    var value = e.target.value;
    if (value === "1337" || scholls.value === "scholl")
        filniv.style.display="none";
    else
        filniv.style.display="flex";
})
let formElement = document.querySelector("form");
formElement.addEventListener('keydown', (e) => {
if(e.keyCode === 13){
e.preventDefault();
}
})
function validatsubmit() {
var submiterror = document.getElementById("submit-error");
let x1 = document.forms["myform"]["SujetDeStage"].value;
let x2 = document.forms["myform"]["DateDeDebut"].value;
let x3 = document.forms["myform"]["DateDeFin"].value;
let x4 = document.forms["myform"]["TypeDeStage"].value;
let x5 = document.forms["myform"]["Etablissement"].value;
let x6 = document.forms["myform"]["Filiere"].value;
let x7 = document.forms["myform"]["Niveau"].value;
let x8 = document.forms["myform"]["Convention"].value;
let x9 = document.forms["myform"]["Assurance"].value;
let x10 = document.forms["myform"]["CV"].value;
if([x1, x2, x3, x4, x9, x10].includes("") || (x4 !== "libre" && (x5 === "" || x8 === "")) || (x5 !== "1337" && x5 != "" && (x6 === "" || x7 === "")))
{
    submiterror.innerText = "please fill all the fields";
        setTimeout(function(){
            submiterror.innerText = "";
        }, 5000)
        return false;
}
return true;
}
formElement.addEventListener('submit', (e) => {
e.preventDefault();
if (!validatsubmit())
return ;
formData = new FormData(formElement);
setfichedustage();
})
function setfichedustage(){
var data = [];
document.getElementById("fichedustagaire").style.display = "block";
document.getElementById("box").style.display = "none";
var cin = document.getElementById("CIN").value;
var prenom = document.getElementById("Prenom").value;
var nom = document.getElementById("Nom").value;
var datedenaissance = document.getElementById("DateDeNaissance").value; 
var lieudenaissance = document.getElementById("LieuDeNaissance").value;
var datededebut = document.getElementById("DateDeDebut").value;
var datedefin = document.getElementById("DateDeFin").value;
var sujet = document.getElementById("SujetDeStage").value;
var filiere = document.getElementById("Filiere").value;
var niveau = document.getElementById("Niveau").value;
var scholl = document.getElementById("Scholls").value;
data.push(cin);
data.push(prenom);
data.push(nom);
data.push(datedenaissance);
data.push(lieudenaissance);
data.push(filiere);
data.push(niveau);
data.push(scholl);
data.push(sujet);
data.push(datededebut);
data.push(datedefin);
console.log(data);
sessionStorage.setItem('fuchedustagaire', JSON.stringify(data));
document.getElementById("cin").innerText = cin;
document.getElementById("prenom").innerText = prenom;
document.getElementById("nom").innerText = nom;
document.getElementById("datedenais").innerText = datedenaissance;
document.getElementById("lieudenais").innerText = lieudenaissance;
document.getElementById("periodedustage").innerText = datededebut;
document.getElementById("datedefin").innerText = datedefin;
document.getElementById("sujetdestage").innerText = sujet;
document.getElementById("fil").innerText = filiere;
document.getElementById("niv").innerText = niveau;
document.getElementById("etablissementscoliare").innerText = scholl;
if (scholl === "")
document.getElementById("etablissementscoliare-input").style.display="none";
if (filiere === "")
document.getElementById("fil-input").style.display="none";
if (niveau === "")
document.getElementById("niv-input").style.display="none";
}
var telecharger = document.getElementById("telecharger");
telecharger.addEventListener("click", (e) => {
window.open("./fichedestagaire.html");
for (var [key, value] of formData.entries()) { 
console.log(key, value); }
let request = new XMLHttpRequest();
request.open("POST", url);
request.onreadystatechange = function () {
if(request.readyState === XMLHttpRequest.DONE) {
var status = request.status;
if (status === 0 || (status >= 200 && status < 400)) {
    // The request has been completed successfully
    console.log(request.responseText);
} else {
    // Oh no! There has been an error with the request!
}
}
}
request.send(formData);
})