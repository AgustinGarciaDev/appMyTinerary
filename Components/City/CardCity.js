import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
const CardCity = (props) => {

    const { nombre, url } = props.city

    return (

        <View>
            <ImageBackground style={styles.containerCity} source={{ uri: url }} >
                <Text style={styles.text}>{nombre}</Text>
            </ImageBackground>
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
        width: 335,
        textAlign: "center",
        /* fontFamily: "Poppins-Bold" */
    },
    containerCity: {
        width: "90%",
        height: 300,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'flex-end'
    }

});
export default CardCity