const row = document.querySelector(".row.main")
const name = document.querySelector("#name")
const description = document.querySelector("#description")
const brand = document.querySelector("#brand")
const imageUrl = document.querySelector("#imageURL")
const price = document.querySelector("#price")

async function getData() {
    const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFlZWVhYWM3Mjg4NzAwMTg4N2ZlZTUiLCJpYXQiOjE2OTY1MjU5OTQsImV4cCI6MTY5NzczNTU5NH0.FSY44IPHuzuM4bbnohDG3FNrljb5NRm0_36qYmiGvBc"
        }
    })
    const data = await response.json()

    return data
}

async function createProduct(event) {

    event.preventDefault()

    const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFlZWVhYWM3Mjg4NzAwMTg4N2ZlZTUiLCJpYXQiOjE2OTY1MjU5OTQsImV4cCI6MTY5NzczNTU5NH0.FSY44IPHuzuM4bbnohDG3FNrljb5NRm0_36qYmiGvBc"
        },
        body: JSON.stringify({
            name: name.value,
            description: description.value,
            brand: brand.value,
            imageUrl: imageURL.value,
            price: price.value,
        }),

    });

    if (response.ok) { // response.ok == true se status è 2xx, altrimenti falso, se 4xx o 5xx
        const data = await getData()
        displayProduct(data)

        for (const field of [name, description, price, brand, imageUrl]) {
            field.value = ''
        }
    } else {
        console.error("Cannot send")
    }
}

async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete")) {
        return
    }

    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFlZWVhYWM3Mjg4NzAwMTg4N2ZlZTUiLCJpYXQiOjE2OTY1MjU5OTQsImV4cCI6MTY5NzczNTU5NH0.FSY44IPHuzuM4bbnohDG3FNrljb5NRm0_36qYmiGvBc"
        }
    })

    if (response.ok) {
        alert("ITEM: " + id + " DELETED SUCCESFULLY!")
        const data = await getData()
        displayProduct(data)
    } else {
        console.log("error");
    }
}

async function displayProduct(data) {
    row.innerHTML = data.map(({ name, description, brand, price, imageUrl, _id }) => /*html*/`
    <div class="col-3">
            <div class="card h-100">
               <img class="card-img-top" src="${imageUrl}">
               <div class="card-body d-flex flex-column justify-content-between">
                    <div class="card-text">
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${brand}</h6>
                        <p class="card-text">${description}</p>
                    </div>
                    <div class="d-flex justify-content-between pt-4">
                        <a href="#" class="btn btn-primary">$ ${price} Buy</a>
                        <button class="btn btn-danger" onclick="deleteProduct('${_id}')"><i class="bi bi-x-lg"></i></button>
                    </div>
                </div>
            </div>
         </div>
         `).join('')
}


window.onload = async function () {
    try {
        const data = await getData()
        displayProduct(data)

    } catch (error) {
        console.log("Error: " + error);
    }
}