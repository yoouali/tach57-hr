var data1 = sessionStorage.getItem('fuchedustagaire');
var data = JSON.parse(data1);
sessionStorage.clear();
document.getElementById("cin").innerText = data[0];
document.getElementById("prenom").innerText = data[1];
document.getElementById("nom").innerText = data[2];
document.getElementById("datedenais").innerText = data[3];
document.getElementById("lieudenais").innerText = data[4];
document.getElementById("filiere").innerText = data[5];
document.getElementById("niveau").innerText = data[6];
document.getElementById("etablissementscoliare").innerText = data[7];
document.getElementById("sujetdestage").innerText = data[8];
document.getElementById("datedestage1").innerText = data[9];
document.getElementById("datedestage2").innerText = data[10];
if (data[5] === ""){
     document.getElementById("filiere-input").style.display="none";
     document.getElementById("tail").style.top="160px";
}
if (data[6] === ""){
     document.getElementById("niveau-input").style.display="none";
     document.getElementById("tail").style.top="160px";
}
if (data[7] === ""){
     document.getElementById("etablissementscoliare-input").style.display="none";
     document.getElementById("tail").style.top="280px";
}
const element = document.getElementById('contnet');
html2pdf().from(element).save();
setTimeout(function(){
    window.close()
},1500)