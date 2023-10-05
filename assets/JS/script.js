async function getData() {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFlZWVhYWM3Mjg4NzAwMTg4N2ZlZTUiLCJpYXQiOjE2OTY1MjU5OTQsImV4cCI6MTY5NzczNTU5NH0.FSY44IPHuzuM4bbnohDG3FNrljb5NRm0_36qYmiGvBc"
        }
    })
    const data = await response.json()

    console.log(data);
}

getData()