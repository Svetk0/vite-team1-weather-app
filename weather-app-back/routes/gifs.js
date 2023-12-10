var express = require('express');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises')
var router = express.Router();

/* GET users listing. */
router.get('/random', async function(req, res, next) {

  console.log(__dirname)
  const folder = path.join('gifs')

  // Получаем наименование гифки для отдачи
  const filename = await getRandomGif()

  // Если вдруг нам вернулся undefined - возвращаем ошибку и json с текстом ошибки
  if (filename === undefined) {
    res.set({'content-type': 'application/json; charset=utf-8'})
    res.status(404).end(JSON.stringify({error: 'Не удалось получить гифку :('}))
  }

  const file = path.join(folder, filename)

  // Создаем stream для отдачи файла
  const stream = fs.createReadStream(file);

  stream.on('open', function () {
    res.setHeader('Content-Type', "image/gif");
    stream.pipe(res);
  });
});

/*
  Получить рандомно наименование гифки из public папки
 */
const getRandomGif = async () => {
  const folder = path.join('gifs')

  try {

    // Считываем все файлы из директории
    const files = (await fsPromises.readdir(folder, {withFileTypes: true}))
        .filter(x => x.isFile())

    // Находим длину
    const maxFileIndex = files.length - 1

    // Получаем рандомное число от 0 до максимального индекса
    const randomIndex = getRandomNumber(0, maxFileIndex)

    // Защита на всякий случай)
    if (randomIndex <= maxFileIndex) {
      return files[randomIndex].name
    }
    else {
      // Если защита сработала, то вернем гифку с ошибкой
      return path.join(folder, 'not-found', 'not-found-404error.gif')
    }
  } catch (err) {
    console.log(err)
  }
}

/*
  Получить рандомную цифру в пределах минимального и максимального значения
 */
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

module.exports = router;
