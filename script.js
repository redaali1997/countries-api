const searchForm = document.querySelector('#searchForm'),
searchInput = document.querySelector('#searchInput'),
result = document.querySelector('#result'),
error = document.querySelector('#error'),
container = document.querySelector('.container');

// https://restcountries.com/v3.1/name/{name}?fullText=true
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    userInput = searchInput.value;
    if (userInput) {
        fetch(`https://restcountries.com/v3.1/name/${userInput}?fullText=true`)
        .then((response) => response.json())
            .then((data) => {
            const currency = Object.keys(data[0].currencies);
            const language = Object.values(data[0].languages);
            error.innerHTML = ""
            container.style.height = '566px';
            result.innerHTML = `
                <div id="nameFlag">
                    <img src="${data[0].flags.png}" id="countryImg">
                    <h3 id="countryName">${data[0].name.common}</h3>
                </div>
                <div id="content">
                    <h5>Capital: <span>${data[0].capital[0]}</span></h5>
                    <h5>Continent: <span>${data[0].continents[0]}</span></h5>
                    <h5>Population: <span>${data[0].population}</span></h5>
                    <h5>Currency: <span>${currency}</span></h5>
                    <h5>Common Languages: <span>${language}</span></h5>
                </div>
            `
        })
        .catch(e => {
            error.innerHTML = 'Please enter a valid country.'
    })
    } else {
        error.innerHTML = 'Field is empty.'
    }
});
