import * as fetchDataModule from "./../weather/fetchDataModule.js";

const buttonImHot = document.querySelector(".imHot");
const buttonImCold = document.querySelector(".imIce");
const swiperWrapper = document.querySelector(".swiper-wrapper");
const tempError = document.querySelector(".clothes-error");

//добавим в обработчик анонимную функцию, которая будет вызвана при клике на соответствующую кнопку
buttonImHot.addEventListener("click", () => handleClick("hot"));
buttonImCold.addEventListener("click", () => handleClick("cold"));

async function handleClick(type) {
  try {
    //определяем температуру
    const temperature = await checkTemperature();
    console.log(temperature);

    // в зависимости от типа нажатой кнопки и показанной температуры, определяем массив изображений
    const imageArray = getImageArray(type, temperature);

    //в зависимости от полученного массива, отрисовываем слайдер
    renderImages(imageArray);
  } catch (error) {
    console.error("Произошла ошибка при получении температуры:", error.message);
    tempError.style.display = "block";
    tempError.innerHTML =
      "Для просмотра рекомендаций Вам необходимо проверить погоду в интересующем вас городе :) ";
  }
}

function getImageArray(type, temperature) {
  const imageForHotLess0 = [
    "/assets/images/clothes/1.jpg",
    "/assets/images/clothes/2.jpg",
    "/assets/images/clothes/3.jpg",
    "/assets/images/clothes/4.jpg",
    "/assets/images/clothes/5.jpg",
  ];
  const imageForHotMore0 = [
    "/assets/images/clothes/11.jpg",
    "/assets/images/clothes/12.jpg",
    "/assets/images/clothes/13.jpg",
    "/assets/images/clothes/14.jpg",
    "/assets/images/clothes/15.jpg",
  ];
  const imageForColdMore0 = [
    "/assets/images/clothes/16.jpg",
    "/assets/images/clothes/17.jpg",
    "/assets/images/clothes/18.jpg",
    "/assets/images/clothes/19.jpg",
    "/assets/images/clothes/20.jpg",
  ];
  const imageForColdLess0 = [
    "/assets/images/clothes/21.jpg",
    "/assets/images/clothes/22.jpg",
    "/assets/images/clothes/23.jpg",
    "/assets/images/clothes/24.jpg",
    "/assets/images/clothes/25.jpg",
  ];

  if (type === "hot") {
    return temperature > 0 ? imageForHotMore0 : imageForHotLess0;
  } else if (type === "cold") {
    return temperature < 0 ? imageForColdLess0 : imageForColdMore0;
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

// async function checkTemperature() {
//   const cityInput = document.querySelector("#city");
//   //const data = await fetchDataModule(cityInput.value);
//   await fetchDataModule.fetchData({ latitude: 0, longitude: 0 });
//   return parseInt(data.main.temp);
// }

async function checkTemperature() {
  const cityInput = document.querySelector("#city");
  // const data = await fetchDataModule.fetchData(cityInput.value);
  const data = await fetchDataModule.fetchData({ latitude: 0, longitude: 0 });
  return parseInt(data.main.temp);
}

//
