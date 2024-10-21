import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { backgroundColor } from '../../utils/colors';

const SuccessInfoScreen = ({ textTop, textBottom }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/IconSucess.png')} 
                style={styles.image}
            />
            <Text style={styles.textTop}>{textTop}</Text>
            <Text style={styles.textBottom}>{textBottom}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor, 
    },
    image: {
        width: 200, 
        height: 200,
        resizeMode: 'contain',
    },
    textTop: {
        marginTop: 20, 
        fontSize: 18,
        fontWeight: 'bold',
    },
    textBottom: {
        marginTop: 10, 
        fontSize: 16,
        color: 'gray', 
    },
});

export default SuccessInfoScreen;
