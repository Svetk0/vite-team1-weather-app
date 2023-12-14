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

    let season = '';
    if (currentTemperature < 0) season = 'winter';
    if (currentTemperature > -1 && currentTemperature < 15) season = 'demi';
    if (currentTemperature > 14) season = 'summer';
    //console.log('Season: ' + season);
    return season;
}

// Функция считывания температуры из DOM дерева
async function readDOMtemperature() {
    try {
        let weatherMainInfoCheck = document.querySelector('.container_weather__main-info');
        console.log('display weather: '+getComputedStyle(weatherMainInfoCheck).display );

        if (weatherMainInfoCheck.style.display != 'none') {
            let currentTempStr = await document.querySelector('#temperature').textContent;
            let currentTempStrEdit = currentTempStr.substring(0, currentTempStr.length - 2);
            let currentTemp = Number(currentTempStrEdit);
            console.log('currentTemp from DOM: ' + currentTemp);
            return currentTemp;
            
        } else if (weatherMainInfoCheck.style.display === 'none') {
            console.log('weather display none');
        }


    } catch (error) {
        console.error('Ошибка при получении температуры DOM элемента:', error);
        throw error;
    }
}

// Функция выбора одежды в зависимости от сезона
async function changePackDependsOnTemperature() {
    try {
        let domTemp = await readDOMtemperature();
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
    catch (error) {
        console.error('что то не так по данным получения температуры:', error);
    }
}



document.querySelector('.b-1').addEventListener('click', changePackDependsOnTemperature);