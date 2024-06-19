import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {removeOrderItem, clearOrder} from '../reducers/orderSlice';

const Order = ({navigation}) => {
  const dispatch = useDispatch();
  const orderItems = useSelector(state => state.order.items);

  const handleRemoveItem = itemId => {
    dispatch(removeOrderItem(itemId));
  };

  const handleClearOrder = () => {
    dispatch(clearOrder());
  };

  const handleGotoPizza = () => {
    // Navigate to the pizza screen
    navigation.navigate('PizzaScreen');
  };
  const renderItem = ({item}) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>
        Crust: {item.pizza.crust}, Toppings: {item.pizza.toppings.join(', ')},
        Price: ${item.pizza.price.toFixed(2)}
      </Text>
      <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order</Text>
      <FlatList
        data={orderItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Button title="Clear Order" onPress={handleClearOrder} />
      <Button title="Add more items" onPress={handleGotoPizza} />
      <Button
        title="Checkout"
        onPress={() => alert('Checkout not implemented')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  orderItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Order;
