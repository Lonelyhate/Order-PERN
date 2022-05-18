import React, { useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import './OrderAddModal.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../redux/action/orders';
import axios from 'axios';
import DishChangeModal from '../DishChangeModal/DishChangeModal';

const OrderAddModal = ({ visable, setVisable, dishes, statuses, date }) => {
    const dispatch = useDispatch();
    const [dishesList, setDishesList] = useState([]);
    const [currentDish, setCurrentDish] = useState(dishes[0].id);
    const [costAll, setCostAll] = useState(0);
    const [status, setStatus] = useState(statuses[0].id);
    const [dishesId, setDishesId] = useState([]);
    const [typeOrder, setTypeOrder] = useState(null);
    const [numberOfTable, setNumberOfTable] = useState('');
    const [dateForOrder, setDateForOrder] = useState(Date.now());

    const closeModal = () => {
        setVisable(false);
        setDishesId([]);
        setCostAll(0);
        setDishesList([]);
        setVisable(false);
        setTypeOrder(null)
    };

    const onClickToDishList = () => {
        const newDish = dishes.find((item) => item.id == currentDish);
        setDishesList([...dishesList, newDish]);
        setCostAll(costAll + +newDish.cost);
        setDishesId([...dishesId, +currentDish]);
    };

    const addOrder = () => {
        dispatch(createOrder(status, costAll, dishesId, typeOrder, dateForOrder, numberOfTable));
        setDishesId([]);
        setCostAll(0);
        setDishesList([]);
        setVisable(false);
        setTypeOrder(null)
    };

    return (
        <div
            onClick={closeModal}
            className={cn('order-add-modal', {
                active: visable,
            })}>
            <div onClick={(e) => e.stopPropagation()} className="order-add-modal__content">
                <div className="order-add-modal__header">
                    <h2 className="order-add-modal__title">Добавить заказ</h2>
                    <ImCross onClick={closeModal} />
                </div>
                <div className="order-add-modal__middle">
                    <h3 className="order-add-modal__subtitle">Блюда</h3>
                    <ul className="order-add-modal__list">
                        {dishesList.map((item, i) => (
                            <li key={i} className="order-add-modal__dish">
                                <h4 className="order-add-modal__name-dish">{item.name}</h4>
                                <span className="order-add-modal__price-dish">
                                    {item.cost} руб.
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="order-add-modal__add-dish">
                        <select
                            value={currentDish}
                            onChange={(e) => setCurrentDish(+e.target.value)}
                            className="order-add-modal__select">
                            {dishes.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                    className="order-add-modal__option">
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <button onClick={onClickToDishList} className="order-add-modal__add-btn">
                            Добавить блюдо
                        </button>
                        <h3 className="order-add-modal__subtitle">Статус заказа</h3>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="order-add-modal__select">
                            {statuses.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                    className="order-add-modal__option">
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <h3 className="order-add-modal__subtitle">Тип заказа</h3>
                        <div className="order-add-modal__type-order">
                            <button
                                onClick={(e) => setTypeOrder(0)}
                                className={cn('order-add-modal__type-btn', {
                                    active: 0 === typeOrder,
                                })}>
                                В зале
                            </button>
                            <button
                                onClick={(e) => setTypeOrder(1)}
                                className={cn('order-add-modal__type-btn', {
                                    active: 1 === typeOrder,
                                })}>
                                С собой
                            </button>
                            {typeOrder == 0 && (
                                <div className="order-add-modal__hall">
                                    <label className="order-add-modal__label">
                                        <span>Введите номер стола</span>
                                        <input
                                            value={numberOfTable}
                                            onChange={(e) => setNumberOfTable(+e.target.value)}
                                            type="number"
                                            placeholder="Введите номер стола..."
                                        />
                                    </label>
                                </div>
                            )}
                            {typeOrder == 1 && (
                                <div className="order-add-modal__hall">
                                    <label className="order-add-modal__label">
                                        <span>К какому времени будет готово:</span>
                                        <input
                                            value={dateForOrder}
                                            onChange={(e) => setDateForOrder(e.target.value)}
                                            type="datetime-local"
                                            placeholder="Введите номер стола..."
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="order-add-modal__bottom order-bottom">
                    <div className="order-bottom__total">
                        <span className="order-bottom__name">Общая стоимость заказа</span>
                        <span className="order-bottom__total-price">{costAll} руб.</span>
                    </div>
                    <div className="order-bottom__date">
                        <span className="order-bottom__name">Дата заказа</span>
                        <span className="order-bottom__total-price">{date}</span>
                    </div>
                    <button onClick={addOrder} className="order-bottom__btn">
                        Добавить
                    </button>
                </div>
            </div>
            <DishChangeModal  />
        </div>
    );
};

export default OrderAddModal;
