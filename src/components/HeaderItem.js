import React from 'react';
import './HeaderItem.css';


// This is a functional component that represents a single menu item. It currently takes in the title and displays it in an h2 element.
// Modify the component to take in all the other properties of a menu item you need and display them in the component.
// Use bootstrap to style the elements so that it looks like the mockup in the assignment.
// Hint: You can use the image name to get the image from the images folder.
const HeaderItem = ({logo, subheading1, subheading2}) => {
    return (
        <div class = "align-items-center text-center info-margin">
            <div class = "row margin-bottom">
                <img class = "img-fill-container logo-padding-top" src={"./images/" + logo} alt="japanese restaurant logo"/>
            </div>
            <h4 class = "color2 cursive-font"><i>{subheading1}</i></h4>
            <h5 class = "margin-bottom">{subheading2}</h5>   
        </div>
    );
};

export default HeaderItem;