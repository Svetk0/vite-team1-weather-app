const swiperDesktop = document.querySelector('.sw-1');
const swiperDeskButtons = document.querySelector('.block-clothes--button-box');
const swiperMobile = document.querySelector('.sw-2');
const mobileWidth = 770; //px, на этой границе идет прееключение слайдеров
getScreenSize();

export async function getScreenSize() {

    try {
        const windowInnerWidth = await document.body.clientWidth;
        //const windowInnerHeight = document.body.clientHeight;
        console.log('screen width: ' + windowInnerWidth);
        //console.log('screen height: ' + windowInnerHeight);

        if (windowInnerWidth > mobileWidth) {
            console.log('desktop version, no wrap');
            swiperDeskButtons.style.display = 'flex';
            swiperDesktop.style.display = 'block';
            swiperMobile.style.display = 'none';
        }
        else {
            console.log('mobile version, wrap: true');
            swiperDeskButtons.style.display = 'none';
            swiperDesktop.style.display = 'none';
            swiperMobile.style.display = 'flex';
        }
    }
    catch (error) {
        console.error('ошибка в определении ширины', error);
    }

}
//document.querySelector('.b-test').style.display = 'none';
//document.querySelector('.b-test').addEventListener('click', getScreenSize);






