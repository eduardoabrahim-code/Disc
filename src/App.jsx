import { useState } from "react";

const questions = [
  { q: "Sou direto e objetivo", scores: { D: 2, I: 0, S: 0, C: 0 } },
  { q: "Gosto de falar com pessoas", scores: { D: 0, I: 2, S: 0, C: 0 } },
  { q: "Sou paciente", scores: { D: 0, I: 0, S: 2, C: 0 } },
  { q: "Sou detalhista", scores: { D: 0, I: 0, S: 0, C: 2 } },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState({ D: 0, I: 0, S: 0, C: 0 });
  const [finished, setFinished] = useState(false);

  const weights = {
    discordo: 0,
    neutro: 1,
    concordo: 2,
  };

  function answer(type) {
    const weight = weights[type];
    const current = questions[index];

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

  if (finished) {
    const total = scores.D + scores.I + scores.S + scores.C || 1;

    const percentage = {
      D: Math.round((scores.D / total) * 100),
      I: Math.round((scores.I / total) * 100),
      S: Math.round((scores.S / total) * 100),
      C: Math.round((scores.C / total) * 100),
    };

    return (
      <div style={{ padding: 20, color: "white", background: "black" }}>
        <h1>Resultado</h1>
        <p>D: {percentage.D}%</p>
        <p>I: {percentage.I}%</p>
        <p>S: {percentage.S}%</p>
        <p>C: {percentage.C}%</p>

        <button onClick={() => window.location.reload()}>
          Refazer
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, color: "white", background: "black" }}>
      <h2>Pergunta {index + 1}</h2>
      <p>{questions[index].q}</p>

      <button onClick={() => answer("discordo")}>Discordo</button>
      <button onClick={() => answer("neutro")}>Neutro</button>
      <button onClick={() => answer("concordo")}>Concordo</button>
    </div>
  );
}
