import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { text } from 'react-native'
import { HomeStack, CitiesStack, SignInStack, SignUpStack } from './Stack'

const drawer = createDrawerNavigator()

const Drawer = (props) => {

    return (
        <drawer.Navigator>
            <drawer.Screen name="Home" component={HomeStack} />
            <drawer.Screen name="Cities" component={CitiesStack} />
            <drawer.Screen name="SignIn" component={SignInStack} />
            <drawer.Screen name="SignUp" component={SignUpStack} />
        </drawer.Navigator>
    )
}

export default Drawer