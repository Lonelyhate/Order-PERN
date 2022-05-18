import React, { useEffect, useState } from 'react';
import DishHeader from '../../components/DishHeader/DishHeader';
import './DishPage.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDishes } from '../../redux/action/dish';
import DishItem from '../../components/DishItem/DishItem';
import DishAddModal from '../../components/DishAddModal/DishAddModal';

const DishPage = () => {
    const dispatch = useDispatch();
    const dishes = useSelector((state) => state.dishReducer.dishes);
    const loading = useSelector((state) => state.dishReducer.loading);
    const activeTypeDish = useSelector((state) => state.typeDishReducer.activeDish);
    const dishTypes = useSelector((state) => state.typeDishReducer.typesDish);
    const [visableModal, setVisableModal] = useState(false);

    useEffect(() => {
        dispatch(getDishes(activeTypeDish));
    }, [activeTypeDish]);

    return (
        <div className="dish-page">
            <div className="container">
                <div className="dish-page__back">
                    <Link to="/">Назад</Link>
                </div>
                <h2 className="dish-page__title">Блюда</h2>
                <DishHeader setVisable={setVisableModal} />
                <div className="dish-page__content">
                    <div className="dish-page__chapter">
                        <span className="dish-page__chapter-name">Название</span>
                        <span className="dish-page__chapter-name">Цена</span>
                        <span className="dish-page__chapter-name">Тип</span>
                        <span className="dish-page__chapter-name">Вес</span>
                    </div>
                    <ul className="dish-page__list">
                        {!loading && dishTypes.length > 0 ? dishes.map((item) => (
                            <DishItem key={item.id} item={item} />
                        )): <div className="lds-facebook"><div></div><div></div><div></div></div>}
                    </ul>
                </div>
            </div>
            {dishTypes.length > 0 && (
                <DishAddModal dishTypes={dishTypes} visible={visableModal} setVisable={setVisableModal} />
            )}
            
        </div>
    );
};

export default DishPage;
