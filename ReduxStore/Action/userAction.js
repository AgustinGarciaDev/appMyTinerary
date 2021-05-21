import axios from "axios";

const userActions = {


    createUser: (datosUsuario) => {
        return async (dispatch, getState) => {

            try {
                const response = await axios.post("https://my-tinerary2021.herokuapp.com/api/user/signUp", datosUsuario)
                if (!response.data.success) {
                    return response.data.errores
                }
                dispatch({ type: 'LOGUEAR_USUARIO', payload: response.data.success ? response.data.respuesta : null })
            } catch (error) {
                console.log(error)
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
                console.log(response)
                dispatch({ type: 'LOGUEAR_USUARIO', payload: response.data.success ? response.data.respuesta : null })

            } catch (error) {
                console.log(error)
            }
        }

    },

    signOutUser: () => {

        return (dispatch, getState) => {

            dispatch({ type: 'DESLOGUEAR_USUARIO' })
            console.log("nos vimos")
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
                if (error.response.status === 401) {
                    alert("HACKING ALERT")

                }

            }


        }
    }
}

export default userActions