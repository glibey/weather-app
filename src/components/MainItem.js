import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainItem = (props) => {
    return (
      <TouchableOpacity>
        <View style = { styles.listItem }>
          <Text>{ props.placeName }</Text>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee'
  }
});

export default MainItem;
