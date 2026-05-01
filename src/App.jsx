import { useState } from "react";

const questions = [
  { q: "Sou direto e objetivo nas minhas decisões.", scores: { D: 2, I: 0, S: 0, C: 1 } },
  { q: "Gosto de assumir o controle quando algo precisa ser resolvido.", scores: { D: 2, I: 0, S: 0, C: 0 } },
  { q: "Tomo decisões rapidamente, mesmo sob pressão.", scores: { D: 2, I: 0, S: 0, C: 0 } },
  { q: "Tenho facilidade em liderar pessoas.", scores: { D: 2, I: 1, S: 0, C: 0 } },
  { q: "Gosto de desafios e metas ambiciosas.", scores: { D: 2, I: 0, S: 0, C: 1 } },
  { q: "Fico impaciente quando as coisas avançam devagar.", scores: { D: 2, I: 0, S: 0, C: 0 } },

  { q: "Sou comunicativo e gosto de interagir com pessoas.", scores: { D: 0, I: 2, S: 0, C: 0 } },
  { q: "Tenho facilidade para motivar os outros.", scores: { D: 0, I: 2, S: 1, C: 0 } },
  { q: "Gosto de ambientes sociais e dinâmicos.", scores: { D: 0, I: 2, S: 0, C: 0 } },
  { q: "Costumo convencer pessoas com facilidade.", scores: { D: 1, I: 2, S: 0, C: 0 } },
  { q: "Sou otimista e transmito energia positiva.", scores: { D: 0, I: 2, S: 1, C: 0 } },
  { q: "Prefiro trabalhar com pessoas do que sozinho.", scores: { D: 0, I: 2, S: 1, C: 0 } },

  { q: "Sou paciente e costumo ouvir as pessoas com atenção.", scores: { D: 0, I: 0, S: 2, C: 0 } },
  { q: "Prefiro ambientes estáveis e previsíveis.", scores: { D: 0, I: 0, S: 2, C: 1 } },
  { q: "Evito conflitos sempre que possível.", scores: { D: 0, I: 0, S: 2, C: 1 } },
  { q: "Gosto de ajudar e apoiar as pessoas ao meu redor.", scores: { D: 0, I: 1, S: 2, C: 0 } },
  { q: "Mantenho a calma mesmo em situações difíceis.", scores: { D: 0, I: 0, S: 2, C: 1 } },
  { q: "Valorizo segurança, constância e harmonia.", scores: { D: 0, I: 0, S: 2, C: 1 } },

  { q: "Analiso bem antes de tomar decisões importantes.", scores: { D: 0, I: 0, S: 0, C: 2 } },
  { q: "Sou organizado e atento aos detalhes.", scores: { D: 0, I: 0, S: 0, C: 2 } },
  { q: "Gosto de seguir processos, regras e padrões.", scores: { D: 0, I: 0, S: 1, C: 2 } },
  { q: "Valorizo precisão, qualidade e excelência.", scores: { D: 0, I: 0, S: 0, C: 2 } },
  { q: "Reviso meu trabalho para evitar erros.", scores: { D: 0, I: 0, S: 0, C: 2 } },
  { q: "Prefiro ter dados e informações antes de agir.", scores: { D: 0, I: 0, S: 0, C: 2 } },
];

