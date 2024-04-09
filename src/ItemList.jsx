import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";

export default function ItemList() {
    const phoneAPI = useSelector((state) => state.storeLM.apiState);
    const readyCheck = useSelector((state) => state.storeLM.ready);
  
    return (
      <>
        <div className="phone-home">
          {readyCheck ? (
            <div className="phone-list row">
              {phoneAPI.map((it, index) => (
                <Item
                  key={index}
                  id={it.id}
                  title={it.title}
                  discount={it.discountPercentage}
                  price={it.price}
                  image={it.thumbnail}
                  rating={it.rating}
                  description = {it.description}
                />
              ))}
            </div>
          ) : <></>}
        </div>
      </>
    );
  }
  
