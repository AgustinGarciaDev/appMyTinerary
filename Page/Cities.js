import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import CardCity from "../Components/City/CardCity";
import citiesActions from "../ReduxStore/Action/citiesAction";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import CityNotFound from "../Components/City/CityNotFound";
import LoadingCity from "../Components/City/LoadingCity";

const Cities = (props) => {
  const { loadCities, cities, foundCity, searchCity } = props;
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCities();
  }, []);

  const updateSearch = (search) => {
    searchCity(search);
    setSearch(search);
  };
  return (
    <ScrollView>
      <StatusBar backgroundColor="#61dafb" />
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://user-images.githubusercontent.com/66225450/151713313-c8a1c2f2-41a3-4891-b55f-8cc63880c44a.png",
          }}
          style={styles.video}
        />
        <View style={styles.heroText}>
          <Text style={styles.title}>Search cities!</Text>
        </View>
      </View>
      <SearchBar
        placeholder="Search City..."
        onChangeText={updateSearch}
        value={search}
        platform="ios"
        containerStyle={styles.input}
      />
      <View style={styles.containerCities}>
        {cities.length === 0 ? (
          <LoadingCity />
        ) : foundCity.length === 0 ? (
          <CityNotFound />
        ) : (
          foundCity.map((city) => (
            <CardCity
              navigation={props.navigation}
              city={city}
              key={city._id}
            />
          ))
        )}
      </View>
    </ScrollView>
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
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
  },
  video: {
    width: "100%",
    height: 300,
  },
  heroText: {
    position: "absolute",
  },
  btnHero: {
    backgroundColor: "#032e50",
    width: "40%",
    height: "30%",
    color: "white",
    alignItems: "center",
    marginTop: 20,
  },

  containerCities: {
    alignItems: "center",
    marginTop: 40,
  },
});

const mapStateToProps = (state) => {
  return {
    cities: state.cities.cities,
    foundCity: state.cities.foundCity,
  };
};

const mapDispatchToProps = {
  loadCities: citiesActions.loadCities,
  searchCity: citiesActions.searchCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
