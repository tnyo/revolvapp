import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { uploadImages, deleteImage, updateAbout, logout } from '../redux/actions';
import * as firebase from 'firebase';

import { 
  Text, 
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';

class Profile extends React.Component {

  deleteImage(){
    this.self.props.dispatch(deleteImage(this.self.props.user.images, this.key))
  }

  addImage(){
    // this.props.dispatch(uploadImages(this.props.user.images))
  }

  logout = () => {
    firebase.auth().signOut().then(success => {
      navigate('Profile', { name: 'Login' })
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    console.log(123, this.props);

    return (
      <ScrollView>
        <View style={[styles.container, styles.center]}>
          <View style={styles.container}>
            <Image style={styles.img} source={{uri: this.props.user.photoUrl}}/>
            <Text style={[styles.center, styles.bold]} >{this.props.user.name}</Text>
          </View>
          <View style={styles.imgRow}>
            {/*this.props.user.images.map((uri, key)=>{
              return (
                <TouchableOpacity key={{key}} onPress={this.deleteImage.bind({self: this, key: key })} >
                  <Image style={styles.img} source={{uri: uri}} />
                </TouchableOpacity>
              );
            })*/}
            <TouchableOpacity style={[styles.img, styles.center]} onPress={this.addImage.bind(this)}>
              <Ionicons name="ios-add" size={75}  style={styles.color} />
            </TouchableOpacity>
          </View>
          <Text style={styles.bold}>About</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={5}
            onChangeText={(text) => this.props.dispatch(updateAbout(text))}
            value={this.props.user.aboutMe}/>
        </View>
        <TouchableOpacity onPress={ () => this.props.dispatch(uploadImages()) }>
          <Text style={ styles.button }>Upload images</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.logout()}>
          <Text style={ styles.button }>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
    return {
      user: state.user
    };
  }

export default connect(mapStateToProps)(Profile);