import React, { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import itineraryAction from "../../ReduxStore/Action/ItineraryAction";
import { Text } from "react-native-elements";
import { connect } from "react-redux";

const Activities = (props) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idItinerary } = props;

  useEffect(() => {
    respuesta();
  }, []);

  const respuesta = async () => {
    const response = await props.loadActivities(idItinerary);
    setActivities(response);
    setLoading(!loading);
  };

  if (loading) {
    return null;
  }
  return (
    <View>
      {activities.map((activity) => {
        return (
          <ImageBackground
            style={styles.containerCity}
            source={{ uri: activity.pic }}
            key={activity._id}
          >
            <View style={styles.backDrop}>
              <Text style={styles.text}>{activity.title}</Text>
            </View>
          </ImageBackground>
        );
      })}
    </View>
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
    backgroundColor: "rgba(13,81,136,.6392156862745098)",
    width: "100%",
    height: "auto",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  containerCity: {
    width: "100%",
    height: 300,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

const mapDispatchToProps = {
  loadActivities: itineraryAction.loadActivities,
};

export default connect(null, mapDispatchToProps)(Activities);
