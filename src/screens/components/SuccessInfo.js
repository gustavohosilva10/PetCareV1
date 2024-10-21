import React from 'react';
import { View, Text, Image, StyleSheet, Modal } from 'react-native';
import { backgroundColor } from '../../utils/colors';

const SuccessInfoScreen = ({ visible, textTop, textBottom }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade" // Pode ser "slide", "fade" ou "none"
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Image
                        source={require('../../../assets/IconSucess.png')}
                        style={styles.image}
                    />
                    <Text style={styles.textTop}>{textTop}</Text>
                    <Text style={styles.textBottom}>{textBottom}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        width: '80%',
        padding: 20,
        backgroundColor: backgroundColor,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    textTop: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textBottom: {
        marginTop: 10,
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
});

export default SuccessInfoScreen;
