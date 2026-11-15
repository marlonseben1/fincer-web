import { Box, Button, Stack, Typography } from '@mui/material';
import {
  useLogoutMutation,
  useUsuarioAtualQuery,
} from 'modules/entidades/sessao';
import { useNavigate } from 'react-router';

export function Dashboard() {
  const { data: usuario } = useUsuarioAtualQuery();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  const primeiroNome = usuario?.nome.split(' ')[0];

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2.5,
      }}
    >
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Olá, {primeiroNome}
        </Typography>
        <Button
          variant="outlined"
          onClick={() =>
            logoutMutation.mutate(undefined, {
              onSuccess: () => navigate('/', { replace: true }),
            })
          }
        >
          Sair
        </Button>
      </Stack>
    </Box>
  );
}
