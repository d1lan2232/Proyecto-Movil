import { FlatList, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Tarjeta from '../components/Tarjeta';

export default function ListaExternaScreen() {
  const [data, setData] = useState<any[]>([]);
  const [selectedGame, setSelectedGame] = useState<any | null>(null); 
  const [isModalVisible, setIsModalVisible] = useState(false); 

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resp = await fetch('https://jritsqmet.github.io/web-api/videojuegos.json');
      const json = await resp.json();

      const games = json.videojuegos || [];
      setData(games);
    } catch (err) {
      console.log('Error al cargar los datos:', err);
    }
  };

  const openModal = (game: any) => {
    setSelectedGame(game);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedGame(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LISTA VIDEOJUEGOS</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Tarjeta datos={item} onPress={() => openModal(item)} />
        )}
      />

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedGame?.titulo}</Text>
            <Text>Plataforma: {selectedGame?.plataforma.join(', ')}</Text>
            <Text>Precio: ${selectedGame?.precio.toFixed(2)}</Text>
            <Text style={styles.modalDescription}>{selectedGame?.descripcion}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});