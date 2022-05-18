import React, { useState } from 'react';
import './DishChangeModal.scss';
import { ImCross } from 'react-icons/im';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { dishChange } from '../../redux/action/dish';

const DishChangeModal = ({ visable, setVisable, data, setData, method, id }) => {
    const dispatch = useDispatch()

    const sendForChangeData = () => {
        if(method == 'name') {
            dispatch(dishChange(id, data))
        }
        if(method == 'weight') {
            dispatch(dishChange(id, null, null, data))
        }
        if(method == 'cost') {
            dispatch(dishChange(id, null, data))
        }
        setVisable(false)
        setData('')
    }

    const closeModal = () => {
        setVisable(false)
        setData('')
    }
    
    return (
        <div onClick={closeModal}
            className={cn('dish-change-modal', {
                active: visable,
            })}>
            <div onClick={e => e.stopPropagation()} className="dish-change-modal__content">
                <div className="dish-change-modal__header">
                    <h3 className="dish-change-modal__title">Изменить</h3>
                    <ImCross onClick={closeModal} />
                </div>
                <input
                    placeholder="Введите новое значение..."
                    type="text"
                    className="dish-change-modal__input"
                    value={data}
                    onChange={e => setData(e.target.value)}
                />
                <button onClick={sendForChangeData} className="dish-change-modal__btn">Подтвердить</button>
            </div>
        </div>
    );
};

export default DishChangeModal;
