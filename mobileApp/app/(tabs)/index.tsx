import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

interface Aluno {
  id: number;
  nome: string;
  email: string;
}

export default function HomeScreen() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('http://leoproti.com.br:8004/alunos')
      .then(res => setAlunos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Button title="Cadastrar Aluno" onPress={() => router.push('/form')} />
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/form',
                params: {
                  id: item.id.toString(),
                  nome: item.nome,
                  email: item.email,
                },
              })
            }
          >
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>{item.nome}</Text>
              <Text>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
