const Router = require('express') //Подключение класса по работе с фреймворком
const router = new Router() //Занесение класса в переменную для читабельности
const orderArchive = require('./orderArchiveRouter') //Подключение файла с маршрутами по работе с бд orderArchive
const orderInTheHall = require('./orderInTheHallRouter') //Подключение файла с маршрутами по работе с бд orderInTheHall
const takeAwayOrder = require('./takeAwayOrderRouter') //Подключение файла с маршрутами по работе с бд takeAwayOrder
const statusOrder = require('./orderStatusRouter') //Подключение файла с маршрутами по работе с бд statusOrder
const dishType = require('./dishTypesRouter') //Подключение файла с маршрутами по работе с бд dishtypes
const dish = require('./dishRouter') //Подключение файла с маршрутами по работе с бд dish
const order = require('./orderRouter') //Подключение файла с маршрутами по работе с бд order

//роуты(пути, по которым выполняются запросы на сервер)
router.use('/statusorder', statusOrder) //Подключение к приложение пути и функции по работе с маршрутами
router.use('/order/archive', orderArchive) //Подключение к приложение пути и функции по работе с маршрутами
router.use('/orderinthehall', orderInTheHall) //Подключение к приложение пути и функции по работе с маршрутами
router.use('/takeawayorder', takeAwayOrder) //Подключение к приложение пути и функции по работе с маршрутами
router.use('/dish/type', dishType) //Подключение к приложение пути и функции по работе с маршрутами
router.use('/dish', dish) //Подключение к приложение пути и функции по работе с маршрутами
router.use('/order', order) //Подключение к приложение пути и функции по работе с маршрутами

module.exports = router