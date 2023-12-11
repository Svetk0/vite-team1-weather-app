import * as constants from './constants.js';
import * as wind from './wind.js';
import * as locationModule from './locationModule.js';
import * as advice from './advice.js';
import * as backgroundModule from './backgroundModule.js';
import * as fetchDataModule from './fetchDataModule.js';
import {loadGif} from "../gifs/gifs.js";

document.addEventListener("DOMContentLoaded", function () {



    // Обработчик события для инпута города 
    constants.cityInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            fetchCityData();
        }
    });

    // Функция для запроса данных о погоде по введенному городу
    async function fetchCityData() {
        try {
            const city = constants.cityInput.value.trim();
            if (!city) {
                console.error('Введите название города');
                return;
            }

            const newData = await fetchDataModule.fetchData(null, city);

            displayWeatherData(newData);

            loadGif()
        } catch (error) {
            console.error('Ошибка при получении данных о погоде:', error);
        }
    }

    // Функция вывода информации о городе, температуре, макс и мин температуре, иконка, ощущается как, короткое описание
    function displayWeatherData(newData) {
        if (newData) {


            constants.locationElement.textContent = `${newData.name}`;
            constants.temperatureElement.textContent = `${Math.round(newData.main.temp)}°C`;
            constants.temperatureMin.textContent = `Мин ${Math.round(newData.main.temp_min)}°C `;

            constants.temperatureMax.textContent = ` Макс ${Math.round(newData.main.temp_max)}°C`;
            constants.temperatureFeelsLike.textContent = ` ${Math.round(newData.main.feels_like)}°C`;

            constants.descriptionElement.textContent = `${newData.weather[0].description} `;
            constants.iconElement.src = `https://openweathermap.org/img/w/${newData.weather[0].icon}.png`;


            wind.updateWindDirection(newData.wind.deg, newData.wind.speed);
            backgroundModule.updateBackgroundBasedOnWeather(newData);

            constants.errorContainer.style.display = 'none';
        } else {
            console.error('Ошибка получения данных о погоде: неверный формат данных', newData);
            constants.mainContainerInfo.style.display = 'none';
            constants.addContainerInfo.style.display = 'none';
            constants.errorContainer.style.display = 'block';
        }

    }


    // Инициализация приложения при загрузке страницы

    initWeatherApp();
    // advice.fetchAdvice();


    // Функция инициализации приложения
    async function initWeatherApp() {
        try {
            const location = await locationModule.getCurrentLocation();
            const newData = await fetchDataModule.fetchData(location);
            backgroundModule.updateBackgroundBasedOnWeather(newData);
            displayWeatherData(newData);
        } catch (error) {
            console.error('Ошибка инициализации приложения о погоде:', error);
        }
    }

});