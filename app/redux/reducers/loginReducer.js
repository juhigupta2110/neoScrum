import {Types} from '../actions/users';

const loginReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      return state.map((user) =>
        user.email === action.payload.email
          ? {...user, loginStatus: true}
          : [
              ...state,
              {
                email: action.payload.email,
                loginStatus: true,
                token: action.payload.token,
                username: action.payload.username,
                feedbacks: action.payload.feedbacks,
              },
            ],
      );

    case 'ADD_NAME':
      return state.map((user) =>
        user.email === action.payload.email
          ? {...user, username: action.payload.username}
          : user,
      );

    case 'LOGOUT':
      return state.map((user) =>
        user.email === action.email ? {...user, loginStatus: false} : user,
      );

    default:
      return state;
  }
};

export default loginReducer;