const profiles = {
  D: {
    title: "Dominância",
    emoji: "🔥",
    color: "#ef4444",
    description:
      "Você tende a ser direto, competitivo, decidido e orientado a resultados. Gosta de assumir o controle, enfrentar desafios e buscar soluções rápidas.",
    strengths: "Liderança, coragem, foco em metas, tomada rápida de decisão.",
    attention: "Pode demonstrar impaciência, excesso de controle ou pouca tolerância a ritmos mais lentos.",
    tip: "Use sua força de decisão com escuta ativa. Isso aumenta sua influência e reduz resistência das pessoas ao seu redor.",
  },
  I: {
    title: "Influência",
    emoji: "✨",
    color: "#f59e0b",
    description:
      "Você tende a ser comunicativo, sociável, otimista e persuasivo. Gosta de conexão, movimento, troca de ideias e ambientes com energia positiva.",
    strengths: "Comunicação, entusiasmo, relacionamento, persuasão e criatividade.",
    attention: "Pode perder foco, agir por impulso ou deixar detalhes importantes em segundo plano.",
    tip: "Transforme sua energia em direção. Defina prioridades claras antes de agir.",
  },
  S: {
    title: "Estabilidade",
    emoji: "🤝",
    color: "#10b981",
    description:
      "Você tende a ser paciente, confiável, colaborativo e equilibrado. Valoriza harmonia, segurança, constância e relações de confiança.",
    strengths: "Empatia, lealdade, paciência, colaboração e equilíbrio emocional.",
    attention: "Pode evitar mudanças, fugir de conflitos ou demorar para se posicionar.",
    tip: "Pratique comunicar suas necessidades com clareza. Sua estabilidade ganha força quando vem acompanhada de posicionamento.",
  },
  C: {
    title: "Conformidade",
    emoji: "📊",
    color: "#3b82f6",
    description:
      "Você tende a ser analítico, organizado, criterioso e atento aos detalhes. Valoriza precisão, qualidade, lógica e decisões bem fundamentadas.",
    strengths: "Análise, organização, qualidade, planejamento e precisão.",
    attention: "Pode cair no perfeccionismo, excesso de análise ou demora para agir.",
    tip: "Defina prazos para suas análises. A excelência também precisa de velocidade.",
  },
};

