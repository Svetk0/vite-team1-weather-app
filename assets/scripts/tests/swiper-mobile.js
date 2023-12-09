//import * as fetchDataModule from '../weather/fetchDataModule.js';


// Бесконечный куб
// let swiper = new Swiper(".mySwiper", {

//     effect: "cube",
//     grabCursor: true,
//     cubeEffect: {
//       shadow: true,
//       slideShadows: true,
//       shadowOffset: 20,
//       shadowScale: 0.94,
//     },
//     loop: true,

//     pagination: {
//       el: ".swiper-pagination",
//     },
// });


// Вертикальная бесконечная прокрутка
// var swiper = new Swiper(".mySwiper", {
//     direction: "vertical",
//     slidesPerView: 1,
//     spaceBetween: 30,
//     mousewheel: true,
//     loop: true,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//   });   

//Карточки
var swiper = new Swiper(".mySwiper-mobile", {
    effect: "cards",
    grabCursor: true,
    loop: true,
});



const packMedium = document.querySelector('.pack-medium');
const packLight = document.querySelector('.pack-light');
const packWarm = document.querySelector('.pack-warm');

const clothesImages = ['1.jpg', '2.jpg', '3.jpg'];
const pathDemi = 'assets/images/clothes/solomat-test/0-15/';
const pathWinter = 'assets/images/clothes/solomat-test/minus15-0/';
const pathSummer = 'assets/images/clothes/solomat-test/15-25/';

function changePack(pathSeason) {
    packLight.src = pathSeason + clothesImages[1];
    console.log(packLight);
    packMedium.src = pathSeason + clothesImages[0];
    console.log(packMedium);
    packWarm.src = pathSeason + clothesImages[2];
    console.log(packWarm);
}
function determineSeason(currentTemperature) {

    let season = '';
    if (currentTemperature < 0) season = 'winter';
    if (currentTemperature > -1 && currentTemperature < 15) season = 'demi';
    if (currentTemperature > 14) season = 'summer';
    //console.log('Season: ' + season);
    return season;
}

function readDOMtemperature() { 
    let currentTempStr = document.querySelector('#temperature').textContent;
    let currentTempStrEdit = currentTempStr.substring(0, currentTempStr.length - 2);
    let currentTemp = Number(currentTempStrEdit);
    return currentTemp
}

function changePackDependsOnTemperature() {
    let domTemp = readDOMtemperature();
    let season = determineSeason(domTemp);
    switch (season) {
        case 'winter':
            console.log('winter pack');
            changePack(pathWinter);
            break;
        case 'demi':
            console.log('demi pack');
            changePack(pathDemi);
            break;
        case 'summer':
            console.log('summer pack');
            changePack(pathSummer);
            break;
    }




}

document.querySelector('.b-1').addEventListener('click', changePackDependsOnTemperature);