import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userActions = {
  createUser: (datosUsuario) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(
          "https://my-tinerary2021.herokuapp.com/api/user/signUp",
          datosUsuario
        );
        if (!response.data.success) {
          return response.data.errores;
        }
        await AsyncStorage.setItem(
          "userLogged",
          JSON.stringify({
            foto: response.data.respuesta.foto,
            name: response.data.respuesta.name,
          })
        );
        await AsyncStorage.setItem("token", response.data.respuesta.token);
        dispatch({
          type: "LOGUEAR_USUARIO",
          payload: response.data.success ? response.data.respuesta : null,
        });
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    };
  },

  signInUser: (datosUsuario) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(
          "https://my-tinerary2021.herokuapp.com/api/user/signIn",
          datosUsuario
        );
        if (!response.data.success) {
          return response.data.error;
        }
        await AsyncStorage.setItem(
          "userLogged",
          JSON.stringify({
            foto: response.data.respuesta.foto,
            name: response.data.respuesta.name,
          })
        );
        await AsyncStorage.setItem("token", response.data.respuesta.token);
        dispatch({
          type: "LOGUEAR_USUARIO",
          payload: response.data.success ? response.data.respuesta : null,
        });
      } catch (error) {
        console.log(error);
      }
    };
  },

  signOutUser: () => {
    return async (dispatch, getState) => {
      await AsyncStorage.clear();
      dispatch({ type: "DESLOGUEAR_USUARIO" });
    };
  },

  forzarLoginLocalStore: (usuarioLoguedo) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get(
          "https://my-tinerary2021.herokuapp.com/api/user/loginLocalStore",
          {
            headers: {
              Authorization: "Bearer " + usuarioLoguedo.token,
            },
          }
        );

        dispatch({
          type: "LOGUEAR_USUARIO",
          payload: {
            ...response.data.respuesta,
            token: usuarioLoguedo.token,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
  },
};

export default userActions;