const weights = {
  discordo: 0,
  neutro: 1,
  concordo: 2,
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState({ D: 0, I: 0, S: 0, C: 0 });
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const progress = Math.round(((index + 1) / questions.length) * 100);

  function answer(type) {
    const weight = weights[type];

    const updated = {
      D: scores.D + current.scores.D * weight,
      I: scores.I + current.scores.I * weight,
      S: scores.S + current.scores.S * weight,
      C: scores.C + current.scores.C * weight,
    };

    setScores(updated);

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  }

  const total = scores.D + scores.I + scores.S + scores.C || 1;

  const percentages = {
    D: Math.round((scores.D / total) * 100),
    I: Math.round((scores.I / total) * 100),
    S: Math.round((scores.S / total) * 100),
    C: Math.round((scores.C / total) * 100),
  };

  const dominant = Object.keys(percentages).sort(
    (a, b) => percentages[b] - percentages[a]
  )[0];

  const profile = profiles[dominant];

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.header}>
          <p style={styles.eyebrow}>Avaliação comportamental</p>
          <h1 style={styles.title}>Teste DISC Profissional</h1>
          <p style={styles.subtitle}>
            Responda com sinceridade. Não existem respostas certas ou erradas.
          </p>
        </div>

        {!finished ? (
          <div style={styles.card}>
            <div style={styles.topLine}>
              <span>
                Pergunta {index + 1} de {questions.length}
              </span>
              <span>{progress}%</span>
            </div>

            <div style={styles.progressBg}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>

            <h2 style={styles.question}>{current.q}</h2>

            <div style={styles.buttons}>
              <button style={styles.secondaryButton} onClick={() => answer("discordo")}>
                Discordo
              </button>
              <button style={styles.secondaryButton} onClick={() => answer("neutro")}>
                Neutro
              </button>
              <button style={styles.primaryButton} onClick={() => answer("concordo")}>
                Concordo
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.card}>
            <p style={styles.eyebrow}>Resultado da avaliação</p>

            <h2 style={{ ...styles.resultTitle, color: profile.color }}>
              {profile.emoji} Perfil predominante: {profile.title}
            </h2>

            <p style={styles.text}>{profile.description}</p>

            <div style={styles.resultBlock}>
              <h3 style={styles.blockTitle}>Pontos fortes</h3>
              <p style={styles.text}>{profile.strengths}</p>
            </div>

            <div style={styles.resultBlock}>
              <h3 style={styles.blockTitle}>Pontos de atenção</h3>
              <p style={styles.text}>{profile.attention}</p>
            </div>

            <div style={styles.resultBlock}>
              <h3 style={styles.blockTitle}>Dica prática</h3>
              <p style={styles.text}>{profile.tip}</p>
            </div>

            <div style={styles.scoreBox}>
              {Object.entries(percentages).map(([key, value]) => (
                <div key={key} style={styles.scoreItem}>
                  <div style={styles.scoreTop}>
                    <strong style={{ color: profiles[key].color }}>
                      {key} — {profiles[key].title}
                    </strong>
                    <span>{value}%</span>
                  </div>
                  <div style={styles.miniBarBg}>
                    <div
                      style={{
                        ...styles.miniBarFill,
                        width: `${value}%`,
                        background: profiles[key].color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button style={styles.primaryButton} onClick={() => window.location.reload()}>
              Refazer avaliação
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    color: "#ffffff",
    padding: "36px 20px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "680px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  eyebrow: {
    color: "#818cf8",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "40px",
    margin: "10px 0",
  },
  subtitle: {
    color: "#cbd5e1",
    lineHeight: "1.6",
    fontSize: "16px",
  },
  card: {
    background: "rgba(15, 23, 42, 0.96)",
    border: "1px solid #334155",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },
  topLine: {
    display: "flex",
    justifyContent: "space-between",
    color: "#94a3b8",
    fontSize: "14px",
    marginBottom: "10px",
  },
  progressBg: {
    height: "8px",
    borderRadius: "999px",
    background: "#1e293b",
    overflow: "hidden",
    marginBottom: "30px",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    transition: "width 0.3s ease",
  },
  question: {
    fontSize: "24px",
    lineHeight: "1.4",
    marginBottom: "28px",
  },
  buttons: {
    display: "grid",
    gap: "12px",
  },
  primaryButton: {
    width: "100%",
    padding: "15px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
  },
  secondaryButton: {
    width: "100%",
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid #475569",
    background: "#1e293b",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
  },
  resultTitle: {
    fontSize: "28px",
    lineHeight: "1.3",
  },
  text: {
    color: "#cbd5e1",
    lineHeight: "1.7",
    fontSize: "16px",
  },
  resultBlock: {
    marginTop: "22px",
  },
  blockTitle: {
    marginBottom: "6px",
    color: "#ffffff",
  },
  scoreBox: {
    margin: "28px 0",
    padding: "18px",
    borderRadius: "18px",
    background: "#020617",
    border: "1px solid #334155",
  },
  scoreItem: {
    marginBottom: "16px",
  },
  scoreTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    color: "#cbd5e1",
  },
  miniBarBg: {
    height: "8px",
    background: "#1e293b",
    borderRadius: "999px",
    overflow: "hidden",
  },
  miniBarFill: {
    height: "100%",
    borderRadius: "999px",
  },
};    emoji: "📊",
    color: "#3b82f6",
    description:
      "Você tende a ser analítico, organizado, criterioso e atento aos detalhes. Valoriza precisão, qualidade, lógica e decisões bem fundamentadas.",
    strengths: "Análise, organização, qualidade, planejamento e precisão.",
    attention: "Pode cair no perfeccionismo, excesso de análise ou demora para agir.",
    tip: "Defina prazos para suas análises. A excelência também precisa de velocidade.",
  },
};

const weights = {
  discordo: 0,
  neutro: 1,
  concordo: 2,
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState({ D: 0, I: 0, S: 0, C: 0 });
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const progress = Math.round(((index + 1) / questions.length) * 100);

  function answer(type) {
    const weight = weights[type];

    const updated = {
      D: scores.D + current.scores.D * weight,
      I: scores.I + current.scores.I * weight,
      S: scores.S + current.scores.S * weight,
      C: scores.C + current.scores.C * weight,
    };

    setScores(updated);

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  }

  const total = scores.D + scores.I + scores.S + scores.C || 1;

  const percentages = {
    D: Math.round((scores.D / total) * 100),
    I: Math.round((scores.I / total) * 100),
    S: Math.round((scores.S / total) * 100),
    C: Math.round((scores.C / total) * 100),
  };

  const dominant = Object.keys(percentages).sort(
    (a, b) => percentages[b] - percentages[a]
  )[0];

  const profile = profiles[dominant];

  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <div style={styles.header}>
          <p style={styles.eyebrow}>Avaliação comportamental</p>
          <h1 style={styles.title}>Teste DISC Profissional</h1>
          <p style={styles.subtitle}>
            Responda com sinceridade. Não existem respostas certas ou erradas.
          </p>
        </div>

        {!finished ? (
          <div style={styles.card}>
            <div style={styles.topLine}>
              <span>
                Pergunta {index + 1} de {questions.length}
              </span>
              <span>{progress}%</span>
            </div>

            <div style={styles.progressBg}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>

            <h2 style={styles.question}>{current.q}</h2>

            <div style={styles.buttons}>
              <button style={styles.secondaryButton} onClick={() => answer("discordo")}>
                Discordo
              </button>
              <button style={styles.secondaryButton} onClick={() => answer("neutro")}>
                Neutro
              </button>
              <button style={styles.primaryButton} onClick={() => answer("concordo")}>
                Concordo
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.card}>
            <p style={styles.eyebrow}>Resultado da avaliação</p>

            <h2 style={{ ...styles.resultTitle, color: profile.color }}>
              {profile.emoji} Perfil predominante: {profile.title}
            </h2>

            <p style={styles.text}>{profile.description}</p>

            <div style={styles.resultBlock}>
              <h3 style={styles.blockTitle}>Pontos fortes</h3>
              <p style={styles.text}>{profile.strengths}</p>
            </div>

            <div style={styles.resultBlock}>
              <h3 style={styles.blockTitle}>Pontos de atenção</h3>
              <p style={styles.text}>{profile.attention}</p>
            </div>

            <div style={styles.resultBlock}>
              <h3 style={styles.blockTitle}>Dica prática</h3>
              <p style={styles.text}>{profile.tip}</p>
            </div>

            <div style={styles.scoreBox}>
              {Object.entries(percentages).map(([key, value]) => (
                <div key={key} style={styles.scoreItem}>
                  <div style={styles.scoreTop}>
                    <strong style={{ color: profiles[key].color }}>
                      {key} — {profiles[key].title}
                    </strong>
                    <span>{value}%</span>
                  </div>
                  <div style={styles.miniBarBg}>
                    <div
                      style={{
                        ...styles.miniBarFill,
                        width: `${value}%`,
                        background: profiles[key].color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button style={styles.primaryButton} onClick={() => window.location.reload()}>
              Refazer avaliação
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    color: "#ffffff",
    padding: "36px 20px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "680px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  eyebrow: {
    color: "#818cf8",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "40px",
    margin: "10px 0",
  },
  subtitle: {
    color: "#cbd5e1",
    lineHeight: "1.6",
    fontSize: "16px",
  },
  card: {
    background: "rgba(15, 23, 42, 0.96)",
    border: "1px solid #334155",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },
  topLine: {
    display: "flex",
    justifyContent: "space-between",
    color: "#94a3b8",
    fontSize: "14px",
    marginBottom: "10px",
  },
  progressBg: {
    height: "8px",
    borderRadius: "999px",
    background: "#1e293b",
    overflow: "hidden",
    marginBottom: "30px",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    transition: "width 0.3s ease",
  },
  question: {
    fontSize: "24px",
    lineHeight: "1.4",
    marginBottom: "28px",
  },
  buttons: {
    display: "grid",
    gap: "12px",
  },
  primaryButton: {
    width: "100%",
    padding: "15px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
  },
  secondaryButton: {
    width: "100%",
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid #475569",
    background: "#1e293b",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
  },
  resultTitle: {
    fontSize: "28px",
    lineHeight: "1.3",
  },
  text: {
    color: "#cbd5e1",
    lineHeight: "1.7",
    fontSize: "16px",
  },
  resultBlock: {
    marginTop: "22px",
  },
  blockTitle: {
    marginBottom: "6px",
    color: "#ffffff",
  },
  scoreBox: {
    margin: "28px 0",
    padding: "18px",
    borderRadius: "18px",
    background: "#020617",
    border: "1px solid #334155",
  },
  scoreItem: {
    marginBottom: "16px",
  },
  scoreTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    color: "#cbd5e1",
  },
  miniBarBg: {
    height: "8px",
    background: "#1e293b",
    borderRadius: "999px",
    overflow: "hidden",
  },
  miniBarFill: {
    height: "100%",
    borderRadius: "999px",
  },
};
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
