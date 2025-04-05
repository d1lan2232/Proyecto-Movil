import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/config';

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert("Campos vacíos", "Por favor ingresa correo y contraseña.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        Alert.alert("¡Registro exitoso!", `Bienvenido/a ${user.email}`);
        setEmail('');  // Limpiar el campo de correo
        setPassword('');  // Limpiar el campo de contraseña
        navigation.navigate("Login");  // Opcional: redirigir al login después del registro
      })
      .catch(error => {
        Alert.alert("Error de registro", error.message);
      });
  };

  return (
    <ImageBackground
      source={{ uri: 'https://wallpapers.com/images/hd/super-mario-landscape-art-x2q5zh0w7fouekbh.jpg' }}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  input: {
    width: 250,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'black',
    fontSize: 16
  },
  button: {
    backgroundColor: 'rgba(52, 152, 219, 1)',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 2,
    marginBottom: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  loginLink: {
    color: 'black',
    textDecorationLine: 'underline'
  }
});
