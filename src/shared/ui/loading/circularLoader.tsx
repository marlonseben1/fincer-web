import { CircularProgress, styled } from '@mui/material';

const Wrapper = styled('div')`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CircularLoader = () => {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
};
