import React from "react";
import { StyleSheet, Text, ImageBackground, Pressable } from "react-native";
const CardCity = (props) => {
  const { nombre, url, _id } = props.city;

  return (
    <Pressable onPress={() => props.navigation.navigate("City", { id: _id })}>
      <ImageBackground style={styles.containerCity} source={{ uri: url }}>
        <Text
          style={{
            color: "white",
            fontSize: 42,
            fontWeight: "bold",
            backgroundColor: "#000000a0",
            width: 350,
            textAlign: "center",
            fontFamily: "Poppins_400Regular",
          }}
        >
          {nombre}
        </Text>
      </ImageBackground>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    height: 300,
    width: "100%",
  },

  containerCity: {
    width: 350,
    height: 300,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "flex-end",
  },
});
export default CardCity;
