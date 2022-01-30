import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";

const Hero = (props) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/AgustinGarciaDev/imagenes/master/homeTwo.jpg",
          }}
          style={styles.video}
        />
        <View style={styles.heroText}>
          <Text style={styles.title}>myTinerary</Text>
          <Text style={styles.text}>
            Find your perfect trip, designed by insiders who know and love their
            cities!
          </Text>
          <Button
            title="Choose destination now!"
            buttonStyle={styles.btnHero}
            onPress={() => {
              props.navigation.navigate("Cities");
            }}
          />
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 40,
            color: "#032e50",
            fontFamily: "Poppins_700Bold",
            textAlign: "center",
          }}
        >
          Popular myTineraries
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    color: "white",
    fontFamily: "Poppins_700Bold",
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  video: {
    width: "100%",
    height: 340,
  },
  heroText: {
    position: "absolute",
    marginLeft: 30,
  },
  btnHero: {
    backgroundColor: "#032e50",
    width: "52%",
    height: "50%",
    color: "white",
    alignItems: "center",
    marginTop: 20,
  },
  titleCarrusel: {
    fontSize: 35,
    color: "#032e50",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    fontFamily: "Poppins_700Bold",
  },
});
export default Hero;
