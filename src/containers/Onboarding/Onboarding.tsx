import { Box, Button, Stack, Typography } from '@mui/material';
import { useLogoutMutation } from 'modules/entidades/sessao';
import { useNavigate } from 'react-router';

export function Onboarding() {
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

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
      <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Vamos configurar sua conta
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>Em construção.</Typography>
        <Button
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
