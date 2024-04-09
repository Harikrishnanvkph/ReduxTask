import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {cartItemsRemove,cartRemove, cartAdd, cartItemsAdd, reset } from './Store/Slicer'


export default function CartItems() {
  const cartItems = useSelector((state) => state.storeLM.objectIDs);
  const [tempItems, setTempItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetch = async()=>{
        const data = await Promise.all(
            cartItems.map(async (item)=>{
                const api_data = await axios.get(`https://65ed55ba0ddee626c9b1786b.mockapi.io/lamp/${item.id}`)
                return api_data.data;
            })
        )
        setTempItems(data)
    }
    fetch();
  },[cartItems])

  const totalPrice = ()=>{
    let total = 0;
    for(let i=0;i<tempItems.length;i++){
        total += (parseInt(tempItems[i].price) * getItemsCost(tempItems[i].id))
    }
    return total;
  }

  const getItemsCost = (id)=>{
    let count = 0;
    cartItems.map((it)=>{
        if(it.id == id){
            count = it.count;
        }
    })
    return count;
  }

  return (
    <div className="cart-items">
      <div className="cart-header d-flex align-items-center">
        <h4>ITEMS</h4>
        <div className="cart-order d-flex dd align-items-center">
            <h4 className="cart-total dd">Total ₹{totalPrice()}</h4>
            <button className="btn btn-primary p-1" onClick={
                ()=>{
                    alert(`
                    This App was created with REDUX TOOLKIT
                    By
                    HARI KRISHNAN V K`);
                    dispatch(reset());
                }
            }>
                Order
            </button>
        </div>
      </div>
      <div className="cart-master">
      {
        tempItems.map((it)=>(
            <div key={it.id} className="cart-card">
                <div className="cart-image cart-im w-100 d-flex justify-content-center">
                    <img src={it.thumbnail} />
                </div>
                <div className="cart-item-details cart-im d-flex flex-column justify-content-around align-items-center">
                    <h3 className="final-price">{it.title}</h3>
                    <h4 className="show-price">₹{it.price}</h4>
                    <div className="d-flex align-items-center btnShow">
                        <button className='btn btn-primary' onClick={()=>{
                            dispatch(cartItemsRemove(it.id));
                            dispatch(cartRemove(1));
                        }}>
                            <RemoveIcon />
                        </button>
                        <h6>X {getItemsCost(it.id)}</h6>
                        <button className='btn btn-primary' onClick={()=>{
                            dispatch(cartItemsAdd({index : it.id, count : 1}));
                            dispatch(cartAdd(1));
                        }}>
                            <AddIcon />
                        </button>
                    </div>
                </div>
                <div className="cart-item-price cart-im d-flex justify-content-center align-items-center">
                    <h3 className="mixture-price">₹{getItemsCost(it.id)*parseInt(it.price)}</h3>
                </div>
            </div>
        ))
      }
      </div>
    </div>
  );
}
