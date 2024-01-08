var siteName = document.getElementById("siteName");
var siteURl = document.getElementById("url");
var searchItems = document.getElementById("Search");
var sites = [];
if (localStorage.getItem("sites") != null) {
  sites = JSON.parse(localStorage.getItem("sites"));
  displaySite();
}

function addSite() {
  if (isValidName(siteName.value) && isValidUrl(siteURl.value)) {
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

function clearForm() {
  siteName.value = "";
  siteURl.value = "";
}

function closeWindow() {
  exampleModal.classList.remove("show", "d-block");
}

function searchItem() {
  var item = "";
  var term = searchItems.value;
  for (var i = 0; i < sites.length; i++) {
    if (sites[i].name.toLowerCase().includes(term.toLowerCase())) {
      item += `
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
  </tr>`;
    }
    document.getElementById("tableBody").innerHTML = item;
  }
}

/*  -------------        validation        ----------------   */
function isValidUrl() {
  var urlRegex = /^(https?|ftp):\/\/([^\s/$.?#].[^\s]*)$/;
  if (urlRegex.test(siteURl.value)) {
    siteURl.classList.add("is-valid");
    siteURl.classList.remove("is-invalid");
    return true;
  } else {
    siteURl.classList.add("is-invalid");
    siteURl.classList.remove("is-valid");
  }
}

function isValidName() {
  var regexName = /^[a-z]{3,8}$/i;
  if (regexName.test(siteName.value)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
  }
}
