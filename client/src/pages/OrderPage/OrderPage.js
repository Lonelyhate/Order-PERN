import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrderPage.scss';
import { AiFillPlusCircle } from 'react-icons/ai';
import OrderAddModal from '../../components/OrderAddModal/OrderAddModal';
import { useDispatch, useSelector } from 'react-redux';
import { getDishes } from '../../redux/action/dish';
import { statusOrderGet } from '../../redux/action/statusOrder';
import { getDate } from '../../functions/getDate';
import { getOrders } from '../../redux/action/orders';
import OrderItem from '../../components/OrderItem/OrderItem';
import { getTypesDish } from '../../redux/action/typeDish';
import cn from 'classnames';

const OrderPage = () => {
    const dispatch = useDispatch();
    const dishes = useSelector((state) => state.dishReducer.dishes);
    const statuses = useSelector((state) => state.statusOrderReducer.statuses);
    const orders = useSelector((state) => state.ordersReducer.orders);
    const loading = useSelector((state) => state.ordersReducer.loading);
    const [visableModal, setVisableModal] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const sortsBtns = [
        {
            name: 'По умолчанию',
            sort: null,
        },
        {
            name: 'По дате создания',
            sort: 'date',
        },
        {
            name: 'По статусу',
            sort: 'status',
        },
    ];
    const [sortCurrent, setSortCurrent] = useState(null);

    useEffect(() => {
        dispatch(getDishes(0));
        dispatch(statusOrderGet());
        dispatch(getOrders(sortCurrent));
        dispatch(getTypesDish());
    }, [sortCurrent]);

    const openModal = () => {
        setCurrentDate(getDate());
        setVisableModal(true);
    };

    const handlerSort = (sort) => {
        setSortCurrent(sort);
    };

    return (
        <div className="order-page">
            <div className="container">
                <Link className="order-page__back" to="/">
                    Назад
                </Link>
                <h2 className="order-page__title">Заказы</h2>
                <div className="order-page__header">
                    <button onClick={openModal} className="order-page__add">
                        <AiFillPlusCircle /> Добавить заказ
                    </button>
                    <div className="order-page__sort">
                        <span className="order-page__sort-title">Сортировка: </span>
                        {sortsBtns.map((item) => (
                            <button
                                key={item.name}
                                onClick={(e) => handlerSort(item.sort)}
                                className={cn('order-page__sort-btn', {
                                    active: sortCurrent == item.sort,
                                })}>
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="order-page__content order-content">
                    <div className="order-content__header">
                        <span className="order-content__chapter">Номер заказа</span>
                        <span className="order-content__chapter">Общая стоимость</span>
                        <span className="order-content__chapter">Статус заказа</span>
                        <span className="order-content__chapter">Дата заказа</span>
                    </div>
                    <ul className="order-content__list">
                        {orders.length > 0 && statuses.length > 0 && !loading ? (
                            orders.map((item) => <OrderItem key={item.id} item={item} />)
                        ) : (
                            <div className="lds-facebook">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
            {dishes.length > 0 && statuses.length > 0 && (
                <OrderAddModal
                    date={currentDate}
                    statuses={statuses}
                    dishes={dishes}
                    visable={visableModal}
                    setVisable={setVisableModal}
                />
            )}
        </div>
    );
};

export default OrderPage;
