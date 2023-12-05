document.addEventListener("DOMContentLoaded", function (event) {
    // Ключ API для OpenWeatherMap
    const apiKey = 'd5763f6ad57aeab7c0f91e5f77a6c825';

    // Элементы DOM
    const arrow = document.getElementById('arrow');
    const windSpeedElement = document.getElementById('wind-speed');
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const temperatureMin = document.getElementById('temperature_min');
    const temperatureMax = document.getElementById('temperature_max');
    const temperatureFeelsLike = document.getElementById('temperature_feels_like');
    const descriptionElement = document.getElementById('description');
    const iconElement = document.getElementById('icon');
    const cityInput = document.getElementById('city');
    const mainContainerInfo = document.querySelector('.container_weather__main-info');
    const addContainerInfo = document.querySelector('.container_weather__add-info')
    const errorContainer = document.getElementById('error-container');


    // Функция получения направления ветра по градусам
    function getWindDirection(degrees) {
        const directions = ['север', 'северо-восток', 'восток', 'юго-восток', 'юг', 'юго-запад', 'запад', 'северо-запад'];
        const index = Math.round(degrees / 45);
        return directions[index % 8];
    }

    // Функция обновления визуализации направления ветра
    function updateWindDirection(degrees, speed) {
        const normalizedDegrees = (degrees + 360) % 360;
        const windDirection = getWindDirection(normalizedDegrees);

        windSpeedElement.textContent = `${Math.round(speed)} км/ч`;
        console.log(`Ветер идет с направлением: ${windDirection}`);

        arrow.style.transform = `translate(-50%, -100%) rotate(${normalizedDegrees}deg)`;
    }

    // Функция запроса данных о погоде
    async function fetchData(location) {
        try {
            let apiUrl;

            if (location) {
                const { latitude, longitude } = location;
                apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=ru&appid=${apiKey}&units=metric`;
            } else {
                const city = cityInput.value.trim();
                if (/^\d+$/.test(city)) {
                    showError('Введите корректное название города');

                    return;
                } else {
                    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${apiKey}&units=metric`;
                    cityInput.value = '';
                }
            }
            hideError();



            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Ошибка получения данных о погоде');
            }

            const data = await response.json();
            if (data.cod && data.cod !== 200) {
                showError(`Ошибка: ${data.message}`);
                return;
            }
            console.log('Получены данные о погоде:', data);

            updateChart(data);
            return data;
        } catch (error) {
            console.error('Ошибка получения данных о погоде:', error.message);
            showError('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
        }
    }

    // Функция для вывода сообщений об ошибках при введенных в инпут некорректных данных в контейнер
    function showError(message) {

        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        mainContainerInfo.style.display = 'none';
        addContainerInfo.style.display = 'none';
    }

    function hideError() {

        errorContainer.style.display = 'none';
    }


    // Функция вывода информации о городе, температуре, макс и мин температуре, иконка, ощущается как, короткое описание
    function updateChart(newData) {
        if (newData) {
            console.log(JSON.stringify(newData, null, 2));

            locationElement.textContent = `${newData.name}`;
            temperatureElement.textContent = `${Math.round(newData.main.temp)}°C`;
            temperatureMin.textContent = `Мин ${Math.round(newData.main.temp_min)}°C `;

            temperatureMax.textContent = ` Макс ${Math.round(newData.main.temp_max)}°C`;
            temperatureFeelsLike.textContent = ` ${Math.round(newData.main.feels_like)}°C`;

            descriptionElement.textContent = `${newData.weather[0].description} `;
            iconElement.src = `https://openweathermap.org/img/w/${newData.weather[0].icon}.png`;


            updateWindDirection(newData.wind.deg, newData.wind.speed);
            updateBackgroundBasedOnWeather(newData);

            errorContainer.style.display = 'none';
        } else {
            console.error('Ошибка получения данных о погоде: неверный формат данных', newData);
            mainContainerInfo.style.display = 'none';
            addContainerInfo.style.display = 'none';
            errorContainer.style.display = 'block';
        }




    }

    // Функция получения текущего местоположения пользователя
    async function getCurrentLocation() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    position => resolve(position),
                    error => reject(error)
                );
            });

            const { latitude, longitude } = position.coords;
            return { latitude, longitude };
        } catch (error) {
            console.error('Ошибка при получении местоположения:', error);
            throw error;
        }
    }

    // Обработчик события для инпута города
    cityInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            fetchCityData();
        }
    });

    // Функция для запроса данных о погоде по введенному городу
    async function fetchCityData() {
        try {
            const city = cityInput.value.trim();
            if (!city) {
                console.error('Введите название города');
                return;
            }
            fetchData(null, city);
        } catch (error) {
            console.error('Ошибка при получении данных о погоде:', error);
        }
    }

    // Инициализация приложения при загрузке страницы
    initWeatherApp();
    fetchAdvice();


    // Функция для получения случайного совета
    const adviceContainer = document.getElementById('container_advice');
    async function fetchAdvice() {
        try {
            const apiUrl = 'https://api.adviceslip.com/advice';
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('Ошибка получения совета');
            }

            const data = await response.json();

            // Проверяем, есть ли текст совета в данных
            if (data && data.slip && data.slip.advice) {
                // Вывод совета на страницу
                adviceContainer.textContent = data.slip.advice;
            } else {
                throw new Error('Данные о совете отсутствуют или некорректны');
            }
        } catch (error) {
            console.error('Ошибка получения совета:', error.message);
            // Обработка ошибки
            adviceContainer.textContent = 'Произошла ошибка. Попробуйте еще раз.';
        }
    }


    //функция определения времени суток для подтягивания определенной картинки(ночь-день)//
    async function getTimeOfDay(newData) {
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
    async function updateBackgroundBasedOnWeather(newData) {
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


            const mainContainer = document.querySelector('.container_weather');
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
                        backgroundImage = 'assets/images/weather/snow/snow_forrest_night.jfif';
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
                        backgroundImage = 'assets/images/weather/snow/snow_forrest.jpg';
                        break;
                    case 'небольшой снег':
                        backgroundImage = 'assets/images/weather/snow/frozen.jfif';
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




    // Функция инициализации приложения
    async function initWeatherApp() {
        try {
            const location = await getCurrentLocation();
            const newData = await fetchData(location);
            updateBackgroundBasedOnWeather(newData);
        } catch (error) {
            console.error('Ошибка инициализации приложения о погоде:', error);
        }
    }
});