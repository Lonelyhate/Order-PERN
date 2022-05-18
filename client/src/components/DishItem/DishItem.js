import React, { useState } from 'react';
import './DishItem.scss';
import { AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { dishRemove } from '../../redux/action/dish';
import DishChangeModal from '../DishChangeModal/DishChangeModal';

const DishItem = ({ item }) => {
    const dispatch = useDispatch();
    const typesDish = useSelector((state) => state.typeDishReducer.typesDish);
    const type = typesDish.find((el) => el.id === item.dishTypeId);
    const [visableChangeModal, setVisableChangeModal] = useState(false);
    const [method, setMethod] = useState('');
    const [dataForChange, setDataForChange] = useState('');
    const deleteRemove = () => {
        dispatch(dishRemove(item.id));
    };

    const onClickMethod = (type) => {
        setVisableChangeModal(true);
        if (type === 'name') {
            setMethod('name');
        }
        if (type === 'weight') {
            setMethod('weight');
        }
        if (type === 'cost') {
            setMethod('cost');
        }
    };

    return (
        <li className="dish-item">
            <span className="dish-item__name">
                {item.name} <AiOutlineEdit onClick={() => onClickMethod('name')} />
            </span>
            <span className="dish-item__name">
                {item.cost} руб. <AiOutlineEdit onClick={() => onClickMethod('cost')} />
            </span>
            <span className="dish-item__name">{type.name}</span>
            <span className="dish-item__name">
                {item.weight}(г/мл) <AiOutlineEdit onClick={() => onClickMethod('weight')} />
            </span>
            <span className="dish-item__name dish-item__delete">
                <MdDelete onClick={deleteRemove} />
            </span>
            <DishChangeModal
                id={item.id}
                method={method}
                data={dataForChange}
                setData={setDataForChange}
                visable={visableChangeModal}
                setVisable={setVisableChangeModal}
            />
        </li>
    );
};

export default DishItem;
