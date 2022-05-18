require('dotenv').config(); //Подключенный файла для глобальных статичных переменных
const express = require('express'); //Подключение фреймоворка для работы с hhtp модулями
const sequelize = require('./db'); //Подключение модели
const models = require('./models/models') //Подключение таблиц бд
const cors = require('cors') //Подключения пакета для того, чтобы можно было отправлять запросы со стороны клиента
const router = require('./routes/index') //Подключение путей, по которым будет обращение на сервер идти

const PORT = process.env.PORT || 5001; //Порт локального сервера

const app = express(); //занесение функции в переменную
app.use(cors()) //добавление функции по работе корса в сервеное приложение
app.use(express.json()) //Для того, чтобы сервер понимал json данные
app.use('/api', router) //Подключение роутов к приложению

//Функцию по запуску приложения
const start = async () => {
    try {
        //Подключение бд к серверу
        await sequelize.authenticate()
        await sequelize.sync()
        //Запуск приложения
        app.listen(PORT, () => console.log(`Server svtarted on port ${PORT}`));
    } catch (e) {
        //При возниконовения ошибок
        console.log(e);
    }
};

start()