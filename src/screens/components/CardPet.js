import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
//import Swiper from "react-native-swiper";
import { backgroundColor, secondaryColor, terciaryColor, tittleForms, primaryColor } from '../../utils/colors';

const data = [
    { name: "John Doe", nickname: "Johnny", image: require('../../../assets/ImgHome.png'), additionalImage:require('../../../assets/hearth.png')  },
    { name: "Jane Doe", nickname: "Janie", image: require('../../../assets/ImgHome.png'), additionalImage:require('../../../assets/hearth.png')  },
    { name: "John Doe", nickname: "Johnny", image: require('../../../assets/ImgHome.png'), additionalImage:require('../../../assets/hearth.png')  },
    { name: "Jane Doe", nickname: "Janie", image: require('../../../assets/ImgHome.png'), additionalImage:require('../../../assets/hearth.png')  },
    { name: "John Doe", nickname: "Johnny", image: require('../../../assets/ImgHome.png'), additionalImage:require('../../../assets/hearth.png')  },
    { name: "Jane Doe", nickname: "Janie", image: require('../../../assets/ImgHome.png'), additionalImage:require('../../../assets/hearth.png')  },
    // Adicione mais dados conforme necessário
];

const Card = ({ name, nickname, image, additionalImage}) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={additionalImage} style={styles.additionalImage} />
            <Image source={image} style={styles.cardImage} />
            <Text style={styles.cardText}>{name}</Text>
            <Text style={styles.cardSubTitle}>{nickname}</Text>
        </View>
    );
};

const CardPet = () => {
    const renderCards = () => {
        const cards = [];
        for (let i = 0; i < data.length; i += 2) {
            const card1 = data[i];
            const card2 = data[i + 1];
            cards.push(
                <View key={i} style={styles.slide}>
                    <View style={styles.cardRow}>
                        <Card {...card1} />
                        {card2 && <Card {...card2} />}
                    </View>
                </View>
            );
        }
        return cards;
    };

/*     return (
        <Swiper
            style={styles.wrapper}
            showsButtons={false}
            loop={false}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
        >
            {renderCards()}
        </Swiper>
    ); */
};

const styles = StyleSheet.create({
    wrapper: {
        height: 182,
    },
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    cardContainer: {
        width: 137,
        height: 180,
        alignItems: "center",
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        elevation: 2,
        marginHorizontal: 10,
    },
    additionalImage: {
        position: "absolute",
        top: 16,
        right:10,
        width: 10,
        height: 10,
        resizeMode: "cover",
      },
    cardImage: {
        width: 64,
        height: 64,
        borderRadius: 40,
        marginBottom: 10,
        marginTop: 10
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: tittleForms,
    },
    cardSubTitle: {
        fontSize: 14,
        color: terciaryColor,
    },
    dot: {
        backgroundColor: "rgba(255,255,255,.3)",
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
    },
    activeDot: {
        backgroundColor: primaryColor,
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
        bottom: -44,
    },
});

export default CardPet;
