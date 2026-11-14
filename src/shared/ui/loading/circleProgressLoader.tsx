import { styled } from '@mui/material';
import type { ReactNode } from 'react';

const ProgressLoader = styled('div')<{ size: number }>`
  color: #045ba8;
  box-sizing: inherit;
  transform: rotate(-90deg);
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  svg {
    display: block;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    overflow: hidden;
  }

  circle {
    stroke-dasharray: 80px, 200px;
    stroke-dashoffset: 0px;
  }
`;

const LoaderOverlay = styled('div')`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);

  z-index: 900;
`;

const ProgressLoaderWrapper = styled('div')`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 1000;
`;

export const CircleProgressLoader = (props: {
  value: number;
  label: ReactNode;
}) => {
  const size = 85;
  const thickness = 10;
  const circumference = 2 * Math.PI * ((size - thickness) / 2);
  const strokeDasharray = circumference.toFixed(3);
  const strokeDashoffset = `${(((100 - props.value) / 100) * circumference).toFixed(3)}px`;

  return (
    <LoaderOverlay>
      <ProgressLoaderWrapper>
        <ProgressLoader size={size}>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: indicador visual de progresso, sem conteúdo textual */}
          <svg viewBox={`${size / 2} ${size / 2} ${size} ${size}`}>
            <circle
              style={{ strokeDasharray, strokeDashoffset: 0 }}
              cx={size}
              cy={size}
              r={(size - thickness) / 2}
              fill="none"
              stroke="#fff"
              strokeWidth={thickness}
            />
            <circle
              style={{ strokeDasharray, strokeDashoffset }}
              cx={size}
              cy={size}
              r={(size - thickness) / 2}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={thickness - 2}
            />
          </svg>
        </ProgressLoader>
        <div>{props.label || null}</div>
      </ProgressLoaderWrapper>
    </LoaderOverlay>
  );
};
