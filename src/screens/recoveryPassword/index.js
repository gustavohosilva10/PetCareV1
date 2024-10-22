import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { backgroundColor, primaryColor, terciaryColor, tittleForms } from '../../utils/colors';
//import Api from '../../api';
import ErrorMessageModal from '../../screens/components/ErrorMessageModal';
//import Back from '../../../assets/icons/Back.svg';
import { txtEmail, txtBack, txtQuestionPassword, txtInfoPassword, txtSend } from '../../utils/text';
import GenericInput from '../components/GenericInput';
import SuccessInfo from '../components/SuccessInfo';
import { FontAwesome5 } from '@expo/vector-icons';

export default function RecoveryPasswordScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSplashVisible, setIsSplashVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);

    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

    const goBack = () => {
        navigation.navigate('Login');
    }

    const handleReset = async () => {
        if (!email) {
            setMessage("O e-mail é obrigatório.");
            setIsErrorModalVisible(true);
            return;
        }

        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
        }, 2000);
        /*         const response = await Api.recoveryPassword(email)
                setMessage(response);
                setIsErrorModalVisible(true); */
    };

    useEffect(() => {
        if (!isSuccess) {
            navigation.replace('Login');
        }
    }, [isSuccess, navigation]);

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <FontAwesome5 name="chevron-left" size={24} color={tittleForms} />
                    <Text style={styles.backButtonText}>{txtBack}</Text>
                </TouchableOpacity>
                <View style={styles.header}>
                    <Image
                        source={require('../../../assets/RecoveryPassword.png')}
                        style={styles.image}
                    />
                    <Text style={styles.welcomeText}>{txtQuestionPassword}</Text>
                    <Text style={styles.appText}>{txtInfoPassword}</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.labelContainer}>
                        <GenericInput
                            label={txtEmail}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            maxLength={60}
                            keyboardType="email-address"
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={styles.loginButton} onPress={handleReset}>
                        <Text style={styles.buttonText}>{txtSend}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ErrorMessageModal
                visible={isErrorModalVisible}
                message={message}
                onClose={() => setIsErrorModalVisible(false)}
            />
            {isSplashVisible && (
                <SuccessInfo
                    textTop="Texto acima da imagem"
                    textBottom="Texto abaixo da imagem"
                />
            )}
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    backButton: {
        position: 'absolute',
        top: 24,
        left: 24,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 35
    },
    backButtonText: {
        color: terciaryColor,
        fontSize: 16,
        marginLeft: 5,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        marginHorizontal: 12
    },
    content: {
        flex: 1,
        marginHorizontal: 20
    },
    image: {
        width: 290,
        height: 290,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 24,
        marginBottom: 20,
        color: primaryColor,
    },
    appText: {
        marginTop: 20,
        fontSize: 16,
        color: terciaryColor,
        textAlign: 'center',
        paddingBottom: 60,
    },
    labelContainer: {
        marginBottom: 12,
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
    },
    loginButton: {
        width: '90%',
        maxWidth: '100%',
        alignItems: 'center',
        backgroundColor: primaryColor,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
