const {TakeAwayOrder} = require('../models/models') //Импорт таблицы

//Класс с методами по работе с путем "Заказ с собой"
class TakeAwayOrderContrtoller {
    //Асинхронный метод на создание записи в таблице
    async create(req, res) {
        //Отлов ошибок
        try{
            const {orderId, prepareFor} = req.body //Вытаскиваем данные из запроса
            const takeAwayOrder = await TakeAwayOrder.create({orderId, prepareFor}) //Создание новой записи в бд
            return res.json(takeAwayOrder) //Возвращаем на клиент созданную запись
        } catch(e) {
            //В случае ошибки возвращаем на клиент ответ с ошибкой
            return res.status(500).json({message: 'Server error'})
        }
    }

    //Асинхронный метод на обновление записей
    async update(req, res) {
        //Отлов ошибок
        try{

        } catch(e) {
            //В случае ошибки возвращаем на клиент ответ с ошибкой
            return res.status(500).json({message: 'Server error'})
        }
    }

    //Асинхронный метод на удаление записи из бд
    async delete(req, res) {
        //Отлов ошибок
        try{

        } catch(e) {
            //В случае ошибки возвращаем на клиент ответ с ошибкой
            return res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = new TakeAwayOrderContrtoller() //экспорт экземпляра класса