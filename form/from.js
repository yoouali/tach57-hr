var data = [];

function submitform(){
    // var cin = document.getElementById("cin").value;
    var prenom = document.getElementById("prenom").value;
    var nom = document.getElementById("nom").value;
    // var email = document.getElementById("email").value; 
    // var tel = document.getElementById("tel").value; 
    // var datedenaisance = document.getElementById("datedenaisance").value; 
    // var lieudenaisance = document.getElementById("lieudenaisance").value;
    
    // data.push(cin);
    data.push(prenom);
    data.push(nom);
    // data.push(email);
    // data.push(tel);
    // data.push(datedenaisance);
    // data.push(lieudenaisance);
    console.log(data);
    console.log('000000000000000000000000000000000000000');
    console.log('000000000000000000000000000000000000000');
    console.log('000000000000000000000000000000000000000');

    const url = "https://stagiaire.herokuapp.com/api/stagiaire/store"
    const form = JSON.stringify({Prenom: data[0], Nom: data[1]});
//    xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     var a;
//     if (xhttp.readyState === 4 && xhttp.status === 200) {
//         // Trick for making downloadable link
//         a = document.createElement('a');
//         a.href = window.URL.createObjectURL(xhttp.response);
//         // Give filename you wish to download
//         a.download = "test-file.xls";
//         a.style.display = 'none';
//         document.body.appendChild(a);
//         a.click();
//     }
// };
// // Post data to URL which handles post request
// // xhttp.setRequestHeader("Accept", "application/json");
// // xhttp.setRequestHeader("Content-Type", "application/json");
// // You should set responseType as blob for binary responses
// xhttp.responseType = 'blob';
// xhttp.send(form);
var xhr = new XMLHttpRequest();

xhr.open("POST", url);
// xhr.responseType = "blob";
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
   var a;
   if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.status);
      console.log(xhr.response);
    
   //  var blob = new Blob([xhr.response], {type: "application/pdf;charset=utf-8"});
   //  console.log(blob);

   //    saveAs(blob, "test.pdf")
   const pdf = 'https://stagiaire.herokuapp.com/' + xhr.responseText;
   window.open(pdf);
   }};
   xhr.send(form);
}