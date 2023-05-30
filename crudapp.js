var selectedRow=null

function showAlerts(message,className){
    const div = document.createElement("div")
    div.className = `alert alert-${className}`

    div.appendChild(document.createTextNode(message))
    const container = document.querySelector(".container1")
    const main = document.querySelector("#form")
    container.insertBefore(div,main)
    const formWidth = document.querySelector("#form").offsetWidth;
    div.style.width = `${formWidth}px`;
    div.style.marginLeft = `auto`
    div.style.marginRight = `auto`
    
    setTimeout(() => document.querySelector(".alert").remove(),3000)

}

function formatNames(name, surname) {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const formattedSurname = surname.toUpperCase();
    return { formattedName, formattedSurname };
}

function removeDataFromLocalStrage(row) {
    let dataArray = JSON.parse(localStorage.getItem("data")) || [];
    const index = row.rowIndex - 1;
    dataArray.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(dataArray));
}

document.querySelector("#list").addEventListener("click", (e) => {
    var target = e.target
    if (target.classList.contains("delete")) {
        const row = target.parentElement.parentElement
        row.remove()
        showAlerts("Bilgiler Silindi...", "danger")
        removeDataFromLocalStrage(row)
    }
})



function clearFields(){
    document.querySelector("#name").value=""
    document.querySelector("#surname").value=""
    document.querySelector("#city").value=""
    document.querySelector("#tel").value=""
}

//add data
document.querySelector("#form").addEventListener("submit",(e) =>{
    e.preventDefault()
    // get form values
    const name = document.querySelector("#name").value
    const surname = document.querySelector("#surname").value
    const city = document.querySelector("#city").value
    const tel = document.querySelector("#tel").value
    //validate
    if(name == "" || surname=="" || city=="" || tel==""){
        showAlerts("Lütfen Alanları Boşluksuz Doldurun","danger")
    } else {
        const data = {
            name: name,
            surname: surname,
            city: city,
            tel: tel,
        };

        let dataArray = JSON.parse(localStorage.getItem("data")) || [];
        if (selectedRow == null) {
            dataArray.push(data);
            showAlerts("Bilgi Eklendi", "success");
            clearFields()
        } else {
            const selectedIndex = selectedRow.rowIndex - 1;
            dataArray[selectedIndex] = data;
            showAlerts("Bilgiler Güncellendi", "info");
            clearFields();
        }

        populateTable(dataArray);

        // Save data to localStorage
        localStorage.setItem("data", JSON.stringify(dataArray));
        selectedRow = null;
    }
});

document.querySelector("#list").addEventListener("click", (e) => {
    var target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#name").value = selectedRow.children[0].textContent
        document.querySelector("#surname").value = selectedRow.children[1].textContent
        document.querySelector("#city").value = selectedRow.children[2].textContent;
        document.querySelector("#tel").value = selectedRow.children[3].textContent;
    }
});

// Load data from localStorage
document.addEventListener("DOMContentLoaded", () => {
    let dataArray = JSON.parse(localStorage.getItem("data")) || [];
    populateTable(dataArray);
});

function populateTable(dataArray) {
    const lis = document.querySelector("#list");
    lis.innerHTML = "";

    dataArray.forEach((data, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.surname}</td>
            <td>${data.city}</td>
            <td>${data.tel}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm mr-2 text-white edit">DÜZENLE</a>
                <a href="#" class="btn btn-danger btn-sm text-white delete">SİL</a>
            </td> 
        `;
        lis.appendChild(row);
    });
}

