import { Backdrop, CircularProgress, Typography } from '@mui/material';
import { DotsLoader } from './dotsLoader';

interface ScreenLoadingProps {
  /** Texto exibido embaixo do spinner. */
  label?: string;
}

/** Quem renderiza decide quando o loading some: o `ScreenLoadingGlobal` fecha o Modal. */
export const ScreenLoading = ({ label }: ScreenLoadingProps) => {
  return (
    <Backdrop
      open
      style={{
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '0 16px',
      }}
    >
      <CircularProgress size={72} thickness={6} />

      {!!label && (
        <Typography
          variant="h6"
          align="center"
          sx={{ color: 'common.white', fontWeight: 700 }}
        >
          {label}
          <DotsLoader />
        </Typography>
      )}
    </Backdrop>
  );
};
