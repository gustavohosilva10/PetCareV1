import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { backgroundColor } from '../utils/colors';
import { Link } from 'expo-router';

export default function Preloading() {
    return ( 
        <View style={styles.container}>
            <Image
                source={require('../../assets/splashPetcare.png')}
                style={styles.backgroundImage}
            />
            <Link href={"/preloading"}>Preloading</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
});
