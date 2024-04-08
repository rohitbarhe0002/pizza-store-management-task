import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../mainDisplay.css";
import { deleteOrder, updateOrderStage } from '../redux/action';

const MainDisplay = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders);

  const handleCancelOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const handleMoveToNextStage = (orderId, stage) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          stage,
          startTime: Date.now(),
        };
      }
      return order;
    });
    dispatch(updateOrderStage(updatedOrders));
  };
console.log(orders)
  const [timeElapsed, setTimeElapsed] = useState({});
console.log(timeElapsed)
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeElapsed = {};
      orders.forEach(order => {
        const { id, startTime } = order;
        const timeDiff = Date.now() - startTime;
        const minutesElapsed = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        updatedTimeElapsed[id] = minutesElapsed;
      });
      setTimeElapsed(updatedTimeElapsed);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [orders]); // Re-run effect whenever orders change

  return (
    <div>
      <h2>Main Display</h2>
      <div className="orders-container">
        {/* Display each stage in different columns */}
        <div className="stage-column">
          <h3>Order Placed</h3>
          {orders.map(order => (
            order.stage === 'Order Placed' && (
              <div key={order.id} className={`order-card ${timeElapsed[order.id] >= 3 ? 'highlighted' : ''}`}>
                <p>Order ID: {order.id}</p>
                <p>Type: {order.type}</p>
                <p>Size: {order.size}</p>
                <p>Base: {order.base}</p>
                <p>Time Elapsed: {timeElapsed[order.id]} min</p>
                <button onClick={() => handleMoveToNextStage(order.id, 'Order in Making')}>
                  Move to Making
                </button>
              </div>
            )
          ))}
        </div>
        {/* Similar sections for other stages */}
        <div className="stage-column">
          <h3>Order in Making</h3>
          {orders.map(order => (
            order.stage === 'Order in Making' && (
              <div key={order.id} className={`order-card ${timeElapsed[order.id] >= 3 ? 'highlighted' : ''}`}>
                <p>Order ID: {order.id}</p>
                <p>Type: {order.type}</p>
                <p>Size: {order.size}</p>
                <p>Base: {order.base}</p>
                <p>Time Elapsed: {timeElapsed[order.id]} min</p>
                <button onClick={() => handleMoveToNextStage(order.id, 'Order Ready')}>
                  Move to Ready
                </button>
              </div>
              
            )
          ))}
        </div>
        <div className="stage-column">
          <h3>Order Ready</h3>
          {orders.map(order => (
            order.stage === 'Order Ready' && (
              <div key={order.id} className={`order-card ${timeElapsed[order.id] >= 3 ? 'highlighted' : ''}`}>
                <p>Order ID: {order.id}</p>
                <p>Type: {order.type}</p>
                <p>Size: {order.size}</p>
                <p>Base: {order.base}</p>
                <p>Time Elapsed: {timeElapsed[order.id]} min</p>
                <button onClick={() => handleMoveToNextStage(order.id, 'Order Picked')}>
                  Move to Picked
                </button>
              </div>
            )
          ))}
        </div>
        <div className="stage-column">
          <h3>Order Picked</h3>
          {orders.map(order => (
            order.stage === 'Order Picked' && (
              <div key={order.id} className={`order-card ${timeElapsed[order.id] >= 3 ? 'highlighted' : ''}`}>
                <p>Order ID: {order.id}</p>
                <p>Type: {order.type}</p>
                <p>Size: {order.size}</p>
                <p>Base: {order.base}</p>
                <p>Time Elapsed: {timeElapsed[order.id]} min</p>
                  <button onClick={() => handleCancelOrder(order.id)}>
                Cancel
                </button>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDisplay;
