import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backgroundColor, secondaryColor, terciaryColor, tittleForms } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { txtTittleOne, txtSubTittleOne, txtTittleTwo, txtSubTittleTwo, txtTittleThree, txtSubTittleThree, txtBack } from '../../utils/text';

const componentsData = [
  {
    image: require('../../../assets/FirstInfo.png'),
    nav: require('../../../assets/Step1.png'),
    advance: require('../../../assets/SettingInfo.png'),
    text: txtTittleOne,
    additionalText: txtSubTittleOne,
  },
  {
    image: require('../../../assets/SecondInfo.png'),
    nav: require('../../../assets/Step2.png'),
    advance: require('../../../assets/SettingInfo.png'),
    text: txtTittleTwo,
    additionalText: txtSubTittleTwo,
  },
  {
    image: require('../../../assets/TreeInfo.png'),
    nav: require('../../../assets/Step3.png'),
    advance: require('../../../assets/SettingInfo.png'),
    text: txtTittleThree,
    additionalText: txtSubTittleThree,
  },
];

export default function IntroductionScreen() {
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
     async function loadTutorialStatus() {
      try {
        const status = await AsyncStorage.getItem('completedIntroduction');
        if (status === 'completed') {
          setTutorialCompleted(true);
        }
      } catch (error) {
        console.log('Error loading tutorial status', error);
      }
    }
    loadTutorialStatus();
  }, []); 

  const handleAdvance = () => {
    if (currentComponentIndex < componentsData.length - 1) {
      setCurrentComponentIndex(currentComponentIndex + 1);
    } else {
      setTutorialCompleted(true);
      AsyncStorage.setItem('completedIntroduction', 'completed');
      navigation.navigate('Login'); 
    }
  }

  const handleGoBack = () => {
    if (currentComponentIndex > 0) {
      setCurrentComponentIndex(currentComponentIndex - 1);
    }
  };

  const currentComponentData = componentsData[currentComponentIndex];

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TouchableOpacity style={styles.skipButton} onPress={handleAdvance}>
          <Text style={styles.skipText}>{tutorialCompleted ? 'Concluído' : 'Pular'}</Text>
        </TouchableOpacity>
        <Image
          source={currentComponentData.image}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.imageText}>{currentComponentData.text}</Text>
          <Text style={styles.additionalText}>{currentComponentData.additionalText}</Text>
        </View>
        <View style={styles.bottomContainer}>
          {currentComponentIndex > 0 ? (
            <TouchableOpacity style={styles.advanceButtonLeft} onPress={handleGoBack}>
              <Text style={styles.additionalText}>{txtBack}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.advanceButtonLeft} onPress={handleGoBack}>
              <Text style={styles.additionalText}></Text>
            </TouchableOpacity>
          )}
          <View style={styles.iconContainer}>
            <Image
              source={currentComponentData.nav}
              style={styles.nav1}
            />
          </View>
          <TouchableOpacity style={styles.advanceButton} onPress={handleAdvance}>
            <Image
              source={currentComponentData.advance}
              style={styles.avan1}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor,
  },
  skipButton: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  skipText: {
    fontSize: 16,
    color: terciaryColor,
  },
  image: {
    width: 382,
    height: 335,
    resizeMode: 'cover',
  },
  textContainer: {
    marginHorizontal: 24,
  },
  imageText: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: tittleForms,
  },
  additionalText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: terciaryColor,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 24,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav1: {
    width: 44,
    height: 6,
    resizeMode: 'cover',
  },
  avan1: {
    width: 74,
    height: 74,
    resizeMode: 'cover',
  },
  advanceButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  advanceButtonLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
