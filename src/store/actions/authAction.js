import {SET_CURRENT_USER} from "./types";
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const loginUser = userData => dispatch => {
    axios.post('/auth', userData)
        .then(res => {
            localStorage.setItem('tokens', res.headers.authorization)
            delete axios.defaults.headers.common["Authorization"]
            axios.defaults.headers.common["Authorization"] = res.headers.authorization
            console.log(axios.defaults.headers.common)

            const payload = jwt_decode(res.headers.authorization)

            localStorage.setItem('authority', jwt_decode(res.headers.authorization).authorities[0])
            localStorage.setItem('username', jwt_decode(res.headers.authorization).sub)

            console.log(payload)

            dispatch({
                type: SET_CURRENT_USER,
                payload: payload.sub
            })
        })
        .catch(err => {
            console.log(err)
        })
}


export const logoutUser = () => dispatch => {
    localStorage.removeItem('tokens');
    dispatch({
        type: SET_CURRENT_USER,
        payload: null
    })
}

export const signupUser = userData => dispatch => {
    axios.post('/users/register', userData)
        .then(res =>{
            loginUser(userData)(dispatch)
        })
        .catch( err => {
                console.log(err)
            }
        )
}