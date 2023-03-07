import { itemList as fullItemList } from "../../shopItems"
import ShopItem from "../ShopItem/ShopItem"
import React, { useEffect } from 'react';

export default function Cart() {
    const searchCart = (() => {
        return fullItemList.filter(item => item.addedToCart)
    })();

    const [cart, setCart] = React.useState({
        itemList: searchCart,
        totalPrice: 0
    });

    const unitsRef = React.useRef();




    const handleClickIsFavourite = (e) => {
        const toggleIsFavourite = (item) => {
            return Object.assign(item, {
                isFavourite: !item.isFavourite,
            })
        }

        let itemToChangeIndex = cart.itemList.findIndex(item => item.id === e.target.id)
        let copyList = [...cart.itemList]
        copyList[itemToChangeIndex] = toggleIsFavourite(copyList[itemToChangeIndex])

        setCart({
            ...cart,
            itemList: copyList
        })
    }

    const handleClickAddToCart = (e) => {
        const toggleAddToCart = (item) => {
            return Object.assign(item, {
                addedToCart: !item.addedToCart
            })
        }

        let itemToChangeIndex = cart.itemList.findIndex(item => item.id === e.target.id)
        let copyList = [...cart.itemList]
        copyList[itemToChangeIndex] = toggleAddToCart(copyList[itemToChangeIndex])

        setCart({
            ...cart.itemList,
            itemList: copyList
        })
    }

    useEffect(() => {
        searchCart.forEach(item => {
            item.displayAsCartItem = true;
        })
        return () => {
            searchCart.forEach(item => {
                item.displayAsCartItem = false;

            })
        }
    })

    return (
        <div id='Cart'>
            <h1>Cart</h1>
            <div className="cart-wrapper">
                {searchCart.map(item => {
                    return (
                        <ShopItem
                            image={item.image}
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            units={item.units}
                            addedToCart={item.addedToCart}
                            isFavourite={item.isFavourite}
                            description={item.description}
                            handleClickIsFavourite={handleClickIsFavourite}
                            handleClickAddToCart={handleClickAddToCart}
                        />
                    )
                })}
            </div>
        </div>
    )
}