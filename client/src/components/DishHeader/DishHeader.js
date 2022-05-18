import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypesDish, setActiveTypeDish } from '../../redux/action/typeDish';
import './DishHeader.scss';
import cn from 'classnames';
import { AiFillPlusCircle } from 'react-icons/ai';

const DishHeader = ({setVisable}) => {
    const dispatch = useDispatch();
    const typesDish = useSelector((state) => state.typeDishReducer.typesDish);
    const activeTypeDish = useSelector((state) => state.typeDishReducer.activeDish);

    useEffect(() => {
        dispatch(getTypesDish());
    }, []);

    const setActiveTypeDishHandler = (id) => {
        dispatch(setActiveTypeDish(id));
    };
    return (
        <div className="dish-header">
            <ul className="dish-header__list">
                <li className="dish-header__item">
                    <button
                        onClick={() => dispatch(setActiveTypeDish(0))}
                        className={cn('dish-header__btn', {
                            active: activeTypeDish === 0,
                        })}>
                        Все
                    </button>
                </li>
                {typesDish.map((type) => (
                    <li key={type.id} className="dish-header__item">
                        <button
                            onClick={() => setActiveTypeDishHandler(type.id)}
                            className={cn('dish-header__btn', {
                                active: type.id === activeTypeDish,
                            })}>
                            {type.name}
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={() => setVisable(true)} className="dish-header__add">
                <AiFillPlusCircle /> Добавить блюдо
            </button>
        </div>
    );
};

export default DishHeader;
