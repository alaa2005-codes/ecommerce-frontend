import { GET_ALL_USERS, CREATE_USER, DELETE_USER, GET_ERROR } from '../type'

const inital = {
    users: [],
    createUser: [],
    deleteUser: [],
    loading: true,
}
const userReducer = (state = inital, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            }
        case CREATE_USER:
            return {
                ...state,
                createUser: action.payload,
                loading: false,
            }
        case DELETE_USER:
            return {
                ...state,
                deleteUser: action.payload,
                loading: false,
            }
        case GET_ERROR:
            return {
                ...state,
                loading: true,
                users: action.payload,
            }
        default:
            return state;
    }
}
export default userReducer