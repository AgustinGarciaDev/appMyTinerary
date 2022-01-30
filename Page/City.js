import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import ItineraryAction from "../ReduxStore/Action/ItineraryAction";
import Itinerary from "../Components/City/Itinerary";
import ItineraryNotFound from "../Page/ItineraryNotFound";
import LoadingCity from "../Components/City/LoadingCity";

const City = (props) => {
  const [foundCity, setFoundCity] = useState({
    loading: true,
    city: null,
  });

  useEffect(() => {
    const idCity = props.route.params.id;
    if (!(props.cities.length === 0)) {
      let searchCity = props.cities.find((ciudad) => ciudad._id === idCity);
      setFoundCity({ loading: false, city: searchCity });
    }
    props.loadItinerary(idCity);
  }, []);

  const { loading, city } = foundCity;

  if (loading) {
    return (
      <View style={styles.containerLoading}>
        <LoadingCity />
      </View>
    );
  }

  return (
    <ScrollView>
      <ImageBackground style={styles.containerCity} source={{ uri: city.url }}>
        <View style={styles.backDrop}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Poppins_700Bold",
              fontSize: 62,
              color: "white",
            }}
          >
            {city.nombre}
          </Text>
        </View>
      </ImageBackground>
      <View>
        {props.itinerary.length === 0 ? (
          <ItineraryNotFound />
        ) : (
          props.itinerary.map((item) => (
            <Itinerary key={item._id} itinerary={item} />
          ))
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    height: 300,
    width: "100%",
  },
  backDrop: {
    backgroundColor: "#000000a0",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  containerCity: {
    width: "100%",
    height: 300,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  containerLoading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    itinerary: state.itinerary.itinerary,
    cities: state.cities.cities,
  };
};

const mapDispatchToProps = {
  loadItinerary: ItineraryAction.loadItinerary,
};

export default connect(mapStateToProps, mapDispatchToProps)(City);
