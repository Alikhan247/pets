import {ADOPT_PET, GET_PETS, SET_CURRENT_USER} from "../actions/types"

const initialState = {
    pets: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PETS:
            return {
                ...state,
                pets: action.payload
            }
        case ADOPT_PET:
            return {
                ...state,
                pets: action.payload
            }
        default:
            return state
    }
}