import React from 'react';

const OrderCard = ({ order }) => {
  return (
    <div>
      <p>Order Type: {order.type}</p>
      <p>Order Size: {order.size}</p>
      <p>Order Base: {order.base}</p>
    </div>
  );
};

export default OrderCard;
