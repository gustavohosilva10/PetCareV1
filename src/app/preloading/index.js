import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { backgroundColor } from '../../utils/colors';

export default function Preloading() {
    const router = useRouter();
    useEffect(() => {
        const checkToken = async () => {
            const value = await AsyncStorage.getItem('token');
            if (value) {
                router.replace('/login'); 
            } else {
                router.replace('/login'); 
            }
        };

        checkToken();
    }, []);

    return ( 
        <View style={styles.container}>
            <Image
                source={require('../../../assets/splashPetcare.png')}
                style={styles.backgroundImage}
            />
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
