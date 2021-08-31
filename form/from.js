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

    url = "https://stagiaire.herokuapp.com/api/stagiaire/store"
    const form = JSON.stringify({Prenom: data[0], Nom: data[1]});
    var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
        
      window.open(xhr.responseurl);
        var doc = new jsPDF()
        doc.text(xhr.responseText, 200, 200)
        doc.save('test.pdf')
   }};
   xhr.send(form);

}