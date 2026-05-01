import { useState } from "react";

const questions = [
  { q: "Sou direto e objetivo nas minhas decisões.", type: "D" },
  { q: "Gosto de assumir o controle das situações.", type: "D" },
  { q: "Tomo decisões rapidamente.", type: "D" },
  { q: "Gosto de desafios e resultados.", type: "D" },

  { q: "Sou comunicativo e gosto de interagir.", type: "I" },
  { q: "Tenho facilidade para motivar pessoas.", type: "I" },
  { q: "Sou otimista e entusiasmado.", type: "I" },
  { q: "Gosto de trabalhar em equipe.", type: "I" },

  { q: "Sou paciente e bom ouvinte.", type: "S" },
  { q: "Prefiro ambientes estáveis e calmos.", type: "S" },
  { q: "Evito conflitos sempre que possível.", type: "S" },
  { q: "Gosto de ajudar as pessoas.", type: "S" },

  { q: "Analiso bem antes de decidir.", type: "C" },
  { q: "Sou organizado e detalhista.", type: "C" },
  { q: "Valorizo regras, qualidade e precisão.", type: "C" },
  { q: "Reviso meu trabalho para evitar erros.", type: "C" },
];

const profiles = {
  D: ["Dominância", "Direto, decidido, competitivo e focado em resultados."],
  I: ["Influência", "Comunicativo, sociável, persuasivo e otimista."],
  S: ["Estabilidade", "Paciente, confiável, colaborativo e equilibrado."],
  C: ["Conformidade", "Analítico, organizado, cuidadoso e atento aos detalhes."],
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState({ D: 0, I: 0, S: 0, C: 0 });
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  function answer(points) {
    const updated = { ...scores };
    updated[current.type] += points;
    setScores(updated);

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  }

  const total = scores.D + scores.I + scores.S + scores.C || 1;
  const percent = {
    D: Math.round((scores.D / total) * 100),
    I: Math.round((scores.I / total) * 100),
    S: Math.round((scores.S / total) * 100),
    C: Math.round((scores.C / total) * 100),
  };

  const dominant = Object.keys(percent).sort((a, b) => percent[b] - percent[a])[0];

  return (
    <div style={page}>
      <div style={box}>
        <p style={tag}>Avaliação Comportamental</p>
        <h1 style={title}>Teste DISC</h1>

        {!finished ? (
          <>
            <p style={progress}>
              Pergunta {index + 1} de {questions.length}
            </p>

            <div style={bar}>
              <div
                style={{
                  ...barFill,
                  width: `${((index + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <h2 style={question}>{current.q}</h2>

            <button style={buttonDark} onClick={() => answer(0)}>
              Discordo
            </button>
            <button style={buttonDark} onClick={() => answer(1)}>
              Neutro
            </button>
            <button style={buttonPurple} onClick={() => answer(2)}>
              Concordo
            </button>
          </>
        ) : (
          <>
            <p style={tag}>Resultado</p>
            <h2 style={resultTitle}>
              Perfil predominante: {dominant} — {profiles[dominant][0]}
            </h2>
            <p style={text}>{profiles[dominant][1]}</p>

            {["D", "I", "S", "C"].map((key) => (
              <div key={key} style={scoreItem}>
                <div style={scoreTop}>
                  <span>
                    {key} — {profiles[key][0]}
                  </span>
                  <strong>{percent[key]}%</strong>
                </div>
                <div style={bar}>
                  <div style={{ ...barFill, width: `${percent[key]}%` }} />
                </div>
              </div>
            ))}

            <button style={buttonPurple} onClick={() => window.location.reload()}>
              Refazer teste
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #020617, #111827)",
  color: "white",
  padding: "32px 20px",
  fontFamily: "Arial, sans-serif",
};

const box = {
  maxWidth: "560px",
  margin: "0 auto",
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "24px",
  padding: "28px",
  boxShadow: "0 20px 50px rgba(0,0,0,.35)",
};

const tag = {
  color: "#818cf8",
  textTransform: "uppercase",
  letterSpacing: "2px",
  fontSize: "12px",
  fontWeight: "bold",
};

const title = {
  fontSize: "40px",
  marginTop: "8px",
};

const progress = {
  color: "#94a3b8",
};

const bar = {
  height: "8px",
  background: "#1e293b",
  borderRadius: "99px",
  overflow: "hidden",
  margin: "12px 0 24px",
};

const barFill = {
  height: "100%",
  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
};

const question = {
  fontSize: "24px",
  lineHeight: "1.4",
};

const buttonDark = {
  width: "100%",
  padding: "15px",
  marginTop: "12px",
  borderRadius: "14px",
  border: "1px solid #475569",
  background: "#1e293b",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
};

const buttonPurple = {
  ...buttonDark,
  border: "none",
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
};

const resultTitle = {
  fontSize: "26px",
  lineHeight: "1.3",
};

const text = {
  color: "#cbd5e1",
  lineHeight: "1.6",
};

const scoreItem = {
  marginTop: "18px",
};

const scoreTop = {
  display: "flex",
  justifyContent: "space-between",
  color: "#cbd5e1",
};
