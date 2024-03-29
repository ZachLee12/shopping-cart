import React, { useEffect } from "react";
import { searchItems } from "../../shopItems";
import '../../assets/fonts/Roboto/Roboto-Medium.ttf'

export default function ShopItem(props) {
    let targetItem = searchItems(props.name)[0]
    const [shopItem, setShopItem] = React.useState(targetItem)

    const handleChangeUnits = (e) => {
        setShopItem({
            ...shopItem,
            units: e.target.value,
            totalPrice: (e.target.value * shopItem.price).toFixed(2)
        })
    }

    //sync data with shopItem.js
    useEffect(() => {
        // to keep it in sync with central shopItems.js
        targetItem = Object.assign(targetItem, shopItem);
    }, [shopItem])

    return (
        <React.Fragment>
            <figure className="ShopItem">
                <div className="position-wrapper">
                    <div className="image-scale-wrapper">
                        <img className="ShopItem-image" src={props.image} alt="" />
                    </div>
                    <div className="favourite-and-cart-wrapper">
                        <button
                            className="favourite-button feature-button"
                            id={props.id}
                            onClick={props.handleClickIsFavourite}
                        >{props.isFavourite ? '✨Favourited' : 'Favourite'}</button>
                        <button
                            className="added-to-cart-button feature-button"
                            id={props.id}
                            onClick={props.handleClickAddToCart}>
                            {props.addedToCart ? '🛍️Added to Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
                <figcaption>
                    <p className="ShopItem-name">{props.name}</p>
                    {/* <p className="ShopItem-description">{props.description}</p> */}
                    <p className="price">{Number(props.price).toFixed(2)} CHF</p>

                    {props.displayAsCartItem &&
                        <div className="cart-information-wrapper">
                            <p className="units-wrapper">Units:
                                <input
                                    className="unit-number-input"
                                    min={1}
                                    max={100}
                                    type="number"
                                    onChange={handleChangeUnits}
                                    defaultValue={shopItem.units}
                                /></p>
                            <p>Total: {Number(shopItem.totalPrice).toFixed(2)} CHF</p>
                        </div>
                    }
                </figcaption>
            </figure>
        </React.Fragment>
    )
}