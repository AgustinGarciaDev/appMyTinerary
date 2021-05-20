import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, ImageBackground } from 'react-native';
import { connect } from "react-redux";
const SignIn = (props) => {

    return (
        <ImageBackground style={styles.containerForm} source={{ uri: "http://baravdg.com/wp-content/uploads/2021/04/pexels-pixabay-164336-scaled.jpg" }}>
            <View style={styles.form}>
                <Text style={styles.titleForm}>Sign In!</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                    />
                </View>
                <Pressable style={styles.button} >
                    <Text style={styles.text}>Sign In</Text>
                </Pressable>
            </View>
        </ImageBackground>


    )
}
const styles = StyleSheet.create({

    containerForm: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: 'center',

    },
    form: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: 'center',
        width: "70%",
        borderRadius: 20

    },
    titleForm: {
        fontSize: 30,
        color: "#000e19",
        fontWeight: "bold",
        textAlign: "left"
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        padding: 10,
        borderRadius: 2,
        borderColor: "#000e19",
        borderStyle: "solid",
        textAlign: "center",
        borderWidth: 1,
        borderRadius: 10

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        marginTop: 20,
        backgroundColor: 'black',
        width: 120,
        height: 40
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },


});
export default SignIn