import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from 'react-native';

import api from './src/services/api';

export default function App() {

  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null);
  const inputRef = useRef(null);

  async function buscar() {
    if (cep === '') {
      alert('Digite um cep válido.');
      return;
    }

    try {

      const response = await api.get(`/${cep}`);
      
      setCepUser(response.data);

      Keyboard.dismiss();

    } catch(error) {
      console.log(error);
    }
  }

  function limpar() {
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Digite o Cep desejado</Text>
        <TextInput 
          style={styles.input}
          placeholder='000000'
          value={cep}
          onChangeText={ (text) => setCep(text) }
          keyboardType='numeric'
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#1d75cd' }]} onPress={buscar}>
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#ff0000' }]} onPress={limpar}>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {cepUser && 

        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.address_type} {cepUser.address_name}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.district}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.city}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.state}</Text>
          <Text style={styles.itemText}>Latitude: {cepUser.lat}</Text>
          <Text style={styles.itemText}>Longitude: {cepUser.lng}</Text>
        </View>

      }
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    height: 45,
    padding: 10,
    fontSize: 20
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  botaoText: {
    color: '#fff',
    fontSize: 20
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 22
  }
})