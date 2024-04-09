import Rating from '@mui/material/Rating';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { cartAdd, cartItemsAdd} from './Store/Slicer';

export default function Item({id,title,discount,price,image,rating,description}){

    const dispatch = useDispatch();
    const [count,setCount] = useState(1);

    const getDiscount = () => {
        return ((parseInt(price)*100)/(100-parseFloat(discount))).toFixed()
    }

    return<>
        <div className="phone-show col-lg-6 col-sm-12">
            <div className="phone-card d-flex row">
                <div className="phone-image col-6">
                    <img src={image} />
                </div>
                <div className="phone-details p-4 col-6">
                    <h3 className='title'>{title}</h3>
                    <div className='rating d-flex'>
                        <p>{rating}</p>
                        <Rating size="small" name="read-only" value={parseInt(rating)} precision={0.2} readOnly />
                    </div>
                    <p>{description}</p>
                    <div className="phone-price">
                        {parseFloat(discount) <= 0 ? 
                        <h3>{price}</h3> : 
                        <>
                        <div className="d-flex phone-price-discount align-items-center">
                            <h5 className="phone-price-cross">{<del>₹{getDiscount()}</del>}</h5>
                            <h5 className="phone-price-discount">{`${discount} % off`}</h5>
                        </div>
                        <h3 className="phone-price-tag">₹{price}</h3>
                        </>}
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex buttons align-items-center'>
                            <button className='btn btn-primary' onClick={()=>{setCount(count > 1 ? count - 1 : count)}}>
                                <RemoveIcon />
                            </button>
                            <p>{count}</p>
                            <button className='btn btn-primary' onClick={()=>{setCount(count < 5 ? count + 1 : count)}}>
                                <AddIcon />
                            </button>
                        </div>
                        <button className='btn btn-primary button-cart'
                        onClick={()=>{
                            dispatch(cartItemsAdd({index : id, count : count}));
                            dispatch(cartAdd(count));
                            setCount(1);
                        }}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}