import React from 'react';
import { StyleSheet, View } from "react-native"
import LottieView from 'lottie-react-native';
const LoadingCity = () => {

    return (
        <View>
            <LottieView
                style={styles.notFoundLottie}
                source={require("../../assets/animation/lf20_hwaovz1d.json")}
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

export default LoadingCity