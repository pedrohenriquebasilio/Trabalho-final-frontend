import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
  Button,
  Paper,
  Divider,
} from '@mui/material';

import {
  buscarAlunos,
  excluirAluno,
} from '../services/alunoService';

import FormularioAluno from '../components/FormularioAluno';

function Home() {
  const [alunos, setAlunos] = useState([]);
  const [alunoEditando, setAlunoEditando] = useState(null);

  const carregarAlunos = async () => {
    const resposta = await buscarAlunos();
    setAlunos(resposta.data);
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const handleExcluir = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      await excluirAluno(id);
      carregarAlunos();
    }
  };

  const handleEditar = (aluno) => {
    setAlunoEditando(aluno);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6, p: 3 }}>
      <Typography variant="h4" fontWeight="bold" align="center" color="primary" gutterBottom>
        {alunoEditando ? 'Editar Aluno' : 'Cadastrar Aluno'}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <FormularioAluno
          alunoEditando={alunoEditando}
          onFinalizar={() => {
            setAlunoEditando(null);
            carregarAlunos();
          }}
        />
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }} color="secondary">
        Lista de Alunos
      </Typography>

      <Paper elevation={2}>
        <List disablePadding>
          {alunos.length === 0 ? (
            <Typography sx={{ p: 2 }} align="center" color="text.secondary">
              Nenhum aluno cadastrado.
            </Typography>
          ) : (
            alunos.map((aluno) => (
              <div key={aluno.id}>
                <ListItem
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <Button size="small" variant="outlined" onClick={() => handleEditar(aluno)}>
                        Editar
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleExcluir(aluno.id)}
                      >
                        Excluir
                      </Button>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={aluno.nome}
                    secondary={aluno.email}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
                <Divider />
              </div>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
}

export default Home;
