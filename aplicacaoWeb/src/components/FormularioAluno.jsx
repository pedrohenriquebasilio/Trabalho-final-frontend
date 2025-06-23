import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Paper,
  Stack,
} from '@mui/material';
import {
  cadastrarAluno,
  atualizarAluno,
} from '../services/alunoService';

function FormularioAluno({ alunoEditando, onFinalizar }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (alunoEditando) {
      setNome(alunoEditando.nome || '');
      setEmail(alunoEditando.email || '');
    } else {
      setNome('');
      setEmail('');
    }
  }, [alunoEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (alunoEditando) {
        await atualizarAluno(alunoEditando.id, { nome, email });
        setFeedback({
          open: true,
          message: 'Aluno atualizado com sucesso!',
          severity: 'success',
        });
      } else {
        await cadastrarAluno({ nome, email });
        setFeedback({
          open: true,
          message: 'Aluno cadastrado com sucesso!',
          severity: 'success',
        });
      }

      setNome('');
      setEmail('');
      onFinalizar();
    } catch (error) {
      setFeedback({
        open: true,
        message: 'Erro ao salvar aluno.',
        severity: 'error',
      });
      console.error(error);
    }
  };

  return (
    <>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              {alunoEditando ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        onClose={() => setFeedback({ ...feedback, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={feedback.severity}
          variant="filled"
          onClose={() => setFeedback({ ...feedback, open: false })}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default FormularioAluno;
