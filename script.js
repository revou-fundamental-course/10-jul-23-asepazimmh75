var age = document.getElementById("age");
var height = document.getElementById("height");
var weight = document.getElementById("weight");
var male = document.getElementById("m");
var female = document.getElementById("f");
var form = document.getElementById("form");
let resultArea = document.querySelector(".comment");
var downloadButton = document.getElementById("downloadButton");


modalContent = document.querySelector(".modal-content");
modalText = document.querySelector("#modalText");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function calculate(){
  if(age.value=='' || height.value=='' || weight.value=='' || (male.checked==false && female.checked==false)){
    modal.style.display = "block";
    modalText.innerHTML = `Semua kolom wajib diisi!`;
  } else {
    var bmi = countBmi();
    resultArea.textContent = `BMI Anda adalah ${bmi.toFixed(2)}`;
    // Tampilkan tombol download jika hasil kalkulator BMI sudah ada
    var downloadButton = document.getElementById("downloadButton");
    downloadButton.style.display = "block";

    // Buat isi file yang akan diunduh (mengandung hasil BMI dan keterangan BMI)
    var keterangan = document.querySelector(".comment").textContent;
    var fileContent = `BMI Anda adalah ${bmi.toFixed(2)}\n${keterangan}`;

    // Simpan isi file ke dalam atribut "data-filecontent" pada tombol download
    downloadButton.setAttribute("data-filecontent", fileContent);
  }
}

// function calculate(){
 
//   if(age.value=='' || height.value=='' || weight.value=='' || (male.checked==false && female.checked==false)){
//     modal.style.display = "block";
//     modalText.innerHTML = `Semua kolom wajib diisi!`;

//   }else{
//     var bmi = countBmi();
//     resultArea.textContent = `BMI Anda adalah ${bmi.toFixed(2)}`;
//     // Tampilkan tombol download jika hasil kalkulator BMI sudah ada
//   var downloadButton = document.getElementById("downloadButton");
//   downloadButton.style.display = "block";
//     // Buat isi file yang akan diunduh
//     var fileContent = `BMI Anda adalah ${bmi.toFixed(2)}`;
//     downloadButton.setAttribute("data-filecontent", fileContent);

//   }

// }

function downloadHasil() {
  var downloadButton = document.getElementById("downloadButton");
  var fileContent = downloadButton.getAttribute("data-filecontent");
  var blob = new Blob([fileContent], { type: "text/plain" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "hasil_bmi.txt";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

// function downloadHasil() {
//   var downloadButton = document.getElementById("downloadButton");
//   var fileContent = downloadButton.getAttribute("data-filecontent");
//   var blob = new Blob([fileContent], { type: "text/plain" });
//   var url = URL.createObjectURL(blob);
//   var a = document.createElement("a");
//   a.href = url;
//   a.download = "hasil_bmi.txt";
//   document.body.appendChild(a);
//   a.click();
//   window.URL.revokeObjectURL(url);
// }


// function resetForm() {
//   var weightInput = document.getElementById("weight");
//   var heightInput = document.getElementById("height");
//   var ageInput = document.getElementById("age");
//   var resultDiv = document.getElementById("result");

//   weightInput.value = "";
//   heightInput.value = "";
//   ageInput. value = "";
//   resultDiv.textContent = "";
// }

function refreshPage() {
  // Fungsi ini akan merefresh halaman dan mengosongkan hasil kalkulator BMI
  window.location.reload();
}


function countBmi(){
  var p = [age.value, height.value, weight.value];
  if(male.checked){
    p.push("male");
  }else if(female.checked){
    p.push("female");
  }

  var bmi = Number(p[2])/(Number(p[1])/100*Number(p[1])/100);
      
  var result = '';
  if(bmi<18.5){
    result = 'Berat Badan Kurang';
     }else if(18.5<=bmi&&bmi<=24.9){
    result = 'Sehat';
     }else if(25<=bmi&&bmi<=29.9){
    result = 'Kelebihan Berat Badan';
     }else if(30<=bmi&&bmi<=34.9){
    result = 'Gemuk';
     }else if(35<=bmi){
    result = 'Sangat Gemuk';
     }

     // Keterangan untuk kategori overweight atau berat badan berlebih
var keterangan = '';
if (result === 'Kelebihan Berat Badan' || result === 'Gemuk' || result === 'Sangat Gemuk') {
    keterangan = 'Cara terbaik untuk menurunkan berat badan adalah dengan mengatur kalori makanan yang dikonsumsi dan berolahraga. Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.';
}else if(result = 'Berat Badan Kurang') {
  keterangan = 'Cara terbaik untuk menaikkan berat badan adalah dengan makan secara teratur dan rajin berolahraga guna membentuk massa otot, akan tetapi jangan berolahraga kardio atau olahraga yang memanggkas lemak. Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menaikkan berat badan hingga batas normal.';
}

// Menampilkan hasil ke dalam elemen HTML dengan id "bmiResult"
var bmiResultElement = document.getElementById("bmiResult");
bmiResultElement.innerHTML = 'BMI Anda: ' + bmi + '<br>Hasil: ' + result + '<br>' + keterangan;

// diagnosa penyakit

var diagnosa = '';
if (result === 'Kelebihan Berat Badan' || result === 'Gemuk' || result === 'Sangat Gemuk'){
  diagnosa = 'Diabetes Hipertensi Osteoarthritis';

  // diagnosa = 'Diabetes Hipertensi Osteoarthritis';
}else if(result = 'Berat Badan Kurang'){
  diagnosa = 'Depresi Kemoterapi Anoreksia Nervosa';
}

var bmiResultElement = document.getElementById("bmidiagnosa");
bmiResultElement.innerHTML = 'Beberapa penyakit yang berasal dari '+ result + '<br>' + diagnosa;

resultArea.style.display = "block";
document.querySelector(".comment_2").innerHTML = `Berat Badan <span id="comment">${result}</span>`;
document.querySelector(".comment").innerHTML = `Anda Memiliki Berat Badan <span id="comment">${result}</span>`;
document.querySelector("#result").innerHTML = bmi.toFixed(2);

}



// penanda kedua di js yagesya

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
