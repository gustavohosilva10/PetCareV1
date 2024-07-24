import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Eye from '../../assets/icons/Eye.svg';
import { backgroundColor, primaryColor, terciaryColor, inputColor, secondaryColor, tittleForms } from '../utils/colors';

const PasswordInput = ({ label, placeholder, value, onChangeText, maxLength, keyboardType}) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 2,
  },
  label: {
    fontSize: 16,
    color: tittleForms,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    height: 38,
    marginBottom: 15,
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },

});

export default PasswordInput;
