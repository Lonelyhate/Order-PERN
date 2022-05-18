import React, { useState } from 'react';
import './OrderDishAdd.scss';
import { ImCross } from 'react-icons/im';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { orderDishAdd } from '../../redux/action/orders';

const OrderDishAdd = ({ idOrder, visibility, setVisable, dishes }) => {
    const dispatch = useDispatch();
    const [dishIdCurrent, setDishIdCurrent] = useState(dishes[0].id);

    const closeModal = () => {
        setVisable(false);
        setDishIdCurrent(dishes[0].id);
    };

    const updateStatus = () => {
        closeModal();
        dispatch(orderDishAdd(idOrder, dishIdCurrent));
    };

    return (
        <div
            onClick={closeModal}
            className={cn('order-change-modal', {
                active: visibility,
            })}>
            <div onClick={(e) => e.stopPropagation()} className="order-change-modal__content">
                <div className="order-change-modal__header">
                    <h2 className="order-change-modal__title">Изменить статус</h2>
                    <ImCross onClick={closeModal} />
                </div>
                <label className="order-change-modal__label">
                    <span>Выберите блюдо</span>
                    <select
                        value={dishIdCurrent}
                        onChange={(e) => setDishIdCurrent(e.target.value)}>
                        {dishes.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button onClick={updateStatus} className="order-change-modal__btn">
                    Подтвердить
                </button>
            </div>
        </div>
    );
};

export default OrderDishAdd;
