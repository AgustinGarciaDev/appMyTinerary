import axios from "axios";

const citiesActions = {
  loadCities: () => {
    return (dispatch, getState) => {
      axios
        .get("https://my-tinerary2021.herokuapp.com/api/ciudades")
        .then((response) =>
          dispatch({
            type: "CARGAR_CIUDADES",
            payload: response.data.respuesta,
          })
        )
        .catch((error) => dispatch({ type: "ERROR_SERVER", payload: true }));
    };
  },

  searchCity: (e) => {
    const valorInput = e.trim();

    return (dispatch, getState) => {
      dispatch({ type: "FILTRAR_CIUDADES", payload: valorInput });
    };
  },

  encontrarCiudad: (id) => {
    return (dispatch, getState) => {
      axios
        .get("https://my-tinerary2021.herokuapp.com/api/ciudad/" + id)
        .then((response) =>
          dispatch({ type: "CIUDAD_UNICA", payload: response.data.respuesta })
        )
        .catch((error) => console.log("Ciudad no encontrada"));
    };
  },
};
// Esto lo tenemos que importar para EL COMPONENTE!
export default citiesActions;
