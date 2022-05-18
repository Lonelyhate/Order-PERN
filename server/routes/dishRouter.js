const Router = require('express') //Подключние класса фреймоврка
const router = new Router() //Занесение класса в переменную для читабельности 
const dishController = require('../controllers/dishController') //Подключение класса по работе с dish

router.get('/', dishController.getAll) //get запрос по получение блюд, метод класса для работы с данным машрутом
router.post('/', dishController.create) //post запрос для создание блюда, метод класса для работы с данным маршрутом
router.put('/', dishController.update) //put запрос для изменения блюд, метод класса для работы с данным маршрутом
router.delete('/:id', dishController.delete) //delete запрос для удаления блюда, метод класса для работы с данным маршрутом

module.exports = router