const Router = require('express') //Подключние класса фреймоврка
const router = new Router() //Занесение класса в переменную для читабельности
const statusOrderController = require('../controllers/orderStatusController') //Подключение класса по работе с dishTypes

router.post('/', statusOrderController.create) //post запрос для создание статуса заказа, подключение метода класса для работы с данным маршрутом
router.get('/', statusOrderController.getAll) //post запрос для получение статусов заказа, подключение метода класса для работы с данным маршрутом

module.exports = router