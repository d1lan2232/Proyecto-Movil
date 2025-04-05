import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { auth, db } from '../config/config';

interface Score {
  game: string;
  score: number;
}

const ConsultarPuntajeScreen = ({ navigation }: any) => {
  const [scores, setScores] = useState<Score[]>([]);

  const [totalScore, setTotalScore] = useState<number>(0);
  const [highestScore, setHighestScore] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const scoresRef = ref(db, `users/${userId}/scores`);

      onValue(scoresRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Datos recibidos:", data); 

        if (data) {
          const scoresArray: Score[] = Object.values(data).map((scoreData: any) => ({
            game: scoreData.game,
            score: scoreData.score,
          }));
          // console.log("Array de puntajes:", scoresArray); 

          setScores(scoresArray);

          const total = scoresArray.reduce((acc, score) => acc + score.score, 0);
          const highest = Math.max(...scoresArray.map((score) => score.score));
          const average = scoresArray.length > 0 ? total / scoresArray.length : 0;

          setTotalScore(total);
          setHighestScore(highest);
          setAverageScore(average);
        } else {
          setScores([]);
          setTotalScore(0);
          setHighestScore(0);
          setAverageScore(0);
        }
      });
    }
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://pixsector.com/cache/66b66cae/av7fdca12c49b51e2b4a0.jpg' }} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Estadísticas</Text>

        <Text style={{color:'white'}}>Puntaje total: {totalScore}</Text>
        <Text style={{color:'white'}}>Puntaje más alto: {highestScore}</Text>
        <Text style={{color:'white'}}>Puntaje promedio: {averageScore.toFixed(2)}</Text>

        <Text style={styles.subtitle}>Puntajes por juego:</Text>
        <FlatList
          data={scores}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.scoreItem}>
              <Text style={styles.gameName}>{item.game}</Text>
              <Text style={styles.gameScore}>Puntaje: {item.score}</Text>
            </View>
          )}
        />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Ingresar")}>
          <Text style={styles.backButtonText}>Regresar</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', 
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  gameName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', 
  },
  gameScore: {
    fontSize: 16,
    color: '#555', 
  },
  backButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConsultarPuntajeScreen;