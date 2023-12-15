// console.log('Client side javascript file is loaded!');

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// })

// fetch('http://localhost:3000/weather?address=Bhubaneswar').then((res) => {
//     res.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         } else{
//             console.log(data.location);
//             console.log(data.weather);
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const searchString = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = searchString.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.weather.weatherDescription;
            }
        })
    })
})