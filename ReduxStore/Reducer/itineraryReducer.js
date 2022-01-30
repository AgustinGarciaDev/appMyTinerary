const inicialState = {
  itinerary: [],
  actividades: [],
  comentarios: [],
};

const itineraryReducer = (state = inicialState, action) => {
  switch (action.type) {
    case "OBTENER_ITINERARIES":
      return {
        ...state,
        itinerary: action.payload,
      };
      break;
    case "OBTENER_ACTIVIDADES":
      {
        return {
          ...state,
          actividades: action.payload,
        };
      }
      break;
    case "OBTENER_COMENTARIOS":
      {
        return {
          ...state,
          comentarios: action.payload,
        };
      }
      break;
    case "LIMPIAR_ITINERARY":
      {
        return {
          ...state,
          itinerary: [],
        };
      }
      break;
    default:
      return state;
  }
};

export default itineraryReducer;
