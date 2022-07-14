// fetch the forecast information using fetch API


// http://localhost:3000/weather?lat=37.8267&lon=-122.4233

const weatherForm = document.querySelector('form')
const latInput = document.getElementById('lat')
const lonInput = document.getElementById('lon')
const messageOne = document.getElementById('message-one')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent the browser refresh
    const lat = latInput.value
    const lon = lonInput.value
    console.log(lat, lon)
    messageOne.textContent = 'Loading...'
    fetch(`http://localhost:3000/weather?lat=${lat}&lon=${lon}`).then((res) => {
        res.json().then((data) => {
            messageOne.textContent = `${data.forecast} and temperature is ${data.temperature}`
            console.log(data)
        })
    })
})