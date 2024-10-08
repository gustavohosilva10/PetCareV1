import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { backgroundColor, primaryColor, terciaryColor, tittleForms } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import ErrorMessageModal from '../../components/ErrorMessageModal';
import PasswordInput from '../../components/PasswordInput';
import GenericInput from '../../components/GenericInput';
import Api from '../../api';
import { txtTittle, txtSubtittle, txtRedefinitionPassword, txtRedefinition, txtAccountQuestion, txtRegister, txtEmail, txtPassword, txtLogin, txtNotValidForm } from '../../utils/text';
import { Link } from "expo-router";

export default function Login() {

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
            const response = await Api.login(email, password)
                console.log(response.data.error);
                //adicionar rota para home
            if (response.data.token) {
                console.log(response.data);

            } else {
                if (response.data.error) {
                    setMessage(response.data.error);
                    setIsErrorModalVisible(true);
                }
            }
        } catch (error) {
            setMessage('Erro ao realizar o login, tente novamente mais tarde!');
            setIsErrorModalVisible(true);
        }

    };


    const handleSignUp = () => {
        // Implementação da lógica de registro
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
                        <TouchableOpacity>
                            <Text style={styles.forgotPassword}>{txtRedefinitionPassword}
                                <Link href="/recoveryPassword" style={styles.bold}>
                                    {txtRedefinition}
                                </Link>
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.signUp}>{txtAccountQuestion}
                                <Link href="/register" style={styles.bold}>
                                    {txtRegister}
                                </Link>
                            </Text>
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
        paddingTop: 5,
    },
    content: {
        flex: 1,
        marginHorizontal: 20,
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
        color: tittleForms,
    },
    appText: {
        marginTop: 0,
        fontSize: 16,
        color: terciaryColor,
        textAlign: 'center',
        paddingBottom: 60,
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
        color: primaryColor,
    },
});
