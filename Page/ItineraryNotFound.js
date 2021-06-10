import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from "react-native"
import LottieView from 'lottie-react-native';
const ItineraryNotFound = () => {

    return (
        <View>
            <Text
                style={{
                    fontFamily: "Poppins_400Regular",
                    textAlign: 'center',
                    fontSize: 20
                }}>
                {/* This city still has no Itinerary */}
            </Text>
            <LottieView
                style={styles.notFoundLottie}
                source={require("../assets/animation/61372-404-error-not-found.json")}
                autoPlay
                loop
            />

        </View>
    )
}

const styles = StyleSheet.create({

    notFoundLottie: {
        width: 300,
        height: 300,
    }

});

export default ItineraryNotFound