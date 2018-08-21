export default reducers = (state = {
    loggedIn: false,
    user: {
		  id: '',
		  photoUrl: '',
		  name: '',
		  aboutMe: ' ',
		  chats: ' ',
		  geocode: ' ',
		  images: [],
		  notification: false,
		  show: false,
		  report: false,
		  swipes: [],
		  token: ' ',
    }
  }, action) => {
    switch (action.type) {
      case 'LOGIN': {
        return { ...state, user: { ...state.user, ...action.user }, loggedIn: action.loggedIn }
      }
      case 'LOGOUT': {
        return { ...state, user: { ...state.user, ...action.user }, loggedIn: false }
      }
    }
    return state;
}