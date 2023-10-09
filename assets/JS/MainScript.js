const name = document.querySelector("#name")
const description = document.querySelector("#description")
const brand = document.querySelector("#brand")
const imageUrl = document.querySelector("#imageURL")
const price = document.querySelector("#price")
const URL = "https://striveschool-api.herokuapp.com/api/product/"

async function getData() {
    const response = await fetch(URL, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFlZWVhYWM3Mjg4NzAwMTg4N2ZlZTUiLCJpYXQiOjE2OTY1MjU5OTQsImV4cCI6MTY5NzczNTU5NH0.FSY44IPHuzuM4bbnohDG3FNrljb5NRm0_36qYmiGvBc"
        }
    })
    const data = await response.json()

    return data
}

async function createProduct(event) {

    event.preventDefault()

    event.target.querySelector("#loading-bar-box").innerHTML = `
    <div class="col-12 mt-4 d-flex justify-content-center align-items-center">
        <div class="race-by"></div>
    </div>
`

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFlZWVhYWM3Mjg4NzAwMTg4N2ZlZTUiLCJpYXQiOjE2OTY1MjU5OTQsImV4cCI6MTY5NzczNTU5NH0.FSY44IPHuzuM4bbnohDG3FNrljb5NRm0_36qYmiGvBc"
        },
        body: JSON.stringify({
            name: name.value,
            description: description.value,
            brand: brand.value,
            imageUrl: imageUrl.value,
            price: price.value,
        }),

    });

    if (response.ok) { // response.ok == true se status è 2xx, altrimenti falso, se 4xx o 5xx
        event.target.querySelector("#loading-bar-box").innerHTML = `
            <button class="btn btn-primary w-100 mb-3">CREA</button>
            <label class="w-100 text-success text-center">Added Succesfully</label>
        `
        for (const field of [name, description, price, brand, imageUrl]) {
            field.value = ''
        }
    } else {
        console.error("Cannot send")
    }
}

async function displayProduct(data) {
    const row = document.querySelector(".row.products")

    row.innerHTML = data.map(({ name, description, brand, price, imageUrl, _id }) => /*html*/`
    <div class="col-12 col-md-6 col-lg-4 col-xl-3" id="_${_id}">
            <div class="card p-3 h-100 border-0">
                <a href="Prodotto.html?id=${_id}">
                    <img class="card-img-top rounded shadow" src="${imageUrl}">
                </a>
               <div class="card-body p-0 mt-4 d-flex flex-column justify-content-between">
                    <a href="Prodotto.html?id=${_id}">
                        <h5 class="card-title TextCut Title">${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted pb-2">${brand}</h6>
                        <p class="card-text text-muted TextCut">${description}</p>
                        <p class="card-text text-muted">${formatCurrency(price)}</p>
                    </a>
                    <div class="d-flex">
                        <button class="btn mt-4 me-2" onclick="deleteProduct('${_id}')"><i class="bi bi-trash"></i></button>
                        <button class="btn mt-4" onclick="handleEdit('${_id}')"><i class="bi bi-pencil-square"></i></button>
                    </div>
                </div>
            </div>
    </div>
    `).join('')
}

async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete")) {
        return
    }

    document.querySelector(`#_${id}`).innerHTML = `
    <div class="col-12 col-md-6 col-lg-4 col-xl-3">
        <div class="card p-3 h-100 border-0 bg-transparent">
            <svg
                class="ring"
                viewBox="25 25 50 50"
                stroke-width="5"
            >
                <circle cx="50" cy="50" r="20" />
            </svg>
        </div>
    </div>
    `

    const response = await fetch(URL + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFlZWVhYWM3Mjg4NzAwMTg4N2ZlZTUiLCJpYXQiOjE2OTY1MjU5OTQsImV4cCI6MTY5NzczNTU5NH0.FSY44IPHuzuM4bbnohDG3FNrljb5NRm0_36qYmiGvBc"
        }
    })

    if (response.ok) {
        const data = await getData()
        displayProduct(data)
    } else {
        console.log("error");
    }
}

