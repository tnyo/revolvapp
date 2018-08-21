import * as firebase from 'firebase';
import { ImagePicker, Location, Permissions, Notifications } from 'expo';
import { Alert } from 'react-native';

export function login(user){
  return function(dispatch){
		let params = {
		  id: user.uid,
		  photoUrl: user.photoURL,
		  name: user.displayName,
		  aboutMe: ' ',
		  chats: ' ',
		  geocode: ' ',
		  images: [user.photoURL],
		  notification: false,
		  show: false,
		  report: false,
		  swipes: {
		    [user.uid]: false
		  },
		  token: ' ',
		}

		firebase.database().ref('cards/').child(user.uid).once('value', function(snapshot){
		  if(snapshot.val() !== null){
		    dispatch({ type: 'LOGIN', user: snapshot.val(), loggedIn: true });
		  } else {
		    firebase.database().ref('cards/' + user.uid ).update(params);
		    dispatch({ type: 'LOGIN', user: params, loggedIn: true });
		  }
		})
  }
}

export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const logout = () => ({
	type: LOGOUT_ACTION
});

export function uploadImages(images){
	return async function(dispatch){

		const permissions = await Promise.all([
			Permissions.askAsync(Permissions.CAMERA),
            Permissions.askAsync(Permissions.CAMERA_ROLL)
		]);

		if (permissions.some(({ status }) => status != 'granted' )) {
            Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );

            return;
		}

		ImagePicker.launchImageLibraryAsync({ allowsEditing: false }).then(function(result){
			console.log(110101, result);
		  var array = images;
		  array = [];
		  // if(result.uri != undefined){
		  //   const file = {
		  //     uri: result.uri,
		  //     name: result.uri,
		  //     type: "image/png"
		  //   }
		  //
		  //   const options = {
		  //     keyPrefix: "uploads/",
		  //     bucket: "tinderexpo",
		  //     region: "us-east-1",
		  //     accessKey: aws.accessKey,
		  //     secretKey: aws.secretKey,
		  //     successActionStatus: 201
		  //   }
		  //
		  //   RNS3.put(file, options).then(function(response){
		  //     if (response.status === 201){
		  //       array.push(response.body.postResponse.location)
		  //       firebase.database().ref('cards/' + firebase.auth().currentUser.uid + '/images').set(array);
		  //       dispatch({ type: 'UPLOAD_IMAGES', payload: array });
		  //     }
		  //   })
		  // }

		}).catch(err => {
			console.log(err, 200)
		})
	}
}