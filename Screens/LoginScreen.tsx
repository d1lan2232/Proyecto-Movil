import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/config';

export default function AuthScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); 

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert("Campos requeridos", "Por favor, completa todos los campos.");
      return;
    }

    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          Alert.alert("Bienvenido", `Sesión iniciada como: ${user.email}`);
          setEmail('');
          setPassword('');
          navigation.navigate("Top");
        })
        .catch(error => {
          Alert.alert("Error al iniciar sesión", error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          Alert.alert("Cuenta creada", `Registrado como: ${user.email}`);
          setEmail('');
          setPassword('');
          navigation.navigate("Top");
        })
        .catch(error => {
          Alert.alert("Error al registrarse", error.message);
        });
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://cdn.andro4all.com/andro4all/2019/12/Fondo-de-pantalla-Super-Mario-6.jpg?height=600'
      }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={handleAuth} style={styles.btn}>
          <Text style={{ fontSize: 16 }}>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.toggleBtn}>
          <Text style={{ fontSize: 14 }}>
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  input: {
    margin: 1,
    borderColor: 'black',
    borderWidth: 2,
    width: 230,
    marginBottom: 15,
    borderRadius: 25,
    fontSize: 17,
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  btn: {
    borderWidth: 2,
    width: 150,
    height: 40,
    backgroundColor: 'rgba(244, 208, 63, 1)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  toggleBtn: {
    marginTop: 10,
    padding: 8,
    backgroundColor: 'rgba(63, 244, 144, 0.8)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#222',
  }
});
