import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RegisterScreen({ navigation } : any) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleRegister() {
        const userData = {
            name,
            email,
            password,
        };
        console.log('Perfil:', userData);

        fetch('http://10.81.205.32:5000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(
                            `Erro da API: ${response.status} - ${text}`
                        );
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log('Usuário:', data);
                alert('Cadastro realizado');
                setName('');
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar:', error);
                alert('Erro ao cadastrar, tente novamente.');
            });
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Cadastre-se</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome:"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email:"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha:"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 12,
    },
    title: {
        paddingBottom: 10,
        fontSize: 20,
        color: 'darkblue',
    },
    button: {
        backgroundColor: 'darkblue',
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
})