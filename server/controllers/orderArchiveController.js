const { OrderArchive } = require('../models/models');//Импорт таблицы архив заказов

class orderArchiveController { //Класс по работе с архивом заказов
    async getAll(req, res) { //Метод получение заказов
        try {
            const orders = await OrderArchive.findAll(); //Поиск всех заказов из бд
            return res.json(orders); //Отдаем на клиент все заказы
        } catch (e) {
            return res.status(500).json({message: 'Server error'}) //В случае ошибки возвращаем на клиент ошибку
        }
    }
}

module.exports = new orderArchiveController(); //Экспорт класса
