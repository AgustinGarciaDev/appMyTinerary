import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from '../Page/Home'
import Cities from '../Page/Cities'
import SignIn from '../Page/SignIn'
import SignUp from '../Page/SignUp'
import CardCity from '../Components/City/CardCity'
import City from '../Page/City'
import { Button } from 'react-native'
import { Icon } from 'react-native-elements'
const stack = createStackNavigator()

export const HomeStack = ({ navigation }) => {
    return (
        <stack.Navigator>
            <stack.Screen name="Home" component={Home}
                options={{
                    headerRight: () => (
                        <Icon
                            name='bars'
                            type='font-awesome-5'
                            color='red'
                            onPress={() => navigation.openDrawer()}
                            containerStyle={{ marginRight: 25 }}

                        />
                    ),
                }}
            />
        </stack.Navigator>
    )
}

export const CitiesStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="Cities" component={Cities}
                options={{
                    headerRight: () => (
                        <Icon
                            name='bars'
                            type='font-awesome-5'
                            color='red'
                            onPress={() => navigation.openDrawer()}
                            containerStyle={{ marginRight: 25 }}

                        />
                    ),
                }}

            />
            <stack.Screen name="CardCity" component={CardCity}

                options={{
                    headerRight: () => (
                        <Icon
                            name='bars'
                            type='font-awesome-5'
                            color='red'
                            onPress={() => navigation.openDrawer()}
                            containerStyle={{ marginRight: 25 }}

                        />
                    ),
                }}
            />
            <stack.Screen name="City" component={City}

                options={{
                    headerRight: () => (
                        <Icon
                            name='bars'
                            type='font-awesome-5'
                            color='red'
                            onPress={() => navigation.openDrawer()}
                            containerStyle={{ marginRight: 25 }}

                        />
                    ),
                }}

            />
        </stack.Navigator>
    )
}

export const SignInStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="SignIn" component={SignIn}
                options={{
                    headerRight: () => (
                        <Icon
                            name='bars'
                            type='font-awesome-5'
                            color='red'
                            onPress={() => navigation.openDrawer()}
                            containerStyle={{ marginRight: 25 }}

                        />
                    ),
                }} />
        </stack.Navigator>
    )
}


export const SignUpStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="SignUp" component={SignUp}
                options={{
                    headerRight: () => (
                        <Icon
                            name='bars'
                            type='font-awesome-5'
                            color='red'
                            onPress={() => navigation.openDrawer()}
                            containerStyle={{ marginRight: 25 }}

                        />
                    ),
                }}
            />
        </stack.Navigator>
    )
}

