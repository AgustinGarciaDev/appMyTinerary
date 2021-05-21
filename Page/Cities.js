import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import CardCity from "../Components/City/CardCity"
import citiesActions from '../ReduxStore/Action/citiesAction'
import { connect } from "react-redux";

const Cities = (props) => {

    const { loadCities, cities, foundCity, searchCity } = props

    useEffect(() => {
        loadCities()
    }, [])

    return (

        <ScrollView>
            <StatusBar backgroundColor="#61dafb" />
            <View style={styles.container}>
                <Video
                    source={{ uri: 'https://myhadministracionedificios.com/wp-content/uploads/2021/04/production-ID_4507988-1-1.mp4' }}
                    rate={1.0}
                    isMuted={true}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={styles.video}
                />
                <View style={styles.heroText}>
                    <Text style={styles.title}>Search cities!</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => searchCity(e)}
                        placeholder="Search Cities"
                    />
                </View>
            </View>
            <View style={styles.containerCities}>
                {foundCity.map(city => <CardCity navigation={props.navigation} city={city} key={city._id} />)}
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        color: "black",
        /*  fontFamily: "Montserrat-Black" */
    },
    text: {
        fontSize: 20,
        color: "white",
        /* fontFamily: "Poppins-Black" */
    },
    video: {
        width: "100%",
        height: 340,
    },
    heroText: {
        position: "absolute"
    },
    btnHero: {
        backgroundColor: "#032e50",
        width: "40%",
        height: "30%",
        color: "white",
        alignItems: "center",
        marginTop: 20
    },
    input: {
        height: 40,
        margin: 12,
        backgroundColor: "white",
        padding: 10
    },
    containerCities: {
        alignItems: "center",
        marginTop: 40
    }

});


const mapStateToProps = state => {

    return {
        cities: state.cities.cities,
        foundCity: state.cities.foundCity
    }
}

const mapDispatchToProps = {

    loadCities: citiesActions.loadCities,
    searchCity: citiesActions.searchCity,
}


export default connect(mapStateToProps, mapDispatchToProps)(Cities)