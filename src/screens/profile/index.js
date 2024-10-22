import { React, useCallback, useState } from 'react';

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { backgroundColor, terciaryColor, secondaryColor, tittleForms } from '../../utils/colors';
import CardAction from '../components/CardAction';
import { txtBack, txtMyInfo, txtUpdateInfo, txtCreatedAccount, txtMyProfile, txtMyProfileInfo, txtEmail, txtName, txtDocument, txtCellphone, txtLogout } from '../../utils/text';
import { useFocusEffect } from '@react-navigation/native';
import Api from '../../api';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [document, setDocument] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [email, setEmail] = useState('');
    const [account, setAccount] = useState('');
    const [info, setInfo] = useState(false);

    const goBack = () => {
        navigation.navigate('Home1');
    };

    const goData = () => {
        setInfo(true);
    }

    const goUpdate = () => {
        navigation.navigate('UpdateProfile');
    }

    const goLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],  
            });
        } catch (error) {
        }
    };

    useFocusEffect(
        useCallback(() => {
            const UserData = async () => {
                try {
                    const response = await Api.getUser();

                    if (response && response.data.id) {
                        setName(response.data.name);
                        setDocument(response.data.document);
                        setCellphone(response.data.cellphone);
                        setEmail(response.data.email);
                        setAccount(response.data.created_at);
                    } else {
                        if (response && response.errors) {
                            setMessage(response.errors.join('\n'));
                            setIsErrorModalVisible(true);
                        }
                        if (response && response.error) {
                            setMessage(response.error);
                            setIsErrorModalVisible(true);
                        }
                    }
                } catch (error) {
                    setMessage('Erro ao carregar dados do usuário');
                    setIsErrorModalVisible(true);
                }
            };
            UserData();

        }, [])
    );


    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <FontAwesome5 name="chevron-left" size={24} color={tittleForms} />
                    <Text style={styles.backButtonText}>{txtBack}</Text>
                </TouchableOpacity>

                {info === false ? (
                    <>
                        <View style={styles.contentContainer}>
                            <View style={styles.userInfoContainer}>
                                <Image
                                    source={require('../../../assets/iconPat.png')}
                                    style={styles.profileImage}
                                />
                                <View style={styles.userInfoText}>
                                    <Text style={styles.userName}>{name}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.subTittle}>
                            <Text style={styles.userSubtitle}>{txtCreatedAccount} {account}</Text>
                        </View>

                        <View style={styles.cardContent}>
                            <CardAction image={require('../../../assets/iconProf.png')} tittle={txtMyInfo} subTittle={txtUpdateInfo} onPress={goData} />
                        </View>
                    </>

                ) :
                    <>
                        <View style={styles.contentContainer}>
                            <View style={styles.userInfoText}>
                                <Text style={styles.userName}>{txtMyProfile}</Text>
                            </View>
                        </View>
                        <View style={styles.subTittle}>
                            <Text style={styles.userSubtitle}>{txtMyProfileInfo}</Text>
                        </View>

                        <View style={styles.contentData}>
                            <View style={styles.subTittle}>
                                <Text style={styles.userSubtitle}>{txtName}</Text>
                                <Text style={styles.userInfo}>{name}</Text>
                            </View>

                            <View style={styles.infoBetween}>
                                <View style={styles.subTittle}>
                                    <Text style={styles.userSubtitle}>{txtDocument}</Text>
                                    <Text style={styles.userInfo}>{document}</Text>
                                </View>
                                <View style={styles.subTittle}>
                                    <Text style={styles.userSubtitle}>{txtCellphone}</Text>
                                    <Text style={styles.userInfo}>{cellphone}</Text>
                                </View>
                            </View>

                            <View style={styles.subTittle}>
                                <Text style={styles.userSubtitle}>{txtEmail}</Text>
                                <Text style={styles.userInfo}>{email}</Text>
                            </View>
                        </View>

                        <View style={styles.contentData}>

                            <View style={styles.updateContent}>
                                <View style={styles.subTittle}>
                                    <TouchableOpacity onPress={goUpdate}>
                                        <Text style={styles.updateInfo}>Editar informações</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.logoutContainer}>
                            <TouchableOpacity onPress={goLogout} style={styles.userInfoText}>
                                <Text style={styles.userName}>{txtLogout}</Text>
                            </TouchableOpacity>
                        </View>
                    </>

                }

            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingTop: 35,
    },
    backButtonText: {
        color: terciaryColor,
        fontSize: 16,
        marginLeft: 5,
        fontFamily: 'Lato-Regular',
    },
    subTittle: {
        paddingHorizontal: 20,
        padding: 10
    },
    contentContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 30
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfoText: {
        justifyContent: 'center',
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Lato-Regular',
    },
    userInfo: {
        fontSize: 16,
        fontFamily: 'Lato-Regular',
    },
    userSubtitle: {
        fontSize: 14,
        color: terciaryColor,
        fontFamily: 'Lato-Regular',
    },
    contentData: {
        marginTop: 40
    },
    cardContent: {
        paddingTop: 50,
        marginHorizontal: 20,
        flex: 1,
    },
    infoBetween: {
        alignContent: 'space-between',
        flexDirection: 'row'
    },
    updateContent: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    updateInfo: {
        fontSize: 14,
        color: secondaryColor,
        fontFamily: 'Lato-Regular',
    },
    logoutContainer: {
        justifyContent: 'center',
        alignSelf: 'center'
    }
});
