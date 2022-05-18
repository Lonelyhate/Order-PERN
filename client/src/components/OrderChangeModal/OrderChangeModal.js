import React, { useState } from 'react';
import './OrderChangeModal.scss';
import { ImCross } from 'react-icons/im';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { orderUpdate } from '../../redux/action/orders';

const OrderChangeModal = ({ statuses, idOrder, visibility, setVisable }) => {
    const dispatch = useDispatch();
    const [orderIdCurrent, setOrderIdCurrent] = useState(statuses[0].id);

    const closeModal = () => {
        setVisable(false);
        setOrderIdCurrent(statuses[0].id);
    };

    const updateStatus = () => {
        closeModal()
        dispatch(orderUpdate(idOrder, orderIdCurrent));
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
                    <span>Выберите статус</span>
                    <select
                        value={orderIdCurrent}
                        onChange={(e) => setOrderIdCurrent(e.target.value)}>
                        {statuses.map((item) => (
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

export default OrderChangeModal;
