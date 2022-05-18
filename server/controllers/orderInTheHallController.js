const { OrderInTheHall } = require('../models/models'); //Импорт таблицы

//Класс с методами по работе с путем "Заказ в зал"
class OrderInTheHallController {
    //асинхронный метод для добавление
    async create(req, res) {
        //Для отлова ошибок
        try {
            const { numberTable, orderId } = req.body; //Достаем данные из запроса
            const orderInTheHall = await OrderInTheHall.create({ numberTable, orderId }); //Создание записи в таблице
            return res.json(orderInTheHall); //В ответ с сервера отправляем созданую запись
        } catch (e) {
            //в случае ошибки возвращаем ответ с ошибкой
            console.log(e)
            return res.status(500).json({ message: 'Server error' });
        }
    }

    //Асинхронный метод для изменения
    async update(req, res) {
        //Для отлова ошибок
        try {
            const { id, numberTable, orderId } = req.body; //Достаем данные из запроса
            const orderInTheHall = await OrderInTheHall.findOne({ where: { id } }); //Поиск записи в бд
            //Проверка на то, что если данная запись не найдена, то возваращем ответ об ошибке "Заказ в зале не найден"
            if (!orderInTheHall) {
                return res.status(400).json({ message: 'Order in the hall not found' });
            }

            //Проверки на то, какие поля нужны изменить
            if (numberTable && !orderId) {
                await orderInTheHall.update({ numberTable }); //Изменение записи
                return res.json(orderInTheHall); //Возвращаение новой записи
            }
            if (!numberTable && orderId) {
                await orderInTheHall.update({ orderId }); //Изменение записи
                return res.json(orderInTheHall); //Возвращаение новой записи
            }
            if (numberTable && orderId) {
                await orderInTheHall.update({ orderId, numberTable }); //Изменение записи
                return res.json(orderInTheHall); //Возвращаение новой записи
            }
        } catch (e) {
            //в случае ошибки возвращаем ответ с ошибкой
            return res.status(500).json({ message: 'Server error' });
        }
    }

    //Асинхронный метод для удаления
    async delete(req, res) {
        //Для отлова ошибок
        try {
            const { id } = req.params; //Достаем id нужного заказа для удаления
            const orderInTheHall = await OrderInTheHall.findOne({ where: { id } }); //Поиск записи в бд
            //Проверка на то, что если запись не найдена
            if(!orderInTheHall) {
                return res.status(400).json({message: 'Order in the hall not found'}) //Возвращаем на клиент ошибку о том, что запись не нашли в бд
            }
            await orderInTheHall.destroy() //Удаление записи из бд
            return res.json({message: 'Order was deleted'}) //Возвращаем успешный ответ на клиент
         } catch (e) {
            //в случае ошибки возвращаем ответ с ошибкой
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new OrderInTheHallController(); //Экспорт экземпляра класса
