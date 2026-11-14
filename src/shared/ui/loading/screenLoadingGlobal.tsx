import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { CircleProgressLoader } from './circleProgressLoader';
import { DotsLoader } from './dotsLoader';
import { LinearProgressLoader } from './linearProgressLoader';
import { type ProgressState, type StepsState, useLoading } from './loading';
import { ScreenLoading } from './screenLoading';

const ScreenProgressLoading = ({ progresso }: { progresso: ProgressState }) => {
  const { atual, total, label, exibirContagem, modo } = progresso;
  const valor = total > 0 ? (atual * 100) / total : 0;
  const contagem = exibirContagem ? `${atual} de ${total}` : undefined;

  if (modo === 'linear') {
    return (
      <LinearProgressLoader
        value={valor}
        labelTop={
          <span style={{ whiteSpace: 'pre-line' }}>
            {label}
            <DotsLoader />
          </span>
        }
        labelRight={contagem}
      />
    );
  }

  return (
    <CircleProgressLoader
      value={valor}
      label={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            padding: '2rem 1rem 0',
          }}
        >
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: 'common.white', whiteSpace: 'pre-line' }}
          >
            {label}
            <DotsLoader />
          </Typography>
          {!!contagem && (
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ color: 'common.white' }}
            >
              {contagem}
            </Typography>
          )}
        </div>
      }
    />
  );
};

const DURACAO_TRANSICAO = 250;

const ESTILO_ETAPA = {
  concluida: { larguraIcone: '20px', espaco: '0.3rem', variante: 'body2' },
  erro: { larguraIcone: '25px', espaco: '0', variante: 'body2' },
  ativa: { larguraIcone: '32px', espaco: '1rem', variante: 'h6' },
  pendente: { larguraIcone: '0', espaco: '0', variante: 'body2' },
} as const;

const ScreenStepsLoading = ({ estado }: { estado: StepsState }) => {
  const { etapas, atual } = estado;
  const reduzirMovimento = useMediaQuery('(prefers-reduced-motion: reduce)');
  const duracao = reduzirMovimento ? 0 : DURACAO_TRANSICAO;
  const transicao = (...propriedades: string[]) =>
    propriedades
      .map((propriedade) => `${propriedade} ${duracao}ms ease`)
      .join(', ');

  return (
    <Backdrop
      open
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '0 16px',
      }}
    >
      {etapas.map((etapa, indice) => {
        const situacao =
          indice < atual
            ? etapa.erro
              ? 'erro'
              : 'concluida'
            : indice === atual
              ? 'ativa'
              : 'pendente';
        const { larguraIcone, espaco, variante } = ESTILO_ETAPA[situacao];
        const texto = {
          concluida: etapa.concluida,
          erro: etapa.erro,
          ativa: etapa.ativa,
          pendente: etapa.pendente,
        }[situacao];

        return (
          <Box
            key={etapa.ativa}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: espaco,
              transition: transicao('gap'),
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexShrink: 0,
                width: larguraIcone,
                transition: transicao('width'),
              }}
            >
              <Fade key={situacao} in appear timeout={duracao}>
                <Box sx={{ display: 'flex' }}>
                  {situacao === 'ativa' && (
                    <CircularProgress size={32} thickness={6} />
                  )}
                  {situacao === 'concluida' && <span aria-hidden>✓</span>}
                  {situacao === 'erro' && <span aria-hidden>✕</span>}
                </Box>
              </Fade>
            </Box>
            <Typography
              variant={variante}
              sx={{
                color: 'common.white',
                fontWeight: 700,
                transition: transicao('font-size', 'line-height'),
              }}
            >
              {texto}
            </Typography>
          </Box>
        );
      })}
    </Backdrop>
  );
};

/** Operações mais rápidas que isso terminam sem o visual aparecer, evitando que a tela pisque. */
const ATRASO_EXIBICAO = 200;
/** Depois de aparecer, o visual fica pelo menos esse tempo, para não piscar em operações médias. */
const TEMPO_MINIMO_EXIBICAO = 400;

export const ScreenLoadingGlobal = () => {
  const bloqueio = useLoading();
  // Mantém o último bloqueio na tela depois do hide, para o visual fechar com a transição de saída.
  const [exibido, setExibido] = useState(bloqueio);
  const [aberto, setAberto] = useState(false);
  // Se o visual nem chegou a aparecer, a saída não tem o que animar e libera a tela na hora.
  const [saidaImediata, setSaidaImediata] = useState(false);
  const abertoDesde = useRef<number | null>(null);
  const theme = useTheme();

  if (bloqueio && bloqueio !== exibido) {
    setExibido(bloqueio);
  }

  const ativo = !!bloqueio;

  useEffect(() => {
    if (ativo) {
      abertoDesde.current ??= Date.now();
      setSaidaImediata(false);
      setAberto(true);
      return;
    }

    if (abertoDesde.current === null) return;

    const fechar = () => {
      abertoDesde.current = null;
      setAberto(false);
    };

    // Se o bloqueio terminou antes do visual aparecer, fecha na hora; senão, espera o tempo mínimo.
    const exibidoEm = abertoDesde.current + ATRASO_EXIBICAO;

    if (Date.now() < exibidoEm) {
      setSaidaImediata(true);
      fechar();
      return;
    }

    const restante = exibidoEm + TEMPO_MINIMO_EXIBICAO - Date.now();

    if (restante <= 0) {
      fechar();
      return;
    }

    const temporizador = setTimeout(fechar, restante);
    return () => clearTimeout(temporizador);
  }, [ativo]);

  // O Modal abre na hora e cobre a tela, prendendo o foco: teclado e clique não chegam à página nem
  // aos dialogs abertos. O visual só aparece depois do atraso, e fecha com o fade do Fade.
  return (
    <Modal
      open={aberto}
      closeAfterTransition
      hideBackdrop
      style={{ zIndex: 10000 }}
    >
      <Fade
        in={aberto}
        timeout={{
          enter: theme.transitions.duration.enteringScreen,
          exit: saidaImediata ? 0 : theme.transitions.duration.leavingScreen,
        }}
        style={{
          transitionDelay: aberto ? `${ATRASO_EXIBICAO}ms` : '0ms',
          outline: 'none',
        }}
      >
        <div role="status" aria-live="polite">
          {exibido?.tipo === 'progresso' && (
            <ScreenProgressLoading progresso={exibido.progresso} />
          )}
          {exibido?.tipo === 'etapas' && (
            <ScreenStepsLoading estado={exibido.etapas} />
          )}
          {exibido?.tipo === 'indeterminado' && (
            <ScreenLoading label={exibido.label} />
          )}
        </div>
      </Fade>
    </Modal>
  );
};
