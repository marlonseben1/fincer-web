import { Alert, Box, Paper, Stack, Typography } from '@mui/material';
import { LoginGoogleBotao } from './LoginGoogleBotao/LoginGoogleBotao';
import { useLogin } from './useLogin';

export function Login() {
  const { erro, handleGoogleSuccess, handleGoogleError } = useLogin();

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2.5,
        py: 6,
        bgcolor: 'background.default',
      }}
    >
      <Stack spacing={4} sx={{ width: '100%', maxWidth: 400 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            component="h1"
            sx={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'primary.main',
            }}
          >
            Fincer
          </Typography>
          <Typography sx={{ mt: 1, fontSize: 17, color: 'text.secondary' }}>
            Suas finanças, sem burocracia.
          </Typography>
        </Box>

        <Paper
          variant="outlined"
          sx={{ p: 3.5, borderRadius: 4, bgcolor: 'background.paper' }}
        >
          <Stack spacing={2.5}>
            <Typography component="h2" sx={{ fontSize: 18, fontWeight: 600 }}>
              Entrar
            </Typography>

            <LoginGoogleBotao
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />

            {erro && <Alert severity="warning">{erro}</Alert>}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
