import React from 'react';
import { View, StyleSheet } from 'react-native';

const RowInputs = ({ children }) => {
  return (
    <View style={styles.component}>
     {React.Children.map(children, (child, index) => {
        return (
          <View key={index} style={styles.inputContainer}>
            {child}
          </View>
        );
      })}
    </View>
  );
};


const styles = StyleSheet.create({
    component:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputContainer: {
        flex: 1,
        minWidth: '45%',
        marginHorizontal: 5,
    },
});
export default RowInputs;
