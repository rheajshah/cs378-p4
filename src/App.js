import React from 'react';
import './App.css';
import MenuItem from './components/MenuItem';
import './components/MenuItem.css';
import HeaderItem from './components/HeaderItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.

// Menu data. An array of objects where each object represents a menu item. Each menu item has an id, title, description, image name, and price.
// You can use the image name to get the image from the images folder.
const menuItems = [
  {
    id: 1,
    title: 'Gyoza',
    description: 'Japanese dumplings',
    imageName: 'gyoza.png',
    price: 5.99,
  },
  {
    id: 2,
    title: 'Sushi',
    description: 'Japanese rice rolls',
    imageName: 'sushi.png',
    price: 6.99,
  },
  {
    id: 3,
    title: 'Ramen',
    description: 'Japanese noodle soup',
    imageName: 'ramen.png',
    price: 7.99,
  },
  {
    id: 4,
    title: 'Matcha Cake',
    description: 'Japanese green tea cake',
    imageName: 'matcha-cake.png',
    price: 4.99,
  },
  {
    id: 5,
    title: 'Mochi',
    description: 'Japanese rice cake',
    imageName: 'mochi.png',
    price: 3.99,
  },
  {
    id: 6,
    title: 'Yakitori',
    description: 'Japanese skewered chicken',
    imageName: 'yakitori.png',
    price: 2.99,
  },
  {
    id: 7,
    title: 'Takoyaki',
    description: 'Japanese octopus balls',
    imageName: 'takoyaki.png',
    price: 5.99,
  },
  {
    id: 8,
    title: 'Sashimi',
    description: 'Japanese raw fish',
    imageName: 'sashimi.png',
    price: 8.99,
  },
  {
    id: 9,
    title: 'Okonomiyaki',
    description: 'Japanese savory pancake',
    imageName: 'okonomiyaki.png',
    price: 6.99,
  },
  {
    id: 10,
    title: 'Katsu Curry',
    description: 'Japanese curry with fried pork',
    imageName: 'katsu-curry.png',
    price: 9.99,
  }
];


function App() {
  const [subtotal, setSubtotal] = useState(0);

  const updateSubtotal = (itemPrice, increment) => {
    const incrementValue = increment ? itemPrice : -itemPrice;
    setSubtotal(subtotal + incrementValue);
  };

  return (
    <div class = "menu-body">
      <HeaderItem
        logo={"jr-logo.png"}
        subheading1={"Authentic Japanese Cuisine in the Heart of Austin"}
        subheading2={"call ahead to reserve."}
      />

      <div class = "menu-grid-row">
        {/* Display menu items dynamicaly here by iterating over the provided menuItems */}
        {menuItems.map(item => (
          <MenuItem
            key={item.id}
            title={item.title}
            description={item.description}
            img_name={item.imageName}
            price={item.price}
            updateSubtotal = {updateSubtotal}
          />
        ))}
      </div>

      <div class = "subtotal-div">
          <h4>Subtotal: ${subtotal.toFixed(2)}</h4>
      </div>
    </div>
  );
}

export default App;
