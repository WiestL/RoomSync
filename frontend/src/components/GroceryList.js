import React from 'react';

function GroceryList({ items }) {
    return (
        <div>
            <h2>Grocery List</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - {item.quantity}</li>
                ))}
            </ul>
        </div>
    );
}

export default GroceryList;
