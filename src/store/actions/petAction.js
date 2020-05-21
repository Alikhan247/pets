import {ADOPT_PET, GET_PETS, SET_CURRENT_USER} from "./types";
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import setAuthToken from "../../common/setAuthToken";

const qs = require('querystring')

export const getPets = () => dispatch => {
    axios.get('/pet')
        .then(res => {
            const payload = res.data

            console.log(payload)

            dispatch({
                type: GET_PETS,
                payload: payload
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const adopt = (pet) => dispatch => {
    axios.post('/users/adopt', qs.stringify( pet))
        .then(res => {
            const payload = res.data

            console.log("payload?")

            // dispatch({
            //     type: ADOPT_PET,
            //     payload: payload
            // })
        })
        .catch(err => {
            console.log(err)
        })
        .finally( e =>{

            console.log("Hohlj")
        }      )
}