import { React, useCallback, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { backgroundColor, secondaryColor, terciaryColor, tittleForms } from '../../utils/colors';
import {
    txtWelcome, txtMyPets, txtNonePet, txtCategoys, txtTittleCardVaccine, txtSubTittleCardVaccine, txtTittleCardMedicament, txtSubiTittleCardMedicament,
    txtTittleCardIdentification, txtSubiTittleCardIdentification, txtErrorDataUser
} from '../../utils/text';
import { useFonts } from 'expo-font';
import FontLoader from '../components/FontLoader';
import CardAction from '../components/CardAction';
import CardPet from '../components/CardPet';
import Api from '../../api';
import ErrorMessageModal from '../../screens/components/ErrorMessageModal';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [pets, setPets] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const UserData = async () => {
                try {
                    const response = await Api.getUser();

                    if (response?.data?.id) {
                        setName(response.data.name);
                    } else {
                        if (response?.errors) {
                            setMessage(response.errors.join('\n'));
                            setIsErrorModalVisible(true);
                        }
                        if (response?.error) {
                            setMessage(response.error);
                            setIsErrorModalVisible(true);
                        }
                    }
                } catch (error) {
                    setMessage(txtErrorDataUser);
                    setIsErrorModalVisible(true);
                }
            };
            UserData();

        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            const PetData = async () => {
                try {
                    const response = await Api.getPets();

                    if (response?.data) {
                        setPets(response.data);
                    } else {
                        if (response?.errors) {
                            setMessage(response.errors.join('\n'));
                            setIsErrorModalVisible(true);
                        }
                        if (response?.error) {
                            setMessage(response.error);
                            setIsErrorModalVisible(true);
                        }
                    }
                } catch (error) {
                    setMessage('Erro ao carregar dados do usuário');
                    setIsErrorModalVisible(true);
                }
            };
            PetData();

        }, [])
    );

    return (
        <SafeAreaProvider>
            <FontLoader>
                <ScrollView>

                    <View style={styles.container}>
                        <View style={styles.titleContent}>
                            <Text style={styles.nameText}>{txtWelcome}{name}</Text>
                        </View>

                        <Image
                            source={require('../../../assets/ImgHome.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <View style={styles.titleContent}>
                            <Text style={styles.nameTitlePetText}>{txtMyPets}</Text>
                        </View>
                        {pets.length === 0 ? (
                            <View style={styles.noPetContainer}>
                                <Text>{txtNonePet}</Text>
                                <Image
                                    source={require('../../../assets/IconHome.png')}
                                    style={styles.imageNonePet}
                                    resizeMode="cover"
                                />
                            </View>
                        ) : (
                            <>

                                <View style={styles.petCardContent}>
                                    <CardPet />
                                </View>
                            </>
                        )}

                        <View style={styles.titleContent}>
                            <Text style={styles.nameTitlePetText}>{txtCategoys}</Text>
                        </View>

                        <View style={styles.cardContent}>
                            <CardAction image={require('../../../assets/IconVaccines.png')} tittle={txtTittleCardVaccine} subTittle={txtTittleCardVaccine} />
                            <CardAction image={require('../../../assets/IconMedic.png')} tittle={txtTittleCardMedicament} subTittle={txtSubiTittleCardMedicament} />
                            <CardAction image={require('../../../assets/IconQRCode.png')} tittle={txtTittleCardIdentification} subTittle={txtSubiTittleCardIdentification} />
                        </View>
                        <ErrorMessageModal
                            visible={isErrorModalVisible}
                            message={message}
                            onClose={() => setIsErrorModalVisible(false)}
                        />
                    </View>
                </ScrollView>

            </FontLoader>

        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor
    },
    titleContent: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontFamily: 'Lato-Regular',
        padding: 28,
    },
    petCardContent: {
        justifyContent: 'center'
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Lato-Regular',
        color: tittleForms
    },
    nameTitlePetText: {
        fontSize: 16,
        marginBottom: 20,
        fontFamily: 'Lato-Regular',
        color: tittleForms
    },
    image: {
        width: '100%',
        height: 194,
    },
    noPetContainer: {
        alignSelf: 'center'
    },
    imageNonePet: {
        height: 90,
        width: 90
    },
    cardContent: {
        marginHorizontal: 20,
        flex: 1
    }
});

export default HomeScreen;
