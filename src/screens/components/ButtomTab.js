import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";


export default function ButtonTab() {
    return (
        <View style={styles.padding}>
            <Image
                style={styles.initialPhoto}
                source={require('../../../assets/IconNewPet.png')}
                resizeMode="cover"
            />
        </View>
    )
} 

const styles = StyleSheet.create({
    initialPhoto: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    padding: {
        paddingBottom:20
    }
})
