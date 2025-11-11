import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'http://10.81.205.32:3000/compras'; // Substitua pelo IP da sua rede

export default function App() {
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [compras, setCompras] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState('');
  const [editQuantidade, setEditQuantidade] = useState('');

  useEffect(() => {
    carregarCompras();
  }, []);

  // GET
  const carregarCompras = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCompras(data);
    } catch (err) {
      console.error('Erro ao carregar compras:', err);
    }
  };

  // CREATE
  const adicionarCompra = async () => {
    if (item.trim() === '' || quantidade.trim() === '') return;

    const novaCompra = {
      item: item.trim(),
      quantidade: Number(quantidade)
    };

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaCompra)
      });

      setItem('');
      setQuantidade('');
      carregarCompras();
    } catch (err) {
      console.error('Erro ao adicionar compra:', err);
    }
  };

  // UPDATE
  const atualizarCompra = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: editItem,
          quantidade: Number(editQuantidade)
        })
      });

      setEditId(null);
      setEditItem('');
      setEditQuantidade('');
      carregarCompras();
    } catch (err) {
      console.error('Erro ao atualizar compra:', err);
    }
  };

  // DELETE
  const excluirCompra = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      carregarCompras();
    } catch (err) {
      console.error('Erro ao excluir compra:', err);
    }
  };

  const renderItem = ({ item }) => {
    if (item.id !== editId) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.item} - {item.quantidade}</Text>
          <View style={styles.buttons}>
            <Button title="Edit" onPress={() => {
              setEditId(item.id);
              setEditItem(item.item);
              setEditQuantidade(String(item.quantidade));
            }} />
            <Button title="Delete" color="red" onPress={() => excluirCompra(item.id)} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.item}>
          <TextInput
            style={styles.editInput}
            value={editItem}
            onChangeText={setEditItem}
            placeholder="Novo nome"
          />
          <TextInput
            style={styles.editInput}
            value={editQuantidade}
            onChangeText={setEditQuantidade}
            keyboardType="numeric"
            placeholder="Nova quantidade"
          />
          <Button title="Update" onPress={() => atualizarCompra(item.id)} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Lista de Compras</Text>

      <TextInput
        style={styles.input}
        value={item}
        onChangeText={setItem}
        placeholder="Item a comprar"
      />
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Quantidade"
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={adicionarCompra} />

      <FlatList
        data={compras}
        renderItem={renderItem}
        keyExtractor={item => item.id?.toString()}
        style={styles.list}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  list: {
    marginTop: 20
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    flexDirection: 'column',
    gap: 6
  },
  itemText: {
    fontSize: 16
  },
  buttons: {
    flexDirection: 'row',
    gap: 10
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 6,
    marginBottom: 6
  }
});