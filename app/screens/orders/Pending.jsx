import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';
import { BASE_URL } from '../../constants/theme';

const Pending = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/order/list`);
        setOrders(response.data.data); // Assumes the "data" key holds the orders array
      } catch (err) {
        setError(err.message || 'Error fetching orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const handlePress = (order) => {
    navigation.navigate('OrderDetail', { order });
  };

  const renderOrderItem = ({ item }) => {
    const order = item;
    const orderDate = new Date(order.date).toLocaleDateString();

    return (
      <TouchableOpacity onPress={() => handlePress(order)}>
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}>
          <Text>Order ID: {order._id}</Text>
          <Text>Status: {order.status}</Text>
          <Text>Amount: ${order.amount.toFixed(2)}</Text>
          <Text>Order Date: {orderDate}</Text>
          <Text>Address: {order.address.city}, {order.address.country}</Text>
          <Text>Items:</Text>
          {order.items.map((item, index) => (
            <Text key={index}>- {item.name}: ${item.price.toFixed(2)}</Text>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderOrderItem}
      />
    </View>
  );
};

export default Pending;
