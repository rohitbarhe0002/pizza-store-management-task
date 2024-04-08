import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../redux/action';
const OrderForm = () => {
  const [order, setOrder] = useState({
    type: '',
    size: '',
    base: '',
  });

  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders);

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if an order with the same details already exists
    const isDuplicate = orders.some(existingOrder =>
      existingOrder.type === order.type &&
      existingOrder.size === order.size &&
      existingOrder.base === order.base
    );

    if (isDuplicate) {
      alert('Duplicate order. Please select different options.');
      return;
    }

    // Generate a unique order ID (you can use UUIDs or other methods)
    const orderId = Math.floor(Math.random() * 1000000);

    // Dispatch action to add order with generated ID
    dispatch(addOrder({ ...order, id: orderId }));

    // Reset form fields
    setOrder({
      type: '',
      size: '',
      base: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <input type="text" name="type" value={order.type} onChange={handleChange} />
      </label>
      <label>
        Size:
        <input type="text" name="size" value={order.size} onChange={handleChange} />
      </label>
      <label>
        Base:
        <input type="text" name="base" value={order.base} onChange={handleChange} />
      </label>
      <button type="submit">Add Order</button>
    </form>
  );
};

export default OrderForm;
