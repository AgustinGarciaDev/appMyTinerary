import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useEffect } from 'react'

import { HomeStack, CitiesStack, SignInStack, SignUpStack } from './Stack'
import { connect } from 'react-redux';
import userActions from '../ReduxStore/Action/userAction'
import AsyncStorage from '@react-native-async-storage/async-storage';
const drawer = createDrawerNavigator()

const Drawer = (props) => {

    useEffect(() => {
        loginLocalStoreUser()
    }, [])

    const loginLocalStoreUser = async () => {

        if (!props.usuarioStatus && AsyncStorage.getItem('token')) {

            const tokenAsyncStorage = await AsyncStorage.getItem('token')
            const infoUser = await AsyncStorage.getItem('userLogged')
            const infoUserConvert = JSON.parse(infoUser)
            const userLoggedInfo = {
                token: tokenAsyncStorage,
                ...infoUserConvert
            }
            props.forzarLoginLocalStore(userLoggedInfo)

            return null
        }
    }
    return (
        <drawer.Navigator>
            <drawer.Screen name="Home" component={HomeStack} />
            <drawer.Screen name="Cities" component={CitiesStack} />
            <drawer.Screen name="SignIn" component={SignInStack} />
            <drawer.Screen name="SignUp" component={SignUpStack} />
            <drawer.Screen name="Sign Out" component={SignUpStack} />
        </drawer.Navigator>
    )
}


const mapStateToProps = (state) => {

    return {
        usuarioStatus: state.user.usuarioStatus
    }
}

const mapDispatchToProps = {

    forzarLoginLocalStore: userActions.forzarLoginLocalStore
}


export default connect(mapStateToProps, mapDispatchToProps)(Drawer)