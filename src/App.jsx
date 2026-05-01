import { useState } from "react";

const perguntas = [
  { texto: "Gosto de assumir o controle das situações.", tipo: "D" },
  { texto: "Tomo decisões com rapidez.", tipo: "D" },
  { texto: "Sou direto e objetivo.", tipo: "D" },
  { texto: "Gosto de desafios e resultados.", tipo: "D" },

  { texto: "Gosto de conversar e conhecer pessoas.", tipo: "I" },
  { texto: "Tenho facilidade para motivar os outros.", tipo: "I" },
  { texto: "Sou comunicativo e entusiasmado.", tipo: "I" },
  { texto: "Gosto de trabalhar em equipe.", tipo: "I" },

  { texto: "Prefiro ambientes calmos e estáveis.", tipo: "S" },
  { texto: "Sou paciente e bom ouvinte.", tipo: "S" },
  { texto: "Evito conflitos sempre que possível.", tipo: "S" },
  { texto: "Gosto de ajudar as pessoas.", tipo: "S" },

  { texto: "Gosto de analisar antes de decidir.", tipo: "C" },
  { texto: "Sou organizado e detalhista.", tipo: "C" },
  { texto: "Valorizo regras, qualidade e precisão.", tipo: "C" },
  { texto: "Reviso meu trabalho para evitar erros.", tipo: "C" },
];

const perfis = {
  D: {
    nome: "Dominância",
    cor: "#ef4444",
    texto: "Perfil direto, decidido, competitivo e orientado a resultados. Costuma agir com rapidez, assumir liderança e buscar soluções práticas.",
  },
  I: {
    nome: "Influência",
    cor: "#f59e0b",
    texto: "Perfil comunicativo, sociável, persuasivo e otimista. Costuma motivar pessoas, criar conexões e atuar bem em ambientes de relacionamento.",
  },
  S: {
    nome: "Estabilidade",
    cor: "#10b981",
    texto: "Perfil paciente, confiável, colaborativo e equilibrado. Costuma valorizar harmonia, segurança e relações consistentes.",
  },
  C: {
    nome: "Conformidade",
    cor: "#3b82f6",
    texto: "Perfil analítico, organizado, preciso e criterioso. Costuma valorizar qualidade, lógica, regras e tomada de decisão bem fundamentada.",
  },
};

export default function App() {
  const [indice, setIndice] = useState(0);
  const [pontos, setPontos] = useState({ D: 0, I: 0, S: 0, C: 0 });
  const [finalizado, setFinalizado] = useState(false);

  const perguntaAtual = perguntas[indice];
  const progresso = Math.round(((indice + 1) / perguntas.length) * 100);

  function responder(valor) {
    const novo = {
      ...pontos,
      [perguntaAtual.tipo]: pontos[perguntaAtual.tipo] + valor,
    };

    setPontos(novo);

    if (indice < perguntas.length - 1) {
      setIndice(indice + 1);
    } else {
      setFinalizado(true);
    }
  }

  const perfilFinal = Object.entries(pontos).sort((a, b) => b[1] - a[1])[0][0];
  const resultado = perfis[perfilFinal];

  return (
    <div style={page}>
      <div style={container}>
        <div style={header}>
          <p style={eyebrow}>Avaliação comportamental</p>
          <h1 style={title}>Teste DISC</h1>
          <p style={subtitle}>
            Descubra seu perfil predominante: Dominância, Influência,
            Estabilidade ou Conformidade.
          </p>
        </div>

        {!finalizado ? (
          <div style={card}>
            <div style={topLine}>
              <span>Pergunta {indice + 1} de {perguntas.length}</span>
              <span>{progresso}%</span>
            </div>

            <div style={barBg}>
              <div style={{ ...barFill, width: `${progresso}%` }} />
            </div>

            <h2 style={question}>{perguntaAtual.texto}</h2>

            <div style={buttons}>
              <button style={buttonSecondary} onClick={() => responder(1)}>
                Discordo
              </button>
              <button style={buttonSecondary} onClick={() => responder(2)}>
                Neutro
              </button>
              <button style={buttonPrimary} onClick={() => responder(3)}>
                Concordo
              </button>
            </div>
          </div>
        ) : (
          <div style={card}>
            <p style={eyebrow}>Resultado</p>

            <h2 style={{ ...resultTitle, color: resultado.cor }}>
              Perfil predominante: {resultado.nome}
            </h2>

            <p style={resultText}>{resultado.texto}</p>

            <div style={scoreBox}>
              {Object.entries(pontos).map(([tipo, valor]) => (
                <div key={tipo} style={scoreLine}>
                  <strong style={{ color: perfis[tipo].cor }}>
                    {tipo} — {perfis[tipo].nome}
                  </strong>
                  <span>{valor} pontos</span>
                </div>
              ))}
            </div>

            <button
              style={buttonPrimary}
              onClick={() => window.location.reload()}
            >
              Refazer avaliação
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  color: "#ffffff",
  padding: "32px 20px",
  fontFamily: "Arial, sans-serif",
};

const container = {
  maxWidth: "620px",
  margin: "0 auto",
};

const header = {
  textAlign: "center",
  marginBottom: "28px",
};

const eyebrow = {
  color: "#818cf8",
  textTransform: "uppercase",
  letterSpacing: "2px",
  fontSize: "12px",
  fontWeight: "bold",
};

const title = {
  fontSize: "42px",
  margin: "8px 0",
};

const subtitle = {
  color: "#cbd5e1",
  lineHeight: "1.6",
};

const card = {
  background: "rgba(15, 23, 42, 0.95)",
  border: "1px solid #334155",
  borderRadius: "24px",
  padding: "28px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
};

const topLine = {
  display: "flex",
  justifyContent: "space-between",
  color: "#94a3b8",
  fontSize: "14px",
  marginBottom: "10px",
};

const barBg = {
  height: "8px",
  background: "#1e293b",
  borderRadius: "999px",
  overflow: "hidden",
  marginBottom: "28px",
};

const barFill = {
  height: "100%",
  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
  transition: "width 0.3s ease",
};

const question = {
  fontSize: "24px",
  lineHeight: "1.4",
  marginBottom: "28px",
};

const buttons = {
  display: "grid",
  gap: "12px",
};

const buttonPrimary = {
  width: "100%",
  padding: "15px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
};

const buttonSecondary = {
  ...buttonPrimary,
  background: "#1e293b",
  border: "1px solid #475569",
};

const resultTitle = {
  fontSize: "28px",
  marginBottom: "16px",
};

const resultText = {
  color: "#cbd5e1",
  lineHeight: "1.7",
  fontSize: "16px",
};

const scoreBox = {
  background: "#020617",
  border: "1px solid #334155",
  borderRadius: "16px",
  padding: "16px",
  margin: "24px 0",
};

const scoreLine = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0",
  borderBottom: "1px solid #1e293b",
};
