document.addEventListener("DOMContentLoaded", async function () {
    const gif = await getGif()
    if (gif !== undefined) {
        setGif(gif)
    }
})

async function getGif() {
    try {
        const response = await fetch('http://localhost:3000/gifs/random')
        const blob = await response.blob()
        const obj = URL.createObjectURL(blob)
        const img = document.createElement('img')
        img.src = obj
        return img;
    } catch (err) {
        console.log('Ошибка получения gif:', err);
    }
}

function setGif(element) {
    const div = document.querySelector('#gif');
    div.appendChild(element)
}
