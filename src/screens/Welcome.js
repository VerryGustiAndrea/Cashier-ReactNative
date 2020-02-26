import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor="#0053AD"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        <Image
          style={{width: 400, height: 200, top: 180}}
          source={require('../images/logo.png')}
        />
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={{color: 'white', position: 'absolute', bottom: 40}}>
          {' '}
          Credit Viwi App 2020{' '}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:-20,
    paddingTop: 150,
    // justifyContent:'center',

    alignItems: 'center',
    backgroundColor: '#0053AD',
  },

  inputBox: {
    width: 300,

    backgroundColor: 'rgba(255, 255,255,0.2)',

    borderRadius: 25,

    paddingHorizontal: 16,

    fontSize: 16,

    color: '#ffffff',

    marginVertical: 10,
  },

  button: {
    width: 300,

    backgroundColor: '#1c313a',

    borderRadius: 25,

    marginVertical: 10,

    paddingVertical: 13,

    // position: 'absolute',
    bottom: -500,
  },

  buttonText: {
    fontSize: 16,

    fontWeight: '500',

    color: '#ffffff',

    textAlign: 'center',
  },
});
