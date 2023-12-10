const swiperDesktop = document.querySelector('.sw-1');
const swiperMobile = document.querySelector('.sw-2');
const mobileWidth = 770; //px



function getScreenSize() {
    const windowInnerWidth = window.innerWidth;
    const windowInnerHeight = window.innerHeight;
    console.log('screen width: ' + windowInnerWidth);
    console.log('screen height: ' + windowInnerHeight);

    if (windowInnerWidth > mobileWidth) {
        console.log('desktop version, no wrap');
        swiperDesktop.style.display = 'block';
        swiperMobile.style.display = 'none';
    }
    else { 
        console.log('mobile version, wrap: true');
        swiperDesktop.style.display = 'none';
        swiperMobile.style.display = 'flex';
    }


}

document.querySelector('.b-test').addEventListener('click', getScreenSize);



// var detectWrap = function (className) {
//     var wrappedItems = [];
//     var prevItem = {};
//     var currItem = {};
//     var items = document.getElementsByClassName(className);
//     for (var i = 0; i < items.length; i++) {
//         curritem = items[i].getBoundingClientRect();

//         if (prevItem && prevItem.top < currItem.top) {
//             wrappedItems.push(items[i]);
//         }
//     };
//     prevItem = curritem;
//     return wrappedItems;
// }
