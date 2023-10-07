window.onload = async function () {

    try {
        const data = await getData()
        displayProduct(data)

    } catch (error) {
        console.log("Error: " + error);
    }
}