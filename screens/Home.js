import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux';
import { getCards } from '../redux/actions';
import SwipeCards from 'react-native-swipe-cards';

import { 
  Text, 
  View,
  Image
} from 'react-native';

class Card extends React.Component {
  render() {
    return (
      <View>
        <Image style={styles.card} source={{uri: this.props.image}} />
        <Text>{this.props.name}</Text>
      </View>
    )
  }
}

class NoMoreCards extends React.Component {
  render() {
    return (
      <View>
        <Text>No more cards</Text>
      </View>
    )
  }
}
class Home extends React.Component {
  state = {
    cards: [
      {name: 'fran', image: 'https://media.giphy.com/media/vcz18SLJkxr9aCXEjq/giphy.gif'},
      {name: 'jackie', image: 'https://media.giphy.com/media/12MKWSr8wJI28o/giphy.gif'},
      {name: 'phil', image: 'https://media.giphy.com/media/LI5FgV7vbGzUA/giphy.gif '},
      {name: 'jacks', image: 'https://media.giphy.com/media/OJHXUO2ngrwMo/giphy.gif'},

    ]
  };

  handleYup (card) {
    console.log(`Yup for ${card.name}`)
  }
  handleNope (card) {
    console.log(`Nope for ${card.name}`)
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.name}`)
  }
  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        stack={false}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction={false}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps)(Home);