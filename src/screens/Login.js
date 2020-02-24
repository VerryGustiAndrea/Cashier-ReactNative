import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image ,StatusBar, ScrollView} from 'react-native';

// const URL_LOGIN = 'http://localhost:4000/api/login/loginuser/'

export default class Login extends Component {

  // state = {
  //   login : {
  //       email : '',
  //       password : ''
  //   }
  // };

  // onChangeStateLogin = (e) => {
  //   let loginNew = this.state.login
  //   loginNew[e.target.name] = e.target.value;
  //   e.preventDefault();
  //   this.setState(
  //     {
  //       login : loginNew
  //     }  
  //   );
  //   // console.log(this.state.login)
  //   // console.log(e.target.name)
  // };

  // handleSubmitLogin = e => {
  //   e.preventDefault();
  //   this.postLogin();
  // };

  // postLogin = () => {
  //     console.log(this.state.login)
  //   axios.post(URL_LOGIN, this.state.login
  //   )
  //     .then((res) => {
  //       console.log(res.data)
  //       if(!res.data.token){
  //           console.log('wrong')
  //       }else{
  //           localStorage.setItem('Token', res.data.token)
  //           localStorage.setItem('id_cashier', res.data.id_user)
  //           this.props.navigation.navigate('Home')
  //       }
        
  //     })
  //     .catch(err => console.log(err));
  //   };

render(){

  return(

        <View style={styles.container}>
        <StatusBar hidden = {false} backgroundColor = "#0053AD" translucent = {false} networkActivityIndicatorVisible = {true} />
          
        <Image  style={{width:300, height: 200}} source={require('../images/logo.png')}/>

        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Email"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onSubmitEditing={()=> this.password.focus()}
        />

        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor = "#ffffff"
          ref={(input) => this.password = input}
        />

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home') }>

        <Text style={styles.buttonText}>Login</Text>

        </TouchableOpacity>
        <Text style={{color:'white' , marginBottom:60 }}> @2020</Text>

        </View>

)

}

}



const styles = StyleSheet.create({




container : {
flex: 1,
// marginTop:-20,
paddingTop:150,
// justifyContent:'center',

alignItems: 'center',
backgroundColor: '#0053AD'

},



inputBox: {


width:300,

backgroundColor:'rgba(255, 255,255,0.2)',

borderRadius: 25,

paddingHorizontal:16,

fontSize:16,

color:'#ffffff',

marginVertical: 10

},

button: {

width:300,

backgroundColor:'#1c313a',

borderRadius: 25,

marginVertical: 10,

paddingVertical: 13

},

buttonText: {

fontSize:16,

fontWeight:'500',

color:'#ffffff',

textAlign:'center'

}



});