async function handleEdit(id) {
    const agendaEvent = await fetch(URL + id, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFlZWVhYWM3Mjg4NzAwMTg4N2ZlZTUiLCJpYXQiOjE2OTY1MjU5OTQsImV4cCI6MTY5NzczNTU5NH0.FSY44IPHuzuM4bbnohDG3FNrljb5NRm0_36qYmiGvBc"
        }
    })
    const agendaEventJson = await agendaEvent.json()

    const { name, description, price, brand, imageUrl } = agendaEventJson

    const agendaEventRow = document.querySelector(`#_${id}`)

    agendaEventRow.innerHTML = /*html*/`
        <form onsubmit="handleEditSubmit(event, '${id}')">
                <h3 class="mb-4">Modifica Prodotto</h3>
                <div class="row g-4">
                        <div class="col-12">
                            <input class="mb-3 form-control" value="${name}" type="text" id="name" attribute="name">
                        </div>
                        <div class="col-12">
                            <input class="mb-3 form-control" value="${description}" type="text" id="description" attribute="description">
                        </div>
                        <div class="col-12">
                            <input class="mb-3 form-control" value="${brand}" type="text" id="brand" attribute="brand">
                        </div>
                        <div class="col-12">
                            <input class="mb-3 form-control" value="${imageUrl}" type="text" id="imageURL" attribute="ImageUrl">
                        </div>
                        <div class="col-12">
                            <input class="mb-3 form-control" value="${price}" type="number" step="any" id="price" attribute="price">
                        </div>
                        <div class="col-12">
                        <div class="row" id="spinner">
                            <div class="col-6">
                                <button class="btn btn-primary border-0 w-100 rounded py-2" style="background-color: var(--color-grey4); color: var(--color-black);" type="submit">
                                    <i class="bi bi-check-circle text-success"> Annulla</i>
                                </button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-primary border-0 w-100 rounded py-2" style="background-color: var(--color-grey4); color: var(--color-black);" onclick="handleEditCancel()">
                                    <i class="bi bi-x-circle text-danger"> Conferma</i>
                                </button>
                            </div>
                        </div>
                        </div>
                </div>
            </form>
    `
}

async function handleEditSubmit(e, id) {
    e.preventDefault();

    e.target.classList.add("pe-none")

    e.target.querySelector("#spinner").innerHTML = /*html*/ `
            <div class="col-12 d-flex justify-content-center align-items-center">
                <div class="race-by"></div>
            </div>
    `


    // console.log("ok")
    const name = document.querySelector(`#_${id} [attribute='name']`);
    const description = document.querySelector(`#_${id} [attribute='description']`);
    const brand = document.querySelector(`#_${id} [attribute='brand']`);
    const ImageUrl = document.querySelector(`#_${id} [attribute='ImageUrl']`);
    const price = document.querySelector(`#_${id} [attribute='price']`);

    const updatedEvent = {
        name: name.value,
        description: description.value,
        brand: brand.value,
        imageUrl: ImageUrl.value,
        price: price.value,
    }

    try {

        const response = await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFlZWVhYWM3Mjg4NzAwMTg4N2ZlZTUiLCJpYXQiOjE2OTY1MjU5OTQsImV4cCI6MTY5NzczNTU5NH0.FSY44IPHuzuM4bbnohDG3FNrljb5NRm0_36qYmiGvBc"
            },
            body: JSON.stringify(updatedEvent)
        })

        if (response.ok) {
            displayProduct(await getData())
        } else {
            alert("Something went wrong, cannot update. Check network tab.")
        }

    } catch {
        alert("You are offline.")
    }

}

async function handleEditCancel() {
    displayProduct(await getData())
}

function formatCurrency(num) {
    if (isNaN(num)) {
        return "Numero non valido";
    }

    // Converte il numero in stringa e aggiunge la virgola come separatore dei decimali
    const formattedNum = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return `$ ${formattedNum}`;
}