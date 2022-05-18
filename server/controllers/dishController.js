const { Dish, DishTypes } = require('../models/models'); //Импорт нужных таблиц Блюда и типы блюд

//Класс по работу блюдами
class DishController {
    async create(req, res) { //Метод для создание блюд
        try {
            const { name, cost, weight, dishTypeId } = req.body; //Из запроса получение нужных данных и занесение их в переменные
            const dish = await Dish.create({ name, cost, weight, dishTypeId }); //Создание блюда в бд
            return res.json(dish); //Возрващаем на клиент блюдо
        } catch (e) {
            return res.status(500).json({ message: 'Server error' }); //В случае ошибки отправляе мна клиент ошибку
        }
    }

    async getAll(req, res) { //Метод класса по получению блюд
        try {
            const { dishTypeId } = req.query; //При фильтрации по типу блюда в query параметры получаем нужный айди для фильтрации
            let dishes; //создание переменной, в которую занесем блюда
            if(dishTypeId) { //если есть фильтрация, то попадаем в блок
                dishes = await Dish.findAll({where: {dishTypeId}}) //Получение только тех блюд, которые запросили на клиенте из query параметров
                return res.json(dishes) //Возрващаем на клиент нужные блюда
            }
            dishes = await Dish.findAll({ //Иначе просто получаем все блюда, если не передали фильтрацию
                order: [['id', "DESC"]] //Сортируем по последнему созданному
            })
            return res.json(dishes) //Возвращаем блюда
        } catch (e) {
            return res.status(500).json({ message: 'Server error' }); //На клиент отправляем ошибку в случае ошибки
        }
    }

    async update(req, res) { //Метод по изменению блюд
        try {
            const {id, name, cost, weight} = req.body //Вытаскиваем нужные поля для которых нужно изменить поля 
            const dish = await Dish.findOne({where: {id}}) //ищем блюдо в бд , которое нужно изменить
            if(!dish) { //Если не найдено блюдо, то возвращаем ошибку о том, что такого блюда нет
                return res.status(400).json({message: 'Dish not found'})
            }
            if(name) { //Если запрос на изменение Название блюда, то попадаем в этот блок, меняем название блюда и завершаем метод
                await dish.update({name}) //Обновление записи
                return res.json(dish) //Возвращаем на клиент новую запись
            }
            if(cost) { //Если запрос на изменение цены блюда, то попадаем в этот блок, меняем название блюда и завершаем метод
                await dish.update({cost}) //Обновление записи
                return res.json(dish) //Возвращаем на клиент новую запись
            }
            if(weight) { //Если запрос на изменение веса блюда, то попадаем в этот блок, меняем название блюда и завершаем метод
                await dish.update({weight}) //Обновление записи
                return res.json(dish) //Возвращаем на клиент новую запись
            }
        } catch (e) {
            return res.status(500).json({ message: 'Server error' }); //В случае ошибки возвращаем на клиент ошибку
        }
    }

    async delete(req, res) { //Метод класса для удаление блюда
        try {
            const {id} = req.params //Из запроса получаем айди, по которому удалим нужную запись из бд
            const dish = await Dish.findOne({where: {id}}) //ищем блюдо в бд , которое нужно удалить
            if(!dish) { //Если не найдено блюдо, то возвращаем ошибку о том, что такого блюда нет
                res.status(400).json({message: 'Dish not found'})
            }
            await dish.destroy() //Удалем блюдо из бд
            return res.json({message: 'Dish was deleted'}) //Возвращаем на клиент сообщение, что блюдо удалено
        } catch (e) {
            return res.status(500).json({ message: 'Server error' }); //В случае ошибки возвращаем на клиент ошибку
        }
    }
}

module.exports = new DishController(); //Экспорт класса
