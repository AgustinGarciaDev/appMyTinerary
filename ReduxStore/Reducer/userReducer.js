const initialState = {
  usuarioStatus: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGUEAR_USUARIO":
      return {
        ...state,
        usuarioStatus: action.payload,
      };
      break;
    case "DESLOGUEAR_USUARIO":
      return {
        ...state,
        usuarioStatus: null,
      };
      break;

    default:
      return state;
  }
};

export default userReducer;
