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
import {Value} from 'react-native-reanimated';
import Index from './Index';

const URL_LOGIN = 'http://192.168.1.234:4000/api/login/loginuser/';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    login: false,
  };

  handleSubmitLogin = e => {
    e.preventDefault();
    this.postLogin();
  };

  postLogin = () => {
    let data = {
      email: this.state.email,
      password: this.state.password,
    };
    // console.warn(data)

    axios
      .post(URL_LOGIN, data)
      .then(res => {
        console.log(res.data);
        if (!res.data.token) {
          alert('Username atau Password Salah');
        } else {
          // localStorage.setItem('Token', res.data.token)
          // localStorage.setItem('id_cashier', res.data.id_user)
          // this.props.navigation.navigate('Home')
          this.setState({
            login: true,
          });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.login) {
      return <Index />;
    } else {
      return (
        <View style={styles.container}>
          <StatusBar
            hidden={false}
            backgroundColor="#0053AD"
            translucent={false}
            networkActivityIndicatorVisible={true}
          />

          <Image
            style={{width: 300, height: 200}}
            source={require('../images/logo.png')}
          />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email"
            placeholderTextColor="#ffffff"
            selectionColor="#fff"
            keyboardType="email-address"
            onChangeText={e => this.setState({email: e})}
            value={this.state.email}
          />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#ffffff"
            onChangeText={e => this.setState({password: e})}
            value={this.state.password}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.postLogin()}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={{color: 'white', marginBottom: 60}}>
            {' '}
            Credit Viwi App 2020{' '}
          </Text>
        </View>
      );
    }
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
  },

  buttonText: {
    fontSize: 16,

    fontWeight: '500',

    color: '#ffffff',

    textAlign: 'center',
  },
});
