// Бесконечный куб
let swiper = new Swiper(".mySwiper", {
    
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    loop: true,
    
    pagination: {
      el: ".swiper-pagination",
    },
});
  

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