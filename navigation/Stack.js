import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../Page/Home";
import Cities from "../Page/Cities";
import SignIn from "../Page/SignIn";
import SignUp from "../Page/SignUp";
import CardCity from "../Components/City/CardCity";
import City from "../Page/City";
import { Icon } from "react-native-elements";
const stack = createStackNavigator();

export const HomeStack = ({ navigation }) => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <Icon
              name="bars"
              type="font-awesome-5"
              color="#032e50"
              onPress={() => navigation.openDrawer()}
              containerStyle={{ marginRight: 25 }}
            />
          ),
          title: "",
        }}
      />
    </stack.Navigator>
  );
};

export const CitiesStack = ({ navigation }) => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Cities"
        component={Cities}
        options={{
          headerRight: () => (
            <Icon
              name="bars"
              type="font-awesome-5"
              color="#032e50"
              onPress={() => navigation.openDrawer()}
              containerStyle={{ marginRight: 25 }}
            />
          ),
          title: "",
        }}
      />
      <stack.Screen
        name="CardCity"
        component={CardCity}
        options={{
          headerRight: () => (
            <Icon
              name="bars"
              type="font-awesome-5"
              color="#032e50"
              onPress={() => navigation.openDrawer()}
              containerStyle={{ marginRight: 25 }}
            />
          ),
          title: "",
        }}
      />
      <stack.Screen
        name="City"
        component={City}
        options={{
          headerRight: () => (
            <Icon
              name="bars"
              type="font-awesome-5"
              color="#032e50"
              onPress={() => navigation.openDrawer()}
              containerStyle={{ marginRight: 25 }}
            />
          ),
          title: "",
        }}
      />
    </stack.Navigator>
  );
};

export const SignInStack = ({ navigation }) => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerRight: () => (
            <Icon
              name="bars"
              type="font-awesome-5"
              color="#032e50"
              onPress={() => navigation.openDrawer()}
              containerStyle={{ marginRight: 25 }}
            />
          ),
          title: "",
        }}
      />
    </stack.Navigator>
  );
};

export const SignUpStack = ({ navigation }) => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerRight: () => (
            <Icon
              name="bars"
              type="font-awesome-5"
              color="#032e50"
              onPress={() => navigation.openDrawer()}
              containerStyle={{ marginRight: 25 }}
            />
          ),
          title: "",
        }}
      />
    </stack.Navigator>
  );
};
