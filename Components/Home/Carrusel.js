import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Carrusel = () => {
    const city = [
        { id: 1, nombre: "Paris", url: 'http://baravdg.com/wp-content/uploads/2021/04/pexels-thorsten-technoman-338515-scaled.jpg' },
        { id: 2, nombre: "Queenstown", url: 'http://baravdg.com/wp-content/uploads/2021/04/pexels-ketan-kumawat-724963-scaled.jpg' },
        { id: 3, nombre: "Rio de Janeiro", url: 'http://baravdg.com/wp-content/uploads/2021/04/rio-de-janeiro-1963744_1920.jpg' },
        { id: 4, nombre: "San Francisco", url: 'http://baravdg.com/wp-content/uploads/2021/04/san-francisco-1116316_1280.jpg' },
        { id: 5, nombre: "Osaka", url: 'http://baravdg.com/wp-content/uploads/2021/04/Paisaje_-9.png' },
        { id: 6, nombre: "Bruges", url: 'http://baravdg.com/wp-content/uploads/2021/04/pexels-barb-duggan-3633115-scaled.jpg' },
        { id: 7, nombre: "Florence", url: 'http://baravdg.com/wp-content/uploads/2021/04/Paisaje_-6.png' },
        { id: 8, nombre: "Istanbul", url: 'http://baravdg.com/wp-content/uploads/2021/04/pexels-caner-cankisi-3999943-scaled.jpg' },
        { id: 9, nombre: "Rome", url: 'http://baravdg.com/wp-content/uploads/2021/04/rome-4087275_1920.jpg' },
        { id: 10, nombre: "Seville", url: 'http://baravdg.com/wp-content/uploads/2021/04/Diseno-sin-titulo-2.png' },
        { id: 11, nombre: "Amsterdam", url: 'http://baravdg.com/wp-content/uploads/2021/04/pexels-harvey-1790573-scaled.jpg' },
        { id: 12, nombre: "London", url: 'http://baravdg.com/wp-content/uploads/2021/04/pexels-pixabay-460672.jpg' },
    ]

    const _renderItem = ({ item, index }) => {
        return (
            < View key={item.id} style={styles.slide} >
                <ImageBackground source={{ uri: item.url }} style={styles.image}>
                    <Text style={styles.text}  >{item.nombre}</Text>
                </ImageBackground>
            </View >
        )
    }

    return (
        <View style={styles.containerCarrusel}>
            <Carousel
                ref={(c) => { _carousel = c; }}
                data={city}
                sliderWidth={500}
                itemWidth={400}
                renderItem={_renderItem}
                layout={"stack"}
                loop={true}
                autoplay={true}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    image: {
        resizeMode: "cover",
        justifyContent: "center",
        height: 300,
        width: "90%"
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        backgroundColor: "#000000a0",
        width: 324,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    containerCarrusel: {
        marginBottom: 20,
        marginTop: 20,
    },


});
export default Carrusel