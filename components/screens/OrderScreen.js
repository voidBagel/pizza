import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Order from '../Order';

const OrderScreen = ({navigation}) => {
  return <Order navigation={navigation} />;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  toppingContainer: {
    marginVertical: 5,
  },
  summary: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default OrderScreen;
