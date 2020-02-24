import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
export default class Login extends Component {

render(){

return(

<View style={styles.container}>
<Image  style={{width:300, height: 200}} source={require('../images/logo.png')}/>


<TouchableOpacity style={styles.button}>

<Text style={styles.buttonText}>Ini Home</Text>

</TouchableOpacity>


<TouchableOpacity style={styles.button}>

<Text style={styles.buttonText} onPress={ ()=> this.props.navigation.navigate('Login')}>Log Out</Text>

</TouchableOpacity>


</View>

)

}

}



const styles = StyleSheet.create({

container : {

flexGrow: 4,
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