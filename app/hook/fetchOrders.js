// hook/fetchOrders.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchOrders = (orderStatus) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.11:4000/api/order/list', {
          params: { status: orderStatus },
        });
    
        setOrders(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [orderStatus]);


  return { orders, isLoading, error };
};

export default fetchOrders;
