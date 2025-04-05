import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, ImageBackground } from 'react-native';
import { ref, push, set } from 'firebase/database';
import { auth, db } from '../config/config';

const IngresarPuntajeScreen = ({ navigation }: any) => {
  const [gameName, setGameName] = useState('');
  const [score, setScore] = useState('');

  const handleSaveScore = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const scoresRef = ref(db, `users/${userId}/scores`);
        const newScoreRef = push(scoresRef);
        await set(newScoreRef, {
          game: gameName,
          score: parseInt(score),
          timestamp: Date.now(),
        });

        Alert.alert("Puntaje ingresado", `Su puntaje del juego ${gameName} ha sido ingresado.`);

        setGameName('');
        setScore('');
      }
    } catch (error) {
      console.log('Error al guardar el puntaje:', error);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/6fcf9146601081.5890d47398b12.jpg' }} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Nombre del juego"
          value={gameName}
          onChangeText={setGameName}
          style={styles.input}
        />
        <TextInput
          placeholder="Puntaje"
          keyboardType="numeric"
          value={score}
          onChangeText={setScore}
          style={styles.input}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveScore}>
          <Text style={styles.saveButtonText}>Guardar puntaje</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IngresarPuntajeScreen;