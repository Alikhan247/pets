import axios from 'axios'
import jwt_decode from "jwt-decode";
import {SET_CURRENT_USER} from "../store/actions/types";
// export default function (token) {
//     if (token){
//         axios.defaults.headers.common['Authorization'] = `${token}`
//     } else {
//         delete axios.defaults.headers.common['Authorization']
//     }
// }

export function refresh(token, dis) {
    if (token){
        console.log("updating...")
        update(token)(dis)
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

const update = (token) => dispatch => {
    console.log("updating...")
    axios.post('/api/token/refresh/', token)
        .then(res => {
            console.log("updated: ", res.data)
            console.log('ref',localStorage.getItem("tokens").refresh)
            console.log('acc',JSON.stringify(res.data.access))
            const tokens = {
                access: res.data.access,
                refresh: token.refresh
            }
            localStorage.setItem('tokens', JSON.stringify(tokens))

            console.log("thattt", JSON.parse(localStorage.getItem('tokens')).access)

            axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('tokens')).access}`
            const payload = jwt_decode(res.data.access)
            console.log("th ", payload)
            console.log(payload)
            dispatch({
                type: SET_CURRENT_USER,
                payload: payload.user_id
            })
        })
        .catch(err => {
            console.log(err)
        })
}

