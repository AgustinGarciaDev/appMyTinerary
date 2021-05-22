import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import { HomeStack, CitiesStack, SignInStack, SignUpStack } from './Stack'
import { connect } from 'react-redux';
import userActions from '../ReduxStore/Action/userAction'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, Image } from 'react-native';
const drawer = createDrawerNavigator()
const Drawer = (props) => {

    const { signOutUser, usuarioStatus } = props
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

    const CustomDrawerContent = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                {
                    usuarioStatus
                        ? <View style={styles.containerUserFoto}>
                            <Image style={{ width: 80, height: 80, borderRadius: 100 }} source={{ uri: usuarioStatus.foto }} />
                            <Text style={styles.nameUser}>{usuarioStatus.name}</Text>
                        </View>
                        : <View style={styles.containerUserFoto}>
                            <Image style={{ width: "100%", height: 80, borderRadius: 100 }} source={{ uri: 'http://baravdg.com/wp-content/uploads/2021/05/Diseno-sin-titulo.png' }} />
                        </View>
                }
                <DrawerItemList {...props} />
                { usuarioStatus &&
                    <DrawerItem label="Sign Out" onPress={() => { signOutUser() }} />
                }
            </DrawerContentScrollView>
        );
    }


    return (

        <drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <drawer.Screen name="Home" component={HomeStack} />
            <drawer.Screen name="Cities" component={CitiesStack} />

            {
                !usuarioStatus
                && <>
                    <drawer.Screen name="SignIn" component={SignInStack} />
                    <drawer.Screen name="SignUp" component={SignUpStack} />
                </>
            }
        </drawer.Navigator>

    )
}
const styles = StyleSheet.create({

    usurPic: {
        height: 40,
        width: 40,
        borderRadius: 100
    },
    nameUser: {
        color: 'black',
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
        fontSize: 20
    },
    containerUserFoto: {
        alignItems: 'center'
    }


});

const mapStateToProps = (state) => {

    return {
        usuarioStatus: state.user.usuarioStatus
    }
}

const mapDispatchToProps = {

    forzarLoginLocalStore: userActions.forzarLoginLocalStore,
    signOutUser: userActions.signOutUser
}


export default connect(mapStateToProps, mapDispatchToProps)(Drawer)