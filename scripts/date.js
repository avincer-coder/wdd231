let currenteYear =  document.getElementById("currentyear");
//text content borra y remplaza el contenido en el html
//currenteYear.textContent = "©"
let htmlLastModified = document.getElementById("lastModified")
// console.log(htmlLastModified)

const today = new Date();
// innrHTML agrega a lo que ya tiene el HTML
currenteYear.innerHTML = `<span> ©  ${today.getFullYear()}</span>`;

let lastModified = document.lastModified;
// console.log(lastModified)
htmlLastModified.innerHTML = `<span>Last Modification - ${lastModified}</span>`;
// returns: Tuesday, December 16, 2017 11:09:42