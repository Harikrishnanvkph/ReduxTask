import {Routes, Route, Link} from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Badge from '@mui/material/Badge';
import ItemList from './ItemList'
import {useSelector} from 'react-redux';
import CartItems from './CartItems';

export default function Nav(){
    const cartItemCount = useSelector((state)=>state.storeLM.cartItemCount);
    
    return<>
        <div className='monster'>
            <nav className="nav-page">
                <ul className='nav-link d-flex flex-column justify-content-between align-items-center p-0'>
                    <li>
                        <Link className='jackie' to="/">Item List</Link>
                    </li>
                    <li>
                        <div className='d-flex cart'>
                            <Badge badgeContent={cartItemCount} color="primary">
                                <ShoppingBagIcon className='dream' />
                            </Badge>
                            <Link className='jackie' to="/cart">Cart</Link>
                        </div>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<ItemList />} />
                <Route path='/cart' element={<CartItems />} />
            </Routes>
        </div>
    </>
}