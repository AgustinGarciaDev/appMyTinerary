import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Video } from 'expo-av';


const Hero = () => {

    return (
        <>
            <StatusBar
                backgroundColor="#61dafb"

            />
            <View style={styles.container}>
                <Video
                    source={{ uri: 'http://baravdg.com/wp-content/uploads/2021/04/heroVideo.mp4' }}
                    rate={1.0}
                    isMuted={true}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={styles.video}
                />
                <View style={styles.heroText}>
                    <Text style={styles.title}>myTinerary</Text>
                    <Text style={styles.text}>
                        Find your perfect trip, designed by insiders
                        who know and love their cities!
                    </Text>
                    <Text style={styles.btnHero}>Choose destination now!</Text>
                </View>
            </View>
            <View>
                <Text style={styles.titleCarrusel}>Popular myTineraries</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        color: "white",
        fontFamily: "Poppins_700Bold"
    },
    text: {
        fontSize: 20,
        color: "white",
        /* fontFamily: "Poppins-Black" */
    },
    video: {
        width: "100%",
        height: 340,
    },
    heroText: {
        position: "absolute"
    },
    btnHero: {
        backgroundColor: "#032e50",
        width: "40%",
        height: "30%",
        color: "white",
        alignItems: "center",
        marginTop: 20
    },
    titleCarrusel: {
        fontSize: 35,
        color: "#032e50",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
    }
});
export default Hero