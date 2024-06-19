import React from 'react';
import {StyleSheet} from 'react-native';
import Pizza from '../Pizza';

const PizzaScreen = ({navigation}) => {
  return <Pizza navigation={navigation} />;
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

export default PizzaScreen;
