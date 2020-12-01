import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  SET_LOADING,
} from "../../actions/auth/authTypes";
const initialState = {
  loading: false,
  user: {},
  // loginErrors: [],
  isAuthenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
