import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, ImageBackground, Alert } from 'react-native';
import { connect } from "react-redux";
import SelectPicker from 'react-native-form-select-picker';
import { useState } from 'react';
import userActions from '../ReduxStore/Action/userAction'
import Toast from 'react-native-toast-message';
import axios from 'axios'
import * as Facebook from 'expo-facebook';
import { Icon } from 'react-native-elements'
const SignUp = (props) => {

    const [countries, setCountries] = useState([]);
    const [infoUser, setInfoUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userPic: "",
        country: "",
    })


    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(response => setCountries(response.data))
            .catch(error => console.log(error))

    }, [])

    const changeValueInput = (e, campo) => {
        setInfoUser({
            ...infoUser,
            [campo]: e
        })
    }

    const sendForm = async (e = null, facebokUser = null) => {
        let user = e ? infoUser : facebokUser
        if (user.firstName === "" || user.lastName === "" || user.email === "" || user.password === "" || user.userPic === "" || user.country === "") {
            Toast.show({
                text1: 'Los campos deben estar completos',
                type: 'error',
                position: 'bottom',
            });
            console.log("hola")
        } else {
            const respuesta = await props.createUser(user)
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
                appId: '768205227393989',
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
                    firstName: dataUser.first_name,
                    lastName: dataUser.last_name,
                    email: !dataUser.email ? 'correoPrueba@gmail.com' : dataUser.email,
                    password: "Hola1234!",
                    userPic: dataUser.picture.data.url,
                    country: "Argentina",
                })


            } else {
                Toast.show({
                    text1: 'Hubo un problema al loguearse',
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
        <ImageBackground style={styles.containerForm} source={{ uri: "http://baravdg.com/wp-content/uploads/2021/04/pexels-julius-silver-753337.jpg" }}>
            <View style={styles.form}>
                <Text style={styles.titleForm}>Sign Up!</Text>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={infoUser.name}
                        onChangeText={(e) => changeValueInput(e, 'firstName')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={infoUser.lastName}
                        onChangeText={(e) => changeValueInput(e, 'lastName')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={infoUser.email}
                        onChangeText={(e) => changeValueInput(e, 'email')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Pic Url"
                        value={infoUser.userPic}
                        onChangeText={(e) => changeValueInput(e, 'userPic')}
                    />
                    <SelectPicker default="Choose a country"
                        onValueChange={(e) => changeValueInput(e, "country")}
                        placeholderStyle={{ color: 'black' }}
                        label="Country"
                        style={styles.input}
                        placeholder='Country'
                    >
                        {countries.map((country) => (<SelectPicker.Item label={country.name} value={country.name} key={country.name} />))}
                    </SelectPicker>
                    <TextInput
                        style={styles.input}
                        value={infoUser.password}
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={(e) => changeValueInput(e, 'password')}
                    />
                </View>
                <Pressable onPress={sendForm} style={styles.button} >
                    <Text style={styles.text}>Sign Up</Text>
                </Pressable>
                <Pressable onPress={logIn} style={styles.buttonFacebook} >
                    <Icon style={{ marginRight: 10 }} name='facebook' type='font-awesome-5' size={35} color='white' />
                    <Text style={styles.text}>Sign up With Facebok</Text>
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
        width: 230,
        margin: 12,
        padding: 10,
        borderRadius: 2,
        borderColor: "#000e19",
        borderStyle: "solid",
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
        marginBottom: 50
    }


});


const mapStateToProps = state => {

    return {
        usuarioStatus: state.user.usuarioStatus
    }

}

const mapDispatchToProps = {
    createUser: userActions.createUser
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)