import * as constants from './constants.js';


//функция определения времени суток для подтягивания определенной картинки(ночь-день)//
export async function getTimeOfDay(newData) {
    try {
        const currentTimestamp = newData.dt;
        const sunriseTimestamp = newData.sys.sunrise;
        const sunsetTimestamp = newData.sys.sunset;

        const currentUTC = new Date(currentTimestamp * 1000);
        const sunriseUTC = new Date(sunriseTimestamp * 1000);
        const sunsetUTC = new Date(sunsetTimestamp * 1000);

        const currentHour = currentUTC.getHours();
        const sunriseHour = sunriseUTC.getHours();
        const sunsetHour = sunsetUTC.getHours();

        return currentHour < sunriseHour || currentHour > sunsetHour;
    } catch (error) {
        console.error('Ошибка при определении времени суток:', error.message);
        return false;
    }
}

//Функция установки картинки на бэкграунде в соответствии с погодными условиями//
export async function updateBackgroundBasedOnWeather(newData) {
    try {
        console.log('Данные о погоде:', newData);

        if (!newData || !newData.weather || !newData.weather[0] || !newData.sys || !newData.sys.sunrise || !newData.sys.sunset) {
            console.error('Некорректные данные о погоде: отсутствуют необходимые свойства');
            return;
        }


        const weatherArray = newData.weather;
        const weatherDescription = weatherArray[0].description;
        const isNight = await getTimeOfDay(newData);


        if (!weatherDescription) {
            console.error('Некорректные данные о погоде: отсутствует описание погоды');
            return;
        }



        const body = document.body;
        // Сопоставление описания погоды и времени суток с нужной картинкой
        let backgroundImage;

        if (isNight) {
            switch (weatherDescription) {
                case 'пасмурно':
                    backgroundImage = 'assets/images/weather/cloudy/clouds_road.jfif';
                    break;
                case 'переменная облачность':
                    backgroundImage = 'assets/images/weather/clear/few_clouds2_night.jpg';
                    break;
                case 'небольшая облачность':
                    backgroundImage = 'assets/images/weather/cloudy/night_clouds.jfif';
                    break;
                case 'облачно с прояснениями':
                    backgroundImage = 'assets/images/weather/cloudy/scattered_clouds_night.jpg';
                    break;
                case 'небольшой дождь':
                    backgroundImage = 'assets/images/weather/rain/rain.jfif';
                    break;
                case 'дождь':
                    backgroundImage = 'assets/images/weather/rain/heavy_rain_night.jfif';
                    break;
                case 'ясно':
                    backgroundImage = 'assets/images/weather/clear/clear_sky_night.jpg';
                    break;
                case 'туман':
                    backgroundImage = 'assets/images/weather/mist/heavy_mist_night.jfif';
                    break;
                case 'мгла':
                    backgroundImage = 'assets/images/weather/mist/mist_night_ai.jfif';
                    break;
                case 'снег':
                    backgroundImage = 'assets/images/weather/snow/snow_forrest_night.jpg';
                    break;
                case 'небольшой снег':
                    backgroundImage = 'assets/images/weather/snow/frozen.jpg';
                    break;
                case 'метель':
                    backgroundImage = 'assets/images/weather/snow/frozen.jfif';
                    break;
                // Другие случаи для ночных условий
                default:
                    backgroundImage = 'assets/images/weather/default_night_spice.jfif';
            }
        } else {
            switch (weatherDescription) {
                case 'пасмурно':
                    backgroundImage = 'assets/images/weather/cloudy/scattered_clouds_day.jpg';
                    break;
                case 'переменная облачность':
                    backgroundImage = 'assets/images/weather/clear/clouds_sunny.jpg';
                    break;
                case 'небольшая облачность':
                    backgroundImage = 'assets/images/weather/clear/few_clouds_day.jpg';
                    break;
                case 'облачно с прояснениями':
                    backgroundImage = 'assets/images/weather/clear/clouds_sunny.jpg';
                    break;
                case 'небольшой дождь':
                    backgroundImage = 'assets/images/weather/rain/heavy_rain_day.jfif';
                    break;
                case 'дождь':
                    backgroundImage = 'assets/images/weather/rain/small_rain2.jfif';
                    break;
                case 'ясно':
                    backgroundImage = 'assets/images/weather/clear/few_clouds_day.jpg';
                    break;
                case 'туман':
                    backgroundImage = 'assets/images/weather/mist/misty_day.jfif';
                    break;
                case 'мгла':
                    backgroundImage = 'assets/images/weather/mist/big_mist_forrest_day.jfif';
                    break;
                case 'снег':
                    backgroundImage = 'assets/images/weather/snow/snow_forrest_night.jfif';
                    break;
                case 'небольшой снег':
                    backgroundImage = 'assets/images/weather/snow/frozen.jpg';
                    break;
                case 'метель':
                    backgroundImage = 'assets/images/weather/snow/frozen.jfif';
                    break;

                // Другие случаи для дневных условий
                default:
                    backgroundImage = 'assets/images/weather/default_day.jpg';
            }
        }

        // Применение фона к body
        body.style.backgroundImage = `url('${backgroundImage}')`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundRepeat = 'no-repeat';

    } catch (error) {
        console.error('Ошибка при обновлении фона:', error.message);

    }
}