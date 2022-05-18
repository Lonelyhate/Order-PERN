const sequelize = require('../db');
const { DataTypes } = require('sequelize');

//Создание таблиц
const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amountOfCost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    dateOfCreation: { type: DataTypes.DATE, defaultValue: Date.now() },
});

const StatusOrder = sequelize.define('status_order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const OrderArchive = sequelize.define('order_archive', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Dish = sequelize.define('dish', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    weight: { type: DataTypes.INTEGER, allowNull: false },
});

const OrderInTheHall = sequelize.define('order_in_the_hall', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    numberTable: { type: DataTypes.INTEGER, allowNull: false },
});

const TakeAwayOrder = sequelize.define('take_away_order', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    prepareFor: { type: DataTypes.DATE, allowNull: false },
});

const DishTypes = sequelize.define('dish_types', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: null },
});

const OrderDishes = sequelize.define('order_dishes', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
})

//Создание связей
StatusOrder.hasMany(Order);
Order.belongsTo(StatusOrder);

Order.hasMany(OrderArchive);
OrderArchive.belongsTo(Order);

Order.hasMany(OrderInTheHall);
OrderInTheHall.belongsTo(Order);

Order.hasMany(TakeAwayOrder);
TakeAwayOrder.belongsTo(Order);

DishTypes.hasMany(Dish);
Dish.belongsTo(DishTypes);

Order.hasMany(OrderDishes)
OrderDishes.belongsTo(Order)

Dish.hasMany(OrderDishes)
OrderDishes.belongsTo(Dish)

//Импорт таблиц
module.exports = {
    Order,
    Dish,
    OrderArchive,
    OrderInTheHall,
    TakeAwayOrder,
    StatusOrder,
    DishTypes,
    OrderDishes
};
