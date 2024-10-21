

import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { backgroundColor, secondaryColor, terciaryColor, tittleForms, primaryColor } from '../../utils/colors';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CardAction({ image, tittle, subTittle, onPress}) {
    return (
        <>
            <TouchableOpacity style={styles.card} onPress={onPress}>
                <Image
                    source={image}
                    width={24}
                    height={32}
                />
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{tittle}</Text>
                    <Text style={styles.cardDescription}>{subTittle}</Text>
                </View>
                <FontAwesome5 name="chevron-right" size={24} color={primaryColor} />
            </TouchableOpacity>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        elevation: 2,
    },
    cardTextContainer: {
        flex: 1,
        marginLeft: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: tittleForms,
    },
    cardDescription: {
        fontSize: 14,
        color: terciaryColor,
    },
    iconsImage: {
        height: 24,
        width: 24,
        resizeMode: 'cover'
    }
});
