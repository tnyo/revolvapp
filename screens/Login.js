import React from 'react';
import styles from '../styles'
import RootNavigator from '../navigation/RootNavigator';
import { connect } from 'react-redux';
import { login } from '../redux/actions'
import * as firebase from 'firebase';
import firebaseConfig from '../config/firebase.js';

firebase.initializeApp(firebaseConfig);

import { 
  Text, 
  View,
  TouchableOpacity
} from 'react-native';

class Login extends React.Component {
  state = {}

  componentWillMount() {
    console.log(777)
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.dispatch(login(user))
      }
    });
  }

  login = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('196148317918180', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = await firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      firebase.auth().signInWithCredential(credential).catch((error) => {
        // Handle Errors here.
        Alert.alert("Try Again")
      });
    }
  } 

  render() {
    if(this.props.loggedIn){
      console.log(1111)
      return (
        <RootNavigator/>
      )
    } else {
      console.log(22222)
      return (
        <View style={styles.loginContainer}>
          <TouchableOpacity onPress={() => this.login()}>
            <Text>LOGIN IN</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps)(Login);