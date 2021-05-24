import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, ImageBackground } from 'react-native';
import { connect } from "react-redux";
import itineraryActions from '../ReduxStore/Action/ItineraryAction';
import Itinerary from '../Components/City/Itinerary';
const City = (props) => {


    const [foundCity, setFoundCity] = useState({
        loading: true,
        city: null
    })


    useEffect(() => {
        const idCity = props.route.params.id
        if (!(props.cities.length === 0)) {
            let searchCity = props.cities.find(ciudad => ciudad._id === idCity)
            setFoundCity({ loading: false, city: searchCity })
        }
        props.loadItinerary(idCity)
    }, [])

    const { loading, city } = foundCity

    if (loading) {

        return <Text>Loading!</Text>
    }

    return (
        <ScrollView>
            <ImageBackground style={styles.containerCity} source={{ uri: city.url }} >
                <View style={styles.backDrop}>
                    <Text style={{ textAlign: 'center', fontFamily: "Poppins_700Bold", fontSize: 62, color: "white" }}>
                        {city.nombre}
                    </Text>
                </View>
            </ImageBackground>
            <View>
                {props.itinerary.map(item => <Itinerary key={item._id} itinerary={item} />)}
            </View>
        </ScrollView>
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
        height: "100%",
        justifyContent: 'center',

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

const mapStateToProps = state => {

    return {
        itinerary: state.itinerary.itinerary,
        cities: state.cities.cities,
    }

}

const mapDispatchToProps = {

    loadItinerary: itineraryActions.loadItinerary
}





export default connect(mapStateToProps, mapDispatchToProps)(City)

