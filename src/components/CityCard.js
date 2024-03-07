import React from 'react';
import {useState, forwardRef} from 'react';
import './CityCard.css';

// This is a functional component that represents a single menu item. It currently takes in the title and displays it in an h2 element.
// Modify the component to take in all the other properties of a menu item you need and display them in the component.
// Use bootstrap to style the elements so that it looks like the mockup in the assignment.
// Hint: You can use the image name to get the image from the images folder.
const MenuItem = forwardRef(({ title, description, img_name, price, updateSubtotal, resetCount }, ref) => {
    const [count, setCount] = useState(0);

    const decreaseCount = () => {
        if(count > 0){ //doesn't allow a negative count
            setCount(count - 1);
            updateSubtotal(price, false);
        }
    };

    const increaseCount = () => {
        setCount(count + 1);
        updateSubtotal(price, true);
    };

    // add methods to individual menu item components
    React.useImperativeHandle(ref, () => ({
        resetCount: () => setCount(0),
        getCount: () => count,
        getOrderDetails: () => ({ count, title })
    }));

    return (
        <div class = "row menu-grid-row menu-item-content">
            <div class = "col-4">
                <img class = "img-fill-container rounded-3" src={"./images/" + img_name} alt = {title}/>
            </div>
            <div class = "col-8">
                <h4 class = "menu-item">{title}</h4>
                <p class = "menu-item-description menu-item-desc-margin-bottom">{description}</p>
                <div class = "row">
                    <div class = "col-8">
                        <p><b>${price}</b></p>
                    </div>
                    <div class = "col-4 btn btn-right-align d-flex justify-content-between">
                        <button onClick={decreaseCount} class = "btn-bg rounded-circle add-remove-btn"><b>-</b></button>
                        <p class = "count">{count}</p>
                        <button onClick={increaseCount} class = "btn-bg rounded-circle add-remove-btn"><b>+</b></button>
                    </div>
                </div>
                
            </div>
        </div>
    );
});

export default CityCard;
