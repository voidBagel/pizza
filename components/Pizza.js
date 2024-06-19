//Pizza.js
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  chooseCrust,
  addTopping,
  removeTopping,
  calculateTotalPrice,
} from '../reducers/pizzaSlice.js';
import {addOrderItem} from '../reducers/orderSlice.js';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import toppingData from '../data/toppings.json';
import {ScrollView} from 'react-native-gesture-handler';

const crustOptions = ['Thin', 'Default', 'Thick', 'Stuffed'];

const Pizza = ({navigation}) => {
  const dispatch = useDispatch();
  const pizza = useSelector(state => state.pizza);
  const crust = useSelector(state => state.pizza.crust);
  const price = useSelector(state => state.pizza.price);
  const orderItems = useSelector(state => state.order.items);
  const selectedToppings = useSelector(state => state.pizza.toppings);
  const [toppingOptions, setToppingOptions] = useState([]);

  useEffect(() => {
    setToppingOptions(toppingData.toppings);
  }, []);

  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [selectedToppings, crust, dispatch]);

  const handleCrustChange = value => {
    dispatch(chooseCrust(value));
  };

  const handleToppingChange = topping => {
    if (selectedToppings.includes(topping)) {
      dispatch(removeTopping(topping));
    } else if (selectedToppings.length < 3) {
      dispatch(addTopping(topping));
    }
  };

  const handleGotoOrder = () => {
    // Navigate to the order screen
    navigation.navigate('OrderScreen'); // Assumes you have a screen named 'OrderScreen'
  };
  //add pizza to order
  const handleAddItem = () => {
    const newItem = {
      id: new Date().getTime(),
      pizza,
    };
    dispatch(addOrderItem(newItem));
  };
  //debug
  console.log('crust:', crust);
  console.log('price:', price);
  console.log('selectedToppings:', selectedToppings);
  console.log('order_items:', orderItems);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Choose Your Crust</Text>
      <Picker selectedValue={crust} onValueChange={handleCrustChange}>
        {crustOptions.map(option => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>

      <Text style={styles.title}>Choose Up to 3 Toppings</Text>
      {toppingOptions.map(topping => (
        <View key={topping.name} style={styles.toppingContainer}>
          <Button
            title={`${topping.name} - $${topping.price}`}
            onPress={() => handleToppingChange(topping.name)}
            color={selectedToppings.includes(topping.name) ? 'green' : 'gray'}
          />
        </View>
      ))}

      <Text style={styles.summary}>Selected Crust: {crust}</Text>
      <Text style={styles.summary}>
        Selected Toppings: {selectedToppings.join(', ') || 'None'}
      </Text>
      <Text style={styles.summary}>Total Price: ${price.toFixed(2)}</Text>
      <Button title="Add to order" onPress={handleAddItem} />
      {/*make this button invisible or deactivate if order is empty*/}
      <Button
        title="Go to Order"
        onPress={handleGotoOrder}
        disabled={orderItems.length === 0}
      />
    </ScrollView>
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
  toppingContainer: {
    marginVertical: 5,
  },
  summary: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Pizza;
