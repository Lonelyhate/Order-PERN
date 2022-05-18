const {DishTypes} = require('../models/models') //Импорт нужны таблиц из бд

class DishTypesController { //Класс по работе с данными DishTypes
    async create(req, res) { //Метод класса по созданию типа блюда
        try {
            const {name} = req.body //Вытаскиваем название типа из запроса
            const dishType = await DishTypes.create({name}) //Создание типа блюда в таблице
            return res.json(dishType) //Возрващаем созданный тип блюда на клиент
        } catch(e) {
            return res.status(500).json({message: 'Server error'}) //В случае ошибки возвращаем на клиент ошибку
        }
    }

    async get(req, res) { //Метод класса по получение типов блюд
        try {
            const dishTypesChek = await DishTypes.findAll() //Проверка на статические данные
            if(dishTypesChek.length === 0) { //Если нет типов блюд, то создаются статические данные
                await DishTypes.create({name: 'Напиток'})
                await DishTypes.create({name: 'Салат'})
                await DishTypes.create({name: 'Десерт'})
                await DishTypes.create({name: 'Основное блюдо'})
            }
            const dishTypes = await DishTypes.findAll() //Получение всех типов блюд из таблицы
            return res.json(dishTypes) //Возвращаем на клиент типы блюд
        } catch(e) {
            return res.status(500).json({message: 'Server error'}) //В случае ошибки возвращаем на клиент ошибку
        }
    }
}

module.exports = new DishTypesController() //Экпорт класса 