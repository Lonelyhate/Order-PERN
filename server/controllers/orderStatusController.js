const {StatusOrder} = require('../models/models') //Импорт нужной таблицы из бд

class StatusOrderController { //Класс по работе со статусами заказа
    async create(req, res) { //Метод класса создание статуса заказа
        try {
            const {name} = req.body //Получаем название статуса из запроса
            const statusOrder = await StatusOrder.create({name}) //Создаем статус
            return res.json(statusOrder) //Возрващаем статус созданный на клиент
        } catch(e) {
            res.status(500).json({message: 'Server error'}) //В случае ошибки возвращаем на клиент ошибку
        }
    }

    async getAll(req, res) { //Метод класса по получению статусов заказа
        try {
            const statusOrdersChek = await StatusOrder.findAll() //Проверка есть ли в бд статические данные
            if(!statusOrdersChek) { //Если статики не найдено, то создаем
                await StatusOrder.create({name: 'Выполняется'})
                await StatusOrder.create({name: 'Выполнен'})
                await StatusOrder.create({name: 'Отменен'})
            }
            const statusOrders = await StatusOrder.findAll() //Получаем все методы заказа 
            return res.json(statusOrders) //Возвращаем на клиент все методы заказа
        } catch(e) {
            res.status(500).json({message: 'Server error'}) //В случае ошибки возвращаем на клиент ошибку
        }
    }
}

module.exports = new StatusOrderController() //Экспорт класса