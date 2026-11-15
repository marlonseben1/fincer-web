import { Box } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

interface LoginGoogleBotaoProps {
  onSuccess: (credentialResponse: { credential?: string }) => void;
  onError: () => void;
}

export function LoginGoogleBotao({
  onSuccess,
  onError,
}: LoginGoogleBotaoProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        text="continue_with"
        theme="outline"
        size="large"
        shape="rectangular"
        width={320}
      />
    </Box>
  );
}
