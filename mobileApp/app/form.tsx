import { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

export default function FormScreen() {
  const router = useRouter();
  const { id, nome: nomeParam, email: emailParam } = useLocalSearchParams<{
    id?: string;
    nome?: string;
    email?: string;
  }>();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (id) {
      setNome(nomeParam ?? '');
      setEmail(emailParam ?? '');
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (id) {
        await axios.put(`http://leoproti.com.br:8004/alunos/${id}`, { nome, email });
        Alert.alert('Sucesso', 'Aluno atualizado com sucesso!');
      } else {
        await axios.post('http://leoproti.com.br:8004/alunos', { nome, email });
        Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
      }
      router.push('/');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível salvar o aluno.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title={id ? 'Atualizar' : 'Cadastrar'} onPress={handleSubmit} />
    </View>
  );
}
