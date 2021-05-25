import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const userActions = {
    createUser: (datosUsuario) => {
        return async (dispatch, getState) => {
            try {
                console.log(datosUsuario)
                const response = await axios.post("https://my-tinerary2021.herokuapp.com/api/user/signUp", datosUsuario)
                console.log(response.data)
                if (!response.data.success) {
                    return response.data.errores
                }

                await AsyncStorage.setItem('userLogged', JSON.stringify({ foto: response.data.respuesta.foto, name: response.data.respuesta.name }))
                await AsyncStorage.setItem('token', response.data.respuesta.token)
                dispatch({ type: 'LOGUEAR_USUARIO', payload: response.data.success ? response.data.respuesta : null })
            } catch (error) {
                console.log("error al crear cuenta")
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error);
            }
        }
    },

    signInUser: (datosUsuario) => {

        return async (dispatch, getState) => {
            try {
                const response = await axios.post("https://my-tinerary2021.herokuapp.com/api/user/signIn", datosUsuario)
                if (!response.data.success) {

                    return response.data.error
                }
                await AsyncStorage.setItem('userLogged', JSON.stringify({ foto: response.data.respuesta.foto, name: response.data.respuesta.name }))
                await AsyncStorage.setItem('token', response.data.respuesta.token)
                dispatch({ type: 'LOGUEAR_USUARIO', payload: response.data.success ? response.data.respuesta : null })

            } catch (error) {
                console.log(error)
            }
        }

    },

    signOutUser: () => {

        return async (dispatch, getState) => {
            await AsyncStorage.clear()
            dispatch({ type: 'DESLOGUEAR_USUARIO' })
        }
    },

    forzarLoginLocalStore: (usuarioLoguedo) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get("https://my-tinerary2021.herokuapp.com/api/user/loginLocalStore", {
                    headers: {
                        'Authorization': 'Bearer ' + usuarioLoguedo.token
                    }
                })

                dispatch({
                    type: 'LOGUEAR_USUARIO', payload: {
                        ...response.data.respuesta,
                        token: usuarioLoguedo.token
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export default userActions