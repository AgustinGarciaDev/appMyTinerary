import axios from "axios";

const itineraryActions = {
  loadItinerary: (id) => {
    return (dispatch, getState) => {
      axios
        .get("https://my-tinerary2021.herokuapp.com/api/itinerary/city/" + id)
        .then((response) =>
          dispatch({
            type: "OBTENER_ITINERARIES",
            payload: response.data.respuesta,
          })
        )
        .catch((error) => console.log(error));
    };
  },
  loadActivities: (id) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get(
          "https://my-tinerary2021.herokuapp.com/api/activity/itinerary/" + id
        );
        return response.data.respuesta.activities;
      } catch (error) {
        console.log(error);
      }
    };
  },
  cleanItinerary: () => {
    return (dispatch, getState) => {
      dispatch({ type: "LIMPIAR_ITINERARY" });
    };
  },

  addComment: (comentario, id) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(
          "https://my-tinerary2021.herokuapp.com/api/itinerary/comentario/" +
            id,
          comentario,
          {
            headers: {
              Authorization: "Bearer " + comentario.token,
            },
          }
        );

        return response.data.respuesta;
      } catch (error) {
        console.log(error);
      }
    };
  },

  deleteComment: (idComentario, id) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.delete(
          "https://my-tinerary2021.herokuapp.com/api/itinerary/comentario/" +
            id,
          { data: { id: idComentario } }
        );
        return response.data.respuesta;
      } catch (error) {
        console.log(error);
      }
    };
  },

  editComment: (id, idComentario, comment) => {
    const datosComentario = {
      idComentario: idComentario,
      comment: comment,
    };
    return async (dispatch, getState) => {
      try {
        const response = await axios.put(
          "https://my-tinerary2021.herokuapp.com/api/itinerary/comentario/" +
            id,
          datosComentario
        );
        return response.data.respuesta;
      } catch (error) {
        console.log(error);
      }
    };
  },

  likeHeart: (id, name) => {
    return async (dispatch, getState) => {
      try {
        const respuesta = await axios.post(
          "https://my-tinerary2021.herokuapp.com/api/itinerary/like/" + id,
          { data: { email: name } }
        );
        return respuesta.data.respuesta;
      } catch (error) {
        console.log(error);
      }
    };
  },
};

export default itineraryActions;
