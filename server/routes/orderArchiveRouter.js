const Router = require('express') //Подключние класса фреймоврка
const router = new Router() //Занесение класса в переменную для читабельности
const orderArchiveController = require('../controllers/orderArchiveController'); //Подключение класса по работе с dishTypes

router.get('/', orderArchiveController.getAll); //get запрос для получения заказов, подключение метода класса по получение заказов

module.exports = router;
