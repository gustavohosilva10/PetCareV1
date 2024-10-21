import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { backgroundColor, primaryColor, terciaryColor, inputColor, secondaryColor, tittleForms } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import Api from '../../api';
import ErrorMessageModal from '../../screens/components/ErrorMessageModal';
import { ScrollView } from 'react-native';
import { txtTittle, txtSubtittle, txtRedefinitionPassword, txtRedefinition, txtAccountQuestion, txtRegister, txtEmail, txtPassword, txtLogin, txtNotValidForm, txtUnknown, txtErrorServer  } from '../../utils/text';
import PasswordInput from '../../screens/components/PasswordInput';
import GenericInput from '../components/GenericInput';

export default function LoginScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [buttonEnabled, setButtonEnabled] = useState(false);

    const [visiblePassword, setVisiblePassowrd] = useState(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setMessage(txtNotValidForm);
            setIsErrorModalVisible(true);
            return;
        }
    
        try {
            const response = await Api.login(email, password);
    
            if (response?.data?.token) {
                navigation.navigate('Home');
            } else {
    
                if (response?.errors) {
                    setMessage(response.errors.join('\n'));
                } 

                else if (response?.error) {
                    setMessage(response.error);
                } 

                else {
                    setMessage(txtUnknown);
                }
                setIsErrorModalVisible(true);
            }
        } catch (error) {
            setMessage(txtErrorServer);
            setIsErrorModalVisible(true);
        }
    };

    const onPressEyePassword = () => {
        setVisiblePassowrd(!visiblePassword);
    }

    const handleForgotPassword = () => {
        navigation.navigate('RecoveryPassword');
    };

    const handleSignUp = () => {
        navigation.navigate('Register');
    };

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <ScrollView>

                    <View style={styles.header}>
                        <Image
                            source={require('../../../assets/InitialPhoto.png')}
                            style={styles.image}
                        />
                        <Text style={styles.welcomeText}>{txtTittle}</Text>
                        <Text style={styles.appText}>{txtSubtittle}</Text>
                    </View>
                    <View style={styles.content}>
                        <GenericInput
                            label={txtEmail}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            maxLength={60}
                            keyboardType="email-address"
                        />
                        <PasswordInput
                            label={txtPassword}
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                        >
                            <Text style={styles.buttonText}>{txtLogin}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleForgotPassword}>
                            <Text style={styles.forgotPassword}>{txtRedefinitionPassword} <Text style={styles.bold}>{txtRedefinition}</Text></Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.signUp}>{txtAccountQuestion} <Text style={styles.bold}>{txtRegister}</Text></Text>
                        </TouchableOpacity>

                    </View>

                    <ErrorMessageModal
                        visible={isErrorModalVisible}
                        message={message}
                        onClose={() => setIsErrorModalVisible(false)}
                    />
                </ScrollView>
            </View>

        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5
    },
    content: {
        flex: 1,
        marginHorizontal: 20
    },
    image: {
        width: 290,
        height: 290,
        resizeMode: 'cover',
        marginBottom: 2,
    },
    welcomeText: {
        fontSize: 24,
        marginBottom: 0,
        color: tittleForms
    },
    appText: {
        marginTop: 0,
        fontSize: 16,
        color: terciaryColor,
        textAlign: 'center',
        paddingBottom: 60
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    forgotPassword: {
        marginTop: 10,
        color: terciaryColor,
    },
    signUp: {
        marginTop: 20,
        color: terciaryColor,
    },
    bold: {
        fontWeight: 'bold',
        color: primaryColor
    }
});
