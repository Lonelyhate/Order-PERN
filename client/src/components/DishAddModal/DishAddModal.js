import React, { useState } from 'react';
import './DishAddModal.scss';
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { addDish } from '../../redux/action/dish';

const DishAddModal = ({ visible, setVisable, dishTypes }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [type, setType] = useState(dishTypes[0].id);
    const [weight, setWight] = useState('');

    const closeModal = () => {
        setVisable(false);
        setName('')
        setCost('')
        setWight('')
        setType(dishTypes[0].id)
    };

    const clickDishAdd = () => {
        dispatch(addDish(name, cost, weight, type))
        setVisable(false)
        setName('')
        setCost('')
        setWight('')
        setType(dishTypes[0].id)
    }

    return (
        <div
            onClick={closeModal}
            className={cn('dish-add-modal', {
                active: visible,
            })}>
            <div onClick={(e) => e.stopPropagation()} className="dish-add-modal__content">
                <div className="dish-add-modal__header">
                    <h3 className="dish-add-modal__title">Добавление блюда</h3>
                    <button onClick={closeModal} className="dish-add-modal__close">
                        <ImCross />
                    </button>
                </div>
                <div className="dish-add-modal__middle">
                    <label className="dish-add-modal__label">
                        <span>Название</span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Введите название..."
                        />
                    </label>
                    <label className="dish-add-modal__label">
                        <span>Цена(руб)</span>
                        <input
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            type="text"
                            placeholder="Введите цену..."
                        />
                    </label>
                    <label className="dish-add-modal__label">
                        <span>Выберите тип</span>
                        <select onChange={e => setType(e.target.value)} className="dish-add-modal__select">
                            {dishTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="dish-add-modal__label">
                        <span>Вес(г/мл)</span>
                        <input value={weight} onChange={e => setWight(e.target.value)} placeholder="Введите вес..." />
                    </label>
                </div>
                <div className="dish-add-modal__btns">
                    <button onClick={closeModal} className="dish-add-modal__close-bottom">
                        Отмена
                    </button>
                    <button onClick={clickDishAdd} className="dish-add-modal__add">Добавить</button>
                </div>
            </div>
        </div>
    );
};

export default DishAddModal;
