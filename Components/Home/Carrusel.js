import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Carousel from "react-native-snap-carousel";

const Carrusel = () => {
  const city = [
    {
      id: 1,
      nombre: "Paris",
      url: "https://user-images.githubusercontent.com/66225450/151682393-bafb3c8c-6bab-4d40-b6f9-56839f765651.jpg",
    },
    {
      id: 2,
      nombre: "Queenstown",
      url: "https://user-images.githubusercontent.com/66225450/151682465-46dff98b-6bfe-4f19-abe2-06e3551f608d.jpg",
    },
    {
      id: 3,
      nombre: "Rio de Janeiro",
      url: "https://user-images.githubusercontent.com/66225450/151682478-b50121eb-e66a-4dd6-9f25-5da42d6d4678.jpg",
    },
    {
      id: 4,
      nombre: "San Francisco",
      url: "https://user-images.githubusercontent.com/66225450/151682488-e1149507-c964-4dbc-97ca-eb329db732cc.jpg",
    },
    {
      id: 5,
      nombre: "Osaka",
      url: "https://user-images.githubusercontent.com/66225450/151682520-d24e7dcb-646e-452d-9b9d-d91d7ec63029.jpg",
    },
    {
      id: 6,
      nombre: "Bruges",
      url: "https://user-images.githubusercontent.com/66225450/151682545-f90d50ba-6bcb-481f-b6b1-7c5a95baf282.jpg",
    },
    {
      id: 7,
      nombre: "Florence",
      url: "https://user-images.githubusercontent.com/66225450/151682562-fa39aa1f-28ef-412c-b81c-75fed5db3347.jpg",
    },
    {
      id: 8,
      nombre: "Istanbul",
      url: "https://user-images.githubusercontent.com/66225450/151682670-61a1af22-c2ef-4a7a-ac01-63f2eaab8ece.jpg",
    },
    {
      id: 9,
      nombre: "Rome",
      url: "https://user-images.githubusercontent.com/66225450/151682686-b0a9e64a-4215-49f7-9d6f-c87479d1b56f.jpg",
    },
    {
      id: 10,
      nombre: "Seville",
      url: "https://user-images.githubusercontent.com/66225450/151682700-4793bb18-7d87-4c17-b097-d0e3e2cf5bf0.jpg",
    },
    {
      id: 11,
      nombre: "Amsterdam",
      url: "https://user-images.githubusercontent.com/66225450/151682727-43a6886c-6717-4a4c-941d-f16bf982a42a.jpg",
    },
    {
      id: 12,
      nombre: "London",
      url: "https://user-images.githubusercontent.com/66225450/151682716-11876ad9-e6f9-412e-91c4-567a36547458.jpg",
    },
  ];

  const _renderItem = ({ item, index }) => {
    return (
      <View key={item.id} style={styles.slide}>
        <ImageBackground source={{ uri: item.url }} style={styles.image}>
          <Text style={styles.text}>{item.nombre}</Text>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.containerCarrusel}>
      <Carousel
        ref={(c) => {
          _carousel = c;
        }}
        data={city}
        sliderWidth={500}
        itemWidth={400}
        renderItem={_renderItem}
        layout={"stack"}
        loop={true}
        autoplay={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    height: 300,
    width: "90%",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    backgroundColor: "#000000a0",
    width: 324,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  containerCarrusel: {
    marginBottom: 20,
    marginTop: 20,
  },
});
export default Carrusel;
