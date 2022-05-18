const { Order, OrderDishes, OrderArchive, Dish } = require('../models/models'); //Вытаскиваем нужные таблицы из бд

class OrderController { //Класс по работе с заказами
    async create(req, res) { //Метод класса по созданию заказа
        try {
            const { statusOrderId, amountOfCost, dishes } = req.body; //Получаем из запроса нужные данные и заносим их в переменные
            const order = await Order.create({ statusOrderId, amountOfCost }); //Создаем заказ в бд
            dishes.forEach((dish) => {
                OrderDishes.create({ dishId: dish, orderId: order.id }); //В промежуточную таблицу добавляем блюда из заказа
            });
            await OrderArchive.create({ orderId: order.id }); //Отправляем заказ в архив
            const newOrder = await Order.findOne({ //Получае заказ с блюдами данного заказа
                where: { id: order.id },
                include: {
                    model: OrderDishes,
                    attributes: ['id'],
                    include: {
                        model: Dish,
                    },
                },
            });
            return res.json(newOrder); //Возвращаем заказ на клиент
        } catch (e) {
            return res.status(500).json({ message: 'Server error' }); //В случае ошибки возвращаем на клиент ошибку
        }
    }

    async update(req, res) { //Метод класса по изменению заказа
        try {
            const { id, statusOrderId } = req.body; //Получаем данные из запроса
            const order = await Order.findOne({ //Находим нужный заказ для изменения в бд
                where: { id },
                include: {
                    model: OrderDishes,
                    attributes: ['id'],
                    include: {
                        model: Dish,
                    },
                },
            });
            if (statusOrderId) { //Меняем заказ новыми данными
                order.update({ 
                    statusOrderId,
                });
                return res.json(order); //Возвращаем на клиент новый заказ
            }
        } catch (e) {
            return res.status(500).json({ message: 'Server error' }); //В случае ошибки возвращаем на клиент ошибку
        }
    }

    async getAll(req, res) { 
        try {
            const { sort } = req.query; //Вытаскиваем query параметр запроса для сортировки
            let orders; //Создаем переменную в которую будем заносить заказы
            if (sort == 'date') { //Если в запросе date, то получаем заказы из бд по сортировке даты создания
                orders = await Order.findAll({ //Поиск в бд заказов
                    include: {
                        model: OrderDishes,
                        attributes: ['id'],
                        include: {
                            model: Dish,
                        },
                    },
                    order: [['dateOfCreation', 'DESC']],
                });
                return res.json(orders); //Возвращаем заказы на клиент
            }
            if (sort == 'status') { //Если в запросе status, то получаем заказы из бд по сортировке статуса заказа
                orders = await Order.findAll({ //Поиск в бд заказов
                    include: {
                        model: OrderDishes,
                        attributes: ['id'],
                        include: {
                            model: Dish,
                        },
                    },
                    order: [['statusOrderId', 'ASC']],
                });
                return res.json(orders); //Возвращаем заказы на клиент
            }
            orders = await Order.findAll({ //Если параметр не был указан, то получаем заказы по умолчанию
                include: {
                    model: OrderDishes,
                    attributes: ['id'],
                    include: {
                        model: Dish,
                    },
                },
                order: [['id', 'DESC']],
            });
            return res.json(orders); //Возвращаем заказы на клиент
        } catch (e) {
            return res.status(500).json({ message: 'Server error' }); //В случае ошибки возвращаем на клиент ошибку
        }
    }

    async deleteDish(req, res) { //Метод класса для удаления блюда из заказа
        try {
            const { id } = req.params; //Получаем айди блюда, которое нужно удалить из промежуточной таблицы
            const orderDishes = await OrderDishes.findOne({ where: { id } }); //Находим запись из промежуточной таблицы
            if (!orderDishes) { //Если не нашли, то отправляем ошибку на клиент
                return res.status(400).json({ message: 'Server error' });
            }
            const orderId = orderDishes.orderId; //Из промежуточной таблицы получаем айди заказа
            const dishId = orderDishes.dishId; //Из промежуточной таблицы получаем айди блюда
            const dish = await Dish.findOne({ where: { id: dishId } }); //Получаем нужное блюдо из бд
            await orderDishes.destroy(); //Удаляем блюдо из заказа
            const order = await Order.findOne({ //Находим новый заказ без данного блюда
                where: { id: orderId },
                include: {
                    model: OrderDishes,
                    attributes: ['id'],
                    include: {
                        model: Dish,
                    },
                },
            });
            await order.update({ //Меняем цену заказа
                amountOfCost: order.amountOfCost - dish.cost, //Общая цена заказа минус цена блюда
            });
            return res.json(order); //Возвращаем измененый заказ на сервер
        } catch (e) {
            return res.status(500).json({ message: 'Server error' }); //В случае ошибки возвращаем на клиент ошибку
        }
    }

    async addDishToOrder(req, res) { //Метод класса по добавлению блюда в заказ
        try {
            const { id, dishId } = req.body; //Получаем нужные данные из запроса
            const orderDish = await OrderDishes.create({ orderId: id, dishId }); //Создаем новое блюдо к заказу в промежуточной таблице
            const dish = await Dish.findOne({ where: { id: dishId } }); //Находим блюдо, которое нужно добавить к заказу из бд
            const order = await Order.findOne({ //Находим обновленный заказ с новым блюдо из бд
                where: { id },
                include: {
                    model: OrderDishes,
                    attributes: ['id'],
                    include: {
                        model: Dish,
                    },
                },
            });
            await order.update({ //Меняем цену заказа
                amountOfCost: +order.amountOfCost + +dish.cost, //Общая стоимость заказа плюс стоимость блюда
            });
            return res.json(order); // Возвращаем заказ на клиент
        } catch (e) {
            return res.status(500).json({ message: 'Server error' }); //В случае ошибки возвращаем на клиент ошибку
        }
    }
}

module.exports = new OrderController(); //Экспорт класса
