import React, { useState } from 'react';
import './OrderItem.scss';
import { MdDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import OrderChangeModal from '../OrderChangeModal/OrderChangeModal';
import { orderDeleteDish } from '../../redux/action/orders';
import DishAddModal from '../DishAddModal/DishAddModal';
import OrderDishAdd from '../OrderDishAdd/OrderDishAdd';

const OrderItem = ({ item }) => {
    const dispatch = useDispatch();
    const statuses = useSelector((state) => state.statusOrderReducer.statuses);
    const typesDish = useSelector((state) => state.typeDishReducer.typesDish);
    const dishes = useSelector((state => state.dishReducer.dishes))
    const statusName = statuses.find((el) => el.id == item.statusOrderId);
    let dishesObj = item.order_dishes.map((e) => e);
    const [visabaleDishes, setVisableDishes] = useState(false);
    const [visableModal, setViableModal] = useState(false);
    const [visableModalAddDish, setVisableModalAddDish] = useState(false);

    const deleteDishFromOrder = (id) => {
        dispatch(orderDeleteDish(id));
    };

    const openModalAddDish = () => {
        setVisableModalAddDish(true);
    };

    return (
        <li className="order-item">
            <article className="order-item__content">
                <span className="order-item__name">{item.id}</span>
                <span className="order-item__name">{item.amountOfCost}</span>
                <span className="order-item__name">
                    {statusName.name} {<AiOutlineEdit onClick={(e) => setViableModal(true)} />}
                </span>
                <span className="order-item__name">{item.dateOfCreation.slice(0, 16)}</span>
                <span
                    onClick={(e) => setVisableDishes(!visabaleDishes)}
                    className="order-item__name">
                    Блюда
                </span>
            </article>
            <div
                className={cn('order-item__dishes order-dish', {
                    active: visabaleDishes,
                })}>
                <h4 className="order-dish__title">Блюда</h4>
                <div className="order-dish__header">
                    <span className="order-dish__chapter">Название</span>
                    <span className="order-dish__chapter">Цена</span>
                    <span className="order-dish__chapter">Тип</span>
                    <span className="order-dish__chapter">Вес</span>
                </div>
                <ul className="order-dish__list">
                    {typesDish.length > 0 &&
                        dishesObj.map((obj) => (
                            <li key={obj.id} className="order-dish__item">
                                <span className="order-dish__name">{obj.dish.name}</span>
                                <span className="order-dish__name">{obj.dish.cost} руб.</span>
                                <span className="order-dish__name">
                                    {typesDish.find((el) => el.id == obj.dish.dishTypeId).name}
                                </span>
                                <span className="order-dish__name">{obj.dish.weight}(г/мл)</span>
                                <span className="order-dish__name">
                                    <MdDelete onClick={(e) => deleteDishFromOrder(obj.id)} />
                                </span>
                            </li>
                        ))}
                    <button onClick={openModalAddDish} className="order-dish__add-dish">
                        Добавить блюдо
                    </button>
                </ul>
            </div>
            <OrderChangeModal
                statuses={statuses}
                idOrder={item.id}
                visibility={visableModal}
                setVisable={setViableModal}
            />
            {dishes.length > 0 && (
                <OrderDishAdd
                    idOrder={item.id}
                    dishes={dishes}
                    setVisable={setVisableModalAddDish}
                    visibility={visableModalAddDish}
                />
            )}
        </li>
    );
};

export default OrderItem;
