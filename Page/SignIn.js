import React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from "react-redux";
import userActions from '../ReduxStore/Action/userAction'
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import * as Facebook from 'expo-facebook';
import { Icon } from 'react-native-elements'
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

    const sendForm = async (e = null, facebokUser = null) => {

        let user = e ? infoUser : facebokUser
        if (user.email === "" || user.password === "") {
            Toast.show({
                text1: error.message,
                type: 'error',
                position: 'The fields must be complete',
            })
        } else {
            const respuesta = await props.signInUser(user)
            if (respuesta) {
                respuesta.details.map(error => {
                    return (
                        Toast.show({
                            text1: error.message,
                            type: 'error',
                            position: 'bottom',
                        })
                    )
                })
            } else {
                Toast.show({
                    text1: 'Welcome👋',
                    position: 'bottom',
                });
                props.navigation.navigate('Home')
            }
        }


    }

    async function logIn() {
        try {
            await Facebook.initializeAsync({
                appId: process.env.REACT_APP_FACEBOOK_ID,
            });
            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?fields=id,first_name,email,last_name,picture&access_token=${token}`);
                const dataUser = await response.json()
                sendForm(null, {
                    email: !dataUser.email ? 'correoPrueba@gmail.com' : dataUser.email,
                    password: process.env.REACT_APP_USER_PASS,
                })


            } else {
                Toast.show({
                    text1: 'Error try to login again',
                    type: 'error',
                    position: 'bottom',
                })
            }
        } catch ({ message }) {
            Toast.show({
                text1: message,
                type: 'error',
                position: 'bottom',
            })
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
                        secureTextEntry={true}
                        onChangeText={(e) => changeValueInput(e, 'password')}
                    />
                </View>
                <TouchableOpacity
                    onPress={sendForm}
                    style={styles.button}
                    activeOpacity={.7}
                >
                    <Text style={styles.text}>Sign In</Text>
                </TouchableOpacity >
                <TouchableOpacity
                    onPress={logIn}
                    style={styles.buttonFacebook}
                    activeOpacity={.7}
                >
                    <Icon style={{ marginRight: 10 }} name='facebook' type='font-awesome-5' size={35} color='white' />
                    <Text style={styles.text}>Sign in with Facebok</Text>
                </TouchableOpacity >
                <TouchableOpacity
                    style={styles.buttonSignIn}
                    activeOpacity={.7}
                    onPress={() => { props.navigation.navigate('SignUp') }}
                >
                    <Text style={styles.textSignIn}>Not a member? Sign up now</Text>
                </TouchableOpacity >
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
        width: "80%",
        height: 50,
        zIndex: 1
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    buttonFacebook: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        marginTop: 20,
        backgroundColor: '#0D88F0',
        width: "80%",
        height: 50,
        zIndex: 1,
        flexDirection: 'row',
        marginBottom: 10
    },
    buttonSignIn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 10,
        borderStyle: 'solid',
        borderColor: 'black',
        width: "80%",
        height: 50,
        zIndex: 1,
        marginBottom: 20,
        borderWidth: 2
    },
    textSignIn: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    }


});

const mapDispatchToProps = {
    signInUser: userActions.signInUser
}
export default connect(null, mapDispatchToProps)(SignIn)