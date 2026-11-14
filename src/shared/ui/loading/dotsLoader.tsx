import { styled } from '@mui/material';

const Dots = styled('span')`
  &::after {
    animation: dots 2s steps(1, end) infinite;
    content: '';
  }

  @keyframes dots {
    0% {
      content: '';
    }
    25% {
      content: '.';
    }
    50% {
      content: '..';
    }
    75% {
      content: '...';
    }
    100% {
      content: '';
    }
  }
`;

export const DotsLoader = () => <Dots />;
