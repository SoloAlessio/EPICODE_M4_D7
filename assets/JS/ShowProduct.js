const params = new URLSearchParams(location.search);
const id = params.get('id');

const SpecificTitle = document.querySelector('#title');
const SpecificPrice = document.querySelector('#price');

getData()