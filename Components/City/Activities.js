import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ImageBackground } from 'react-native';
import itineraryAction from '../../ReduxStore/Action/ItineraryAction'
import { Text } from 'react-native-elements';
import { connect } from "react-redux";

const Activities = (props) => {

    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(true)
    const { idItinerary } = props

    useEffect(() => {
        respuesta()
    }, [])

    const respuesta = async () => {
        const response = await props.loadActivities(idItinerary)
        setActivities(response)
        setLoading(!loading)
    }

    if (loading) {
        <Text>Loading</Text>
    }
    return (
        <View>
            {activities.map(activity => {
                return (
                    <ImageBackground style={styles.containerCity} source={{ uri: activity.pic }} key={activity._id}>
                        <View style={styles.backDrop}>
                            <Text style={styles.text}>
                                {activity.title}
                            </Text>
                        </View>
                    </ImageBackground >
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({

    image: {
        resizeMode: "cover",
        justifyContent: "center",
        height: 300,
        width: "100%"
    },
    backDrop: {
        backgroundColor: "#000000a0",
        width: "100%",
        height: "10%",
        justifyContent: 'center',
    },
    text: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
        textAlign: 'center'
    },
    containerCity: {
        width: "100%",
        height: 300,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }

});


const mapDispatchToProps = {

    loadActivities: itineraryAction.loadActivities
}

export default connect(null, mapDispatchToProps)(Activities)