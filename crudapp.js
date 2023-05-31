var selectedRow = null

// Alert box
function showAlerts(message, className) {
    const div = document.createElement("div")
    div.className = `alert alert-${className}`

    div.appendChild(document.createTextNode(message)) 
    const container = document.querySelector(".container") 
    const main = document.querySelector(".form") 
    container.insertBefore(div, main) 
    const formWidth = document.querySelector(".form").offsetWidth 
    div.style.width = `${formWidth}px` 
    div.style.marginLeft = `auto` 
    div.style.marginRight = `auto` 
    div.style.textAlign = "left";

    // Time for the box
    setTimeout(() => document.querySelector(".alert").remove(), 3000) 
}

// Form clearing
function clearFields() {
    document.querySelector(".form--name").value = "" 
    document.querySelector(".form--surname").value = "" 
    document.querySelector(".form--city").value = "" 
    document.querySelector(".form--tel").value = "" 
}

// Load data from localStorage
document.addEventListener("DOMContentLoaded", () => {
    let dataArray = JSON.parse(localStorage.getItem("data")) || [] 
    populateTable(dataArray) 
}) 

// Delete data from localStorage
function removeDataFromLocalStorage(row) {
    let dataArray = JSON.parse(localStorage.getItem("data")) || [] 
    const index = row.rowIndex - 1 
    dataArray.splice(index, 1) 
    localStorage.setItem("data", JSON.stringify(dataArray)) 
}

// Delete data
document.querySelector(".list").addEventListener("click", (e) => {
    var target = e.target 
    if (target.classList.contains("delete")) {
        const row = target.parentElement.parentElement 
        row.remove() 
        showAlerts("Bilgiler Silindi...", "danger") 
        removeDataFromLocalStorage(row) 
    }
}) 

// Add data
document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault() 
    // Get form values
    const name = document.querySelector(".form--name").value 
    const surname = document.querySelector(".form--surname").value 
    const city = document.querySelector(".form--city").value 
    const tel = document.querySelector(".form--tel").value 
    // Validate
    if (name == "" || surname == "" || city == "" || tel == "") {
        showAlerts("Lütfen Alanları Boşluksuz Doldurun", "danger") 
    } else {
        const data = {
            name: name,
            surname: surname,
            city: city,
            tel: tel,
        } 

        let dataArray = JSON.parse(localStorage.getItem("data")) || [] 
        if (selectedRow == null) {
            dataArray.push(data) 
            showAlerts("Bilgi Eklendi", "success") 
            clearFields() 
        } else {
            const selectedIndex = selectedRow.rowIndex - 1 
            dataArray[selectedIndex] = data 
            showAlerts("Bilgiler Güncellendi", "success") 
            clearFields() 
        }

        populateTable(dataArray) 

        // Save data to localStorage
        localStorage.setItem("data", JSON.stringify(dataArray)) 
        selectedRow = null 
    }
}) 

// Edit row
document.querySelector(".list").addEventListener("click", (e) => {
    var target = e.target 
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement 
        document.querySelector(".form--name").value = selectedRow.children[0].textContent 
        document.querySelector(".form--surname").value = selectedRow.children[1].textContent 
        document.querySelector(".form--city").value = selectedRow.children[2].textContent 
        document.querySelector(".form--tel").value = selectedRow.children[3].textContent 
    }
}) 

// Populates the table
function populateTable(dataArray) {
    const list = document.querySelector(".list") 
    list.innerHTML = "" 

    dataArray.forEach((data, index) => {
        const row = document.createElement("tr") 

        row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.surname}</td>
      <td>${data.city}</td>
      <td>${data.tel}</td>
      <td>
        <a href="#" class="edit">DÜZENLE</a>
        <a href="#" class="delete">SİL</a>
      </td>
    ` 

        list.appendChild(row) 
    }) 
}
