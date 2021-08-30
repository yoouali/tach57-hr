var stagaireForm = [];


function stagaire() {

var nime = document.getElementById("first-name").value;
var nome = document.getElementById("last-name").value;
var birtday = document.getElementById("birthdate").value;
var birtplace = document.getElementById("birtplace").value;
var cin = document.getElementById("cin").value;
var filiere = document.getElementById("filiere").value;
var niveau = document.getElementById("niveau").value;
var etablissementscoliare = document.getElementById("etablissement-scoliare").value;
var stagestart = document.getElementById('periode-du-stage').value;
var stageend = document.getElementById('a').value;
var validpar1 = document.getElementById('valid1').value;
var validpar2 = document.getElementById('valid2').value;

stagaireForm.push(cin);
stagaireForm.push(nime);
stagaireForm.push(nome);
stagaireForm.push(birtday);
stagaireForm.push(birtplace);
stagaireForm.push(filiere);
stagaireForm.push(niveau);
stagaireForm.push(etablissementscoliare);
stagaireForm.push(stagestart);
stagaireForm.push(stageend);
stagaireForm.push(validpar1);
stagaireForm.push(validpar2);
console.log(stagaireForm);
var url = "http://swapi.co/api/";

$.ajax({
  type: "POST",
  url: url,
  data: JSON.stringify(stagaireForm),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  error: function() {
    alert("Error");
  },
  success: function() {
    alert("OK");
  }
});
}

