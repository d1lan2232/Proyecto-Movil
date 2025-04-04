import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function LoginScreen({navigation}: any) {
  return (
    <ImageBackground 
    source={{ uri: 'https://cdn.andro4all.com/andro4all/2019/12/Fondo-de-pantalla-Super-Mario-6.jpg?height=600' }} 
      style={{ flex: 1 }}
      resizeMode="cover"
    >
    <View style={{flex: 1, justifyContent: 'center', paddingLeft: '20%'}}>
      <TextInput 
      placeholder='Ingrese su correo electronico'
      style={styles.inputmail}
      /> 
      <TextInput 
      placeholder='Ingrese su contraseña'
      style={styles.inputcontra}
      /> 

      <TouchableOpacity onPress={() => navigation.navigate("Top")} style={styles.btn}>
        <Text style={{fontSize: 16}}>Sign in</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    inputmail: {
        margin: 1,
        borderColor: 'black',
        borderWidth: 2,
        width: 230,
        marginBottom: 15,
        borderRadius: 25,
        fontSize: 17,
        backgroundColor: 'white'
    },
    inputcontra:{
        margin: 1,
        borderColor: 'black',
        borderWidth: 2,
        width: 230, 
        marginBottom: 15,
        borderRadius: 25,
        fontSize: 17,
        backgroundColor: 'white'
    },
    btn:{
        marginLeft: '25%',
        borderWidth: 2,
        width: 100,
        height: 25,
        backgroundColor: 'rgba(244, 208, 63, 1)',
        borderRadius: 25,
        fontSize: 17,
        paddingHorizontal: 25
    }
})