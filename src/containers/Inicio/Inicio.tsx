import { Box, Typography } from '@mui/material';

// tela provisória: vira o Login no commit de autenticação
export function Inicio() {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Fincer
      </Typography>
    </Box>
  );
}
