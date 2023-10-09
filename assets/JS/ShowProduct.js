const params = new URLSearchParams(location.search);
const id = params.get('id');

const IdTitle = document.querySelector('#title');
const IdPrice = document.querySelector('#price');
const IdCover = document.querySelector('#cover');
const IdDate = document.querySelector('#date');
const IdDescription = document.querySelector('#description');

async function getProductData() {
    const respone = await fetch(URL + id, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFlZWVhYWM3Mjg4NzAwMTg4N2ZlZTUiLCJpYXQiOjE2OTY1MjU5OTQsImV4cCI6MTY5NzczNTU5NH0.FSY44IPHuzuM4bbnohDG3FNrljb5NRm0_36qYmiGvBc"
        }
    })
    const data = await respone.json()

    return data
}

async function displaySpecified(data) {

    const {name, description, price, imageUrl, createdAt} = data

    IdCover.src = imageUrl
    IdDate.innerHTML = '<i class="bi bi-calendar me-2"></i>' + createdAt.slice(0,10)
    IdTitle.innerHTML = name
    IdPrice.innerHTML = formatCurrency(price)
    IdDescription.innerHTML = description
}

window.onload = async () => {

    try {
        const data = await getProductData()
        displaySpecified(data)

        const products = await getData()
        displayProduct(products)

    } catch (error) {
        console.log("Error: " + error);
    }

}