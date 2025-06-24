import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'http://10.81.205.32:5000/api/catalog'; 

export default function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  // GET
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data.catalog);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  };

  // CREATE
  const createProduct = async () => {
    if (!name || !description || !price) return;

    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      enabled: true,
      featured: false
    };

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });

      setName('');
      setDescription('');
      setPrice('');
      fetchProducts();
    } catch (err) {
      console.error('Erro ao criar produto:', err);
    }
  };

  // UPDATE
  const updateProduct = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editName,
          description: editDescription,
          price: parseFloat(editPrice)
        })
      });

      setEditId(null);
      setEditName('');
      setEditDescription('');
      setEditPrice('');
      fetchProducts();
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
    }
  };

  // DELETE
  const deleteProduct = (id) => {
    Alert.alert("Confirmar exclusão", "Deseja realmente excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`${API_URL}/${id}`, {
              method: 'DELETE'
            });
            fetchProducts();
          } catch (err) {
            console.error('Erro ao excluir produto:', err);
          }
        }
      }
    ]);
  };

  const renderItem = ({ item }) => {
    if (item.id !== editId) {
      return (
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{item.name} - R$ {item.price.toFixed(2)}</Text>
          <Text style={styles.itemDesc}>{item.description}</Text>
          <Image
            source={{ uri: item.image}}
            style={styles.image}
          />

          <View style={styles.buttons}>
            <Button title="Editar" onPress={() => {
              setEditId(item.id);
              setEditName(item.name);
              setEditDescription(item.description);
              setEditPrice(String(item.price));
            }} />
            <Button title="Excluir" color="red" onPress={() => deleteProduct(item.id)} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.item}>
          <TextInput
            style={styles.input}
            value={editName}
            onChangeText={setEditName}
            placeholder="Novo nome"
          />
          <TextInput
            style={styles.input}
            value={editDescription}
            onChangeText={setEditDescription}
            placeholder="Nova descrição"
          />
          <TextInput
            style={styles.input}
            value={editPrice}
            onChangeText={setEditPrice}
            keyboardType="decimal-pad"
            placeholder="Novo preço"
          />
          <Button title="Salvar" onPress={() => updateProduct(item.id)} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Produtos</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição"
      />
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
        placeholder="Preço"
      />
      <Button title="Adicionar Produto" onPress={createProduct} />

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fefefe', // Branco levemente off
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1f2937', // Cinza bem escuro, quase preto
    fontFamily: 'times new roman'
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb', // Cinza bem clarinho
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  list: {
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9fafb', // Fundo bem sutil
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151', // Cinza elegante
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 14,
    color: '#6b7280', // Cinza médio
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    backgroundColor: '#f3f4f6', // Cinza bem clarinho, minimal
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  buttonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#e5e7eb', // Cinzinha placeholder elegante
  },
});