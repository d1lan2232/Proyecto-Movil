import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'



export default function HomeScreen({navigation}: any) {
  return (
    <ImageBackground 
      source={{ uri: 'https://w0.peakpx.com/wallpaper/963/892/HD-wallpaper-super-smash-bros-wii-characters-nintendo.jpg' }} 
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', flex: 1}}>
            <View style={styles.ingreso}>
                <Text style={{fontFamily: 'bold', fontSize: 24, textAlign: 'center'}}>BIENVENIDO</Text>
                <Image style={styles.imagen} source={{uri: 'https://pngimg.com/d/mario_PNG22.png'}}/>
                <TouchableOpacity
                    style= {styles.btn}
                    onPress={()=> navigation.navigate("Top")}
                >
                    <Text style={{fontSize: 25, textAlign: 'center', color: 'white'}}>Ingresar</Text>
                </TouchableOpacity>
            </View>
      </View>
    </ImageBackground>
  );
}
  


const styles = StyleSheet.create({
    ingreso:{
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 15,
        padding: 25,
        marginTop: 170,
        width: 325,
        marginLeft: '7%',
        height: 370,
    },
    imagen:{
        height: 200,
        width: 220,
        padding: 5,
        marginTop: 15,
        marginLeft: 23,
        marginBottom: 30
    },
    btn:{
        backgroundColor: "rgb(255, 71, 71)",
        width: 110,
        height: 35,
        marginLeft: 80,
        borderColor: 'black',
        borderRadius: 15
    }
})