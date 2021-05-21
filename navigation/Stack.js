import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from '../Page/Home'
import Cities from '../Page/Cities'
import SignIn from '../Page/SignIn'
import SignUp from '../Page/SignUp'
import CardCity from '../Components/City/CardCity'
import City from '../Page/City'


const stack = createStackNavigator()

export const HomeStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="Home" component={Home} />
        </stack.Navigator>
    )
}

export const CitiesStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="Cities" component={Cities} />
            <stack.Screen name="CardCity" component={CardCity} />
            <stack.Screen name="City" component={City} />
        </stack.Navigator>
    )
}

export const SignInStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="SignIn" component={SignIn} />
        </stack.Navigator>
    )
}


export const SignUpStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="SignUp" component={SignUp} />
        </stack.Navigator>
    )
}

