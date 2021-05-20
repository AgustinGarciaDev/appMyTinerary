const inicialState = {
    cities: [],
    foundCity: [],
    ciudadBuscada: {},
    errorServer: false,
}

const citiesReducer = (state = inicialState, action) => {

    switch (action.type) {

        case 'CARGAR_CIUDADES':
            return {
                ...state,
                cities: action.payload,
                foundCity: action.payload,

            }
            break
        case 'FILTRAR_CIUDADES':
            return {
                ...state,
                foundCity: state.cities.filter(ciudad => action.payload.toLowerCase() === ciudad.nombre.slice(0, action.payload.length).toLowerCase())
            }
            break
        case 'CIUDAD_UNICA':
            return {
                ...state,
                foundCity: action.payload,
            }
            break
        case 'ERROR_SERVER':
            return {
                ...state,
                errorServer: action.payload,
            }

        default:
            return state
    }

}



export default citiesReducer