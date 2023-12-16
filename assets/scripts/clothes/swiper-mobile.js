
//=====    Стиль мобильного свайпера

//Карточки
var swiper = new Swiper(".mySwiper-mobile", {
    effect: "cards",
    grabCursor: true,
    loop: true,
});


//=======   Функционал мобильного свайпера

function getRandomInt() {
    let maxInt = 5;
    let minInt = 1;
    //min = Math.ceil(min);
    //max = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt) + minInt);
}

//console.log('random: ' + getRandomInt());
//Change pack clothes
//const packMedium = document.querySelector('.pack-medium');
const packLight = document.querySelector('.pack-light');
const packWarm = document.querySelector('.pack-warm');

//Прописываем путь к папка с одеждой
const clothesImages = [getRandomInt() + '.png', getRandomInt() + '.png'];
//console.log(clothesImages);
const pathDemi = 'assets/images/clothes/pics-slider-desctop/0-15/';
const pathWinter = 'assets/images/clothes/pics-slider-desctop/-14-0/';
const pathSummer = 'assets/images/clothes/pics-slider-desctop/more+15';
const pathExtraWinter = 'assets/images/clothes/pics-slider-desctop/less-15/';


// Функция выбора папки с одеждой
function changePack(pathSeason) {
    packLight.src = pathSeason +'forHot/'+  clothesImages[0];
    packWarm.src = pathSeason +'forCold/'+ clothesImages[1];

    // packMedium.src = pathSeason + clothesImages[0];
    console.log(packWarm);

}

// Функция определения сезона в зависимости от температуры
function determineSeason(currentTemperature) {
    currentTemperature = Math.round(currentTemperature);

    let season = '';
    if (currentTemperature < -14) season = 'extra_winter';
    if (currentTemperature < 0 && currentTemperature > -15) season = 'winter';
    if (currentTemperature > -1 && currentTemperature < 15) season = 'demi';
    if (currentTemperature > 14) season = 'summer';
    console.log('Season: ' + season + ';  --temp rounded: ' + currentTemperature);
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

        console.log('=====  Swiper-mobile module: =====');
        console.log('new data: feels like === ' + gotTemp + '--- ' + typeof (gotTemp) + '.-- and from LS:  ' + gotTempLS);
        let season = determineSeason(gotTemp);
        switch (season) {
            case 'extra_winter':
                console.log('Extra winter pack: -15 and below');
                changePack(pathExtraWinter);
                break;
            case 'winter':
                console.log('winter pack: -1 .. -14');
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
        console.log('-----  Swiper-mobile module END -----');
    }


    catch (error) {
        console.error('что то не так по данным получения температуры:', error);
    }
}



// document.querySelector('.b-1').addEventListener('click', changePackDependsOnTemperature);