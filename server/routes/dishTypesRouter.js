const Router = require('express') //Подключние класса фреймоврка
const router = new Router() //Занесение класса в переменную для читабельности 
const dishTypes = require('../controllers/dishTypesController') //Подключение класса по работе с dishTypes

router.post('/', dishTypes.create) //post запрос для создание типа, передача метода класса для работы данного маршрута
router.get('/', dishTypes.get) //get запрос получение типов, передача метода класса для работы данного маршрута

module.exports = router