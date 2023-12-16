import * as constants from '../weather/constants.js';
//=====    Стиль мобильного свайпера

//Карточки
var swiper = new Swiper(".mySwiper-mobile", {
    effect: "cards",
    grabCursor: true,
    loop: true,
});

//=======   Функционал мобильного свайпера



//Change pack clothes
//const packMedium = document.querySelector('.pack-medium');
const packLight = document.querySelector('.pack-light');
const packWarm = document.querySelector('.pack-warm');

//Прописываем путь к папка с одеждой
const clothesImages = ['2.jpg', '3.jpg'];
const pathDemi = 'assets/images/clothes/solomat-test/0-15/';
const pathWinter = 'assets/images/clothes/solomat-test/minus15-0/';
const pathSummer = 'assets/images/clothes/solomat-test/15-25/';


// Функция выбора папки с одеждой
function changePack(pathSeason) {
    packLight.src = pathSeason + clothesImages[0];
    packWarm.src = pathSeason + clothesImages[1];

    // packMedium.src = pathSeason + clothesImages[0];
    //console.log(packMedium);

}

// Функция определения сезона в зависимости от температуры
function determineSeason(currentTemperature) {
    currentTemperature = Math.round(currentTemperature);

    let season = '';
    if (currentTemperature < 0) season = 'winter';
    if (currentTemperature > -1 && currentTemperature < 15) season = 'demi';
    if (currentTemperature > 14) season = 'summer';
    console.log('Season: ' + season + ';  --temp rounded: '+currentTemperature);
    return season;
}

// Функция считывания температуры из Local Storage
async function readLocalStorageTemperature() {
    let mainTemperature = +localStorage.getItem('test-temp');

    //console.log('mainTemperature local:' + mainTemperature + ' ---' + typeof (mainTemperature));
    return Math.round(mainTemperature);
}


// Функция выбора одежды в зависимости от сезона
export async function changePackDependsOnTemperature(gotTemp) {
    try {
       
        let gotTempLS = await readLocalStorageTemperature();
        

        console.log('==  Swiper-mobile: new data === ' + gotTemp + '--- ' + typeof (gotTemp) + '.-- and from LS:  ' + gotTempLS);
        let season = determineSeason(gotTemp);
        switch (season) {
            case 'winter':
                console.log('winter pack: -15 and below');
                changePack(pathWinter);
                break;
            case 'demi':
                console.log('demi pack: 0 .. +15');
                changePack(pathDemi);
                break;
            case 'summer':
                console.log('summer pack: +15 and upper');
                changePack(pathSummer);
                break;
        }

    }
   

    catch (error) {
        console.error('что то не так по данным получения температуры:', error);
    }
}



// document.querySelector('.b-1').addEventListener('click', changePackDependsOnTemperature);