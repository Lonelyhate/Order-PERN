const Router = require('express')
const router = new Router()
const takeAwayOrderController = require('../controllers/takeAwayOrderController') //Импорт методов для роутов

//Методы роутов(запросы)
router.post('/', takeAwayOrderController.create) //Запрос на создание
router.put('/', takeAwayOrderController.update) //Запрос на изменение
router.delete('/:id', takeAwayOrderController.delete) //Запрос на удаление

module.exports = router //экспорт роута