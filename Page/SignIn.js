import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, ImageBackground } from 'react-native';
import { connect } from "react-redux";
import userActions from '../ReduxStore/Action/userAction'
import { useState } from 'react';

const SignIn = (props) => {

    const [infoUser, setInfoUser] = useState({
        email: "",
        password: "",
    })

    const changeValueInput = (e, campo) => {
        setInfoUser({
            ...infoUser,
            [campo]: e
        })
    }

    const sendForm = async () => {

        let user = infoUser
        if (user.email === "" || user.password === "") {
            console.log("los campos deben estar completos")

        } else {
            console.log("entre a enviar la accion")
            const respuesta = await props.signInUser(user)

            if (respuesta) {
                console.log("llego a la respuesta")
                console.log(respuesta.data)
                /*  setErrores() */
            } else {
                /*  toast.success("👋 Welcome", {
                     onClose: () => {
                         props.history.push('/')
                     },
 
                 }) */
                console.log("Logueo exitoso")
            }
        }


    }



    return (
        <ImageBackground style={styles.containerForm} source={{ uri: "http://baravdg.com/wp-content/uploads/2021/04/pexels-pixabay-164336-scaled.jpg" }}>
            <View style={styles.form}>
                <Text style={styles.titleForm}>Sign In!</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={infoUser.email}
                        onChangeText={(e) => changeValueInput(e, 'email')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={infoUser.password}
                        placeholder="Password"
                        onChangeText={(e) => changeValueInput(e, 'password')}
                    />
                </View>
                <Pressable onPress={sendForm} style={styles.button} >
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

const mapDispatchToProps = {
    signInUser: userActions.signInUser
}
export default connect(null, mapDispatchToProps)(SignIn)