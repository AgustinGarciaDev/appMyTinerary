import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
const CityNotFound = () => {
  return (
    <View>
      <Text
        style={{
          fontFamily: "Poppins_400Regular",
          textAlign: "center",
          fontSize: 40,
        }}
      >
        City not found
      </Text>
      <LottieView
        style={styles.notFoundLottie}
        source={require("../../assets/animation/11865-sad-emoji.json")}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  notFoundLottie: {
    width: 300,
    height: 300,
  },
});

export default CityNotFound;
