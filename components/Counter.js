import React from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import {increment} from '../store'; // Import the increment action

class Counter extends React.Component {
  render() {
    return (
      <View>
        <Text>Count: {this.props.count}</Text>
        <Button title="Increment" onPress={this.props.increment} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.counter.count, // Access the count from the counter slice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch(increment()), // Dispatch the increment action
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
