import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Hero from "../Components/Home/Hero";
import Carrusel from "../Components/Home/Carrusel";
const Home = (props) => {
  return (
    <ScrollView>
      <Hero navigation={props.navigation} />
      <Carrusel />
    </ScrollView>
  );
};

export default Home;
