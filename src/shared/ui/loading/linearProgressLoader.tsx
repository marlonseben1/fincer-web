import { Backdrop, Box, LinearProgress, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface LinearProgressLoaderProps {
  value: number;
  labelTop?: ReactNode;
  labelRight?: ReactNode;
}

export const LinearProgressLoader = (props: LinearProgressLoaderProps) => {
  return (
    <Backdrop
      open
      style={{
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
      unmountOnExit
    >
      <Box
        sx={{
          width: '30%',
          '@media(max-width: 600px)': { width: '90%' },
          '@media(min-width: 601px) and (max-width: 960px)': { width: '50%' },
          '@media(min-width: 961px) and (max-width: 1400px)': { width: '40%' },
        }}
      >
        {!!props.labelTop && (
          <div style={{ marginBottom: '0.3rem' }}>
            <Typography
              variant="body2"
              sx={{ color: 'common.white', fontWeight: 700 }}
            >
              {props.labelTop}
            </Typography>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LinearProgress
            variant="determinate"
            value={props.value}
            sx={{
              flex: 1,
              height: 10,
              borderRadius: 5,
              '& .MuiLinearProgress-bar': { borderRadius: 5 },
            }}
          />

          {!!props.labelRight && (
            <div style={{ marginLeft: '1rem' }}>
              <Typography
                variant="body2"
                sx={{ color: 'common.white', fontWeight: 700 }}
              >
                {props.labelRight}
              </Typography>
            </div>
          )}
        </div>
      </Box>
    </Backdrop>
  );
};
