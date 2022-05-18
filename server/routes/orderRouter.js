const Router = require('express') //Подключние класса фреймоврка
const router = new Router() //Занесение класса в переменную для читабельности
const orderController = require('../controllers/orderController') //Подключение класса по работе с dishTypes

router.post('/', orderController.create) //post запрос для создание заказа, подключение метода класса для работы с данным маршрутом
router.put('/', orderController.update) //put запрос для изменений заказов, подключение метода класса для работы с данным маршрутом
router.get('/', orderController.getAll) //get запрос для получение заказов, подключение метода класса для работы с данным маршрутом
router.delete('/dish/:id', orderController.deleteDish) //delete запрос для удаление блюд из заказа, подключение метода класса для работы с данным маршрутом
router.post('/dish', orderController.addDishToOrder) //post запрос для добавление блюда в заказ, подключение метода класса для работы с данным маршрутом

module.exports = router