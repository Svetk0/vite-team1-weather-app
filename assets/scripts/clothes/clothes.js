import { fetchData } from "./../weather/fetchDataModule.js";
import { getCurrentLocation } from "./../weather/locationModule.js";
import { temperatureElement } from "./../weather/constants.js";

const buttonImHot = document.querySelector(".imHot");
console.log(buttonImHot);
const buttonImCold = document.querySelector(".imIce");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const tempError = document.querySelector(".clothes-error");
let currentTempa;

//добавим в обработчик анонимную функцию, которая будет вызвана при клике на соответствующую кнопку
buttonImHot.addEventListener("click", () => handleClick("hot"));
buttonImCold.addEventListener("click", () => handleClick("cold"));

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    clearSwiperWrapper();
  }
});

function clearSwiperWrapper() {
  swiperWrapper.innerHTML = "";
}

async function handleClick(type) {
  try {
    //определяем температуру
    const location = await getCurrentLocation();
    const data = await fetchData(location);
    let previousTempa = parseInt(data.main.temp);
    let nextTempa = parseInt(temperatureElement.textContent);
    currentTempa = nextTempa || previousTempa;

    // в зависимости от типа нажатой кнопки и показанной температуры, определяем массив изображений
    const imageArray = getImageArray(type, currentTempa);

    //в зависимости от полученного массива, отрисовываем слайдер

    renderImages(imageArray);
  } catch (error) {
    console.error("Произошла ошибка при получении температуры:", error.message);
    tempError.style.display = "block";
    tempError.innerHTML =
      "Для просмотра рекомендаций Вам необходимо проверить погоду в интересующем вас городе :) ";
  }
}

function getImageArray(type, currentTempa) {
  const imageForHotFrom0To15 = [
    "./assets/images/clothes/pics-slider-desctop/0-15/forHot/1.png",
    "./assets/images/clothes/pics-slider-desctop/0-15/forHot/2.png",
    "./assets/images/clothes/pics-slider-desctop/0-15/forHot/3.png",
    "./assets/images/clothes/pics-slider-desctop/0-15/forHot/4.png",
  ];
  const imageForColdFrom0To15 = [
    "./assets/images/clothes/pics-slider-desctop/0-15/forCold/1.png",
    "./assets/images/clothes/pics-slider-desctop/0-15/forCold/2.png",
    "./assets/images/clothes/pics-slider-desctop/0-15/forCold/3.png",
    "./assets/images/clothes/pics-slider-desctop/0-15/forCold/4.png",
  ];
  const imageForHotMore16 = [
    "./assets/images/clothes/pics-slider-desctop/more+15/forHot/1.png",
    "./assets/images/clothes/pics-slider-desctop/more+15/forHot/2.png",
    "./assets/images/clothes/pics-slider-desctop/more+15/forHot/3.png",
    "./assets/images/clothes/pics-slider-desctop/more+15/forHot/4.png",
  ];

  const imageForColdMore16 = [
    "./assets/images/clothes/pics-slider-desctop/more+15/forCold/1.png",
    "./assets/images/clothes/pics-slider-desctop/more+15/forCold/2.png",
    "./assets/images/clothes/pics-slider-desctop/more+15/forCold/4.png",
    "./assets/images/clothes/pics-slider-desctop/more+15/forCold/5.png",
  ];

  const imageForHotFromMinus1tillMinus15 = [
    "./assets/images/clothes/pics-slider-desctop/-14-0/1.jpg",
    "./assets/images/clothes/pics-slider-desctop/-14-0/2.jpg",
    "./assets/images/clothes/pics-slider-desctop/-14-0/3.jpg",
  ];

  const imageForColdFromMinus1tillMinus15 = [
    "./assets/images/clothes/pics-slider-desctop/-14-0/1.jpg",
    "./assets/images/clothes/pics-slider-desctop/-14-0/2.jpg",
    "./assets/images/clothes/pics-slider-desctop/-14-0/3.jpg",
  ];

  const imageForHotFromMinus16 = [
    "./assets/images/clothes/pics-slider-desctop/less-15/1.jpg",
    "./assets/images/clothes/pics-slider-desctop/less-15/2.jpg",
    "./assets/images/clothes/pics-slider-desctop/less-15/3.jpg",
  ];

  const imageForColdFromMinus16 = [
    "./assets/images/clothes/pics-slider-desctop/less-15/1.jpg",
    "./assets/images/clothes/pics-slider-desctop/less-15/2.jpg",
    "./assets/images/clothes/pics-slider-desctop/less-15/3.jpg",
  ];

  if (type === "hot") {
    if (currentTempa >= 0 && currentTempa <= 15) {
      return imageForHotFrom0To15;
    } else if (currentTempa > 15) {
      return imageForHotMore16;
    } else if (currentTempa <= -1 && currentTempa > -15) {
      return imageForHotFromMinus1tillMinus15;
    } else if (currentTempa <= -16) {
      return imageForHotFromMinus16;
    }
  } else if (type === "cold") {
    if (currentTempa >= 0 && currentTempa <= 15) {
      return imageForColdFrom0To15;
    } else if (currentTempa > 15) {
      return imageForColdMore16;
    } else if (currentTempa <= -1 && currentTempa > -15) {
      return imageForColdFromMinus1tillMinus15;
    } else if (currentTempa <= -16) {
      return imageForColdFromMinus16;
    }
  }
}

function renderImages(imageArray) {
  swiperWrapper.innerHTML = "";

  imageArray.forEach((image) => {
    createNewSlide(image);
  });

  if (imageArray.length === 0) {
    swiperWrapper.style.display = "none";
  }
}

function createNewSlide(image) {
  tempError.style.display = "none";

  const slideDiv = document.createElement("div");
  const img = document.createElement("img");

  slideDiv.classList.add("swiper-slide");
  img.src = image;

  slideDiv.appendChild(img);
  swiperWrapper.appendChild(slideDiv);
}
