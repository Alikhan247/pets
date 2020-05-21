import {GET_PROFILE, SET_CURRENT_USER} from "./types";
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const getProfile = userData => dispatch => {
    axios.get(`/users/name/${userData}`)
        .then(res =>{
            const payload = res.data

            console.log("did"+payload)

            dispatch({
                type: GET_PROFILE,
                payload: payload
            })
        })
        .catch(err => {
            console.log(err)
        })
}