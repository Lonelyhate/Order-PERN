const Router = require('express') //Подключние класса фреймоврка
const router = new Router() //Занесение класса в переменную для читабельности
const orderInTheHallController = require('../controllers/orderInTheHallController') //Подключение класса по работе с dishTypes

//Методы роутов(запросы)
router.post('/', orderInTheHallController.create) //Запрос на создание
router.put('/', orderInTheHallController.update) //Запрос на изменение
router.delete('/:id', orderInTheHallController.delete) //Запрос на удаление

module.exports = router //экспорт роута