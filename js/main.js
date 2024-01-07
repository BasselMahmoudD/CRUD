var siteName = document.getElementById("siteName");
var siteURl = document.getElementById("url");

var sites = [];
if (localStorage.getItem("sites") != null) {
  sites = JSON.parse(localStorage.getItem("sites"));
  displaySite();
}

function addSite() {
  if (siteName.value.length > 3 && isValidUrl(siteURl.value)) {
    var site = {
      name: siteName.value,
      url: siteURl.value,
    };
    sites.push(site);
    localStorage.setItem("sites", JSON.stringify(sites));
    displaySite();
    clearForm();
  } else {
    displaySite();
    exampleModal.classList.add("show", "d-block");
  }
}

function clearForm() {
  siteName.value = "";
  siteURl.value = "";
}

function closeWindow() {
  exampleModal.classList.remove("show", "d-block");
}

function isValidUrl() {
  var urlRegex = /^(https?|ftp):\/\/([^\s/$.?#].[^\s]*)$/;
  if (urlRegex.test(siteURl.value)) {
   
    return true;
  }
}

function displaySite() {
  var content = "";
  for (var i = 0; i < sites.length; i++) {
    content += `
        <tr>
            <td>${i + 1}</td>
            <td>${sites[i].name}</td>


            <td>
            <a href="${sites[i].url}">
            <button class="btn btn-warning">
            <i class="fa-solid fa-eye pe-2"></i>
            Visit
            </button>
            </a>
            </td>


            <td><button onclick= "deleteSite(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
            Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tableBody").innerHTML = content;
}

function deleteSite(index) {
  sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  displaySite();
}
