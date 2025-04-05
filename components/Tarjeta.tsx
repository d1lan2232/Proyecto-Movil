import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

interface TarjetaProps {
  datos: {
    id: string;
    titulo: string;
    genero: string[];
    lanzamiento: string;
    imagen: string;
    precio: number;
    descripcion: string;
  };
  onPress: () => void;
}

const Tarjeta = ({ datos, onPress }: TarjetaProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{datos.titulo}</Text>

      <Text>Género: {datos.genero.join(', ')}</Text>

      <Text>Año de lanzamiento: {new Date(datos.lanzamiento).getFullYear()}</Text>

      <Image source={{ uri: datos.imagen }} style={styles.image} />

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: '80%',
    height: 280,
    resizeMode: 'cover',
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 25,
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
});

export default Tarjeta;