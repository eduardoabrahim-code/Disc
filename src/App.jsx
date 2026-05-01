import { useState } from "react";

export default function App() {
  const [etapa, setEtapa] = useState(0);
  const [pontos, setPontos] = useState({ D: 0, I: 0, S: 0, C: 0 });

  const perguntas = [
    { texto: "Gosto de assumir o controle", tipo: "D" },
    { texto: "Sou comunicativo", tipo: "I" },
    { texto: "Sou paciente", tipo: "S" },
    { texto: "Sou analítico", tipo: "C" },
  ];

  function responder() {
    const tipo = perguntas[etapa].tipo;
    setPontos({ ...pontos, [tipo]: pontos[tipo] + 1 });

    if (etapa < perguntas.length - 1) {
      setEtapa(etapa + 1);
    } else {
      setEtapa("fim");
    }
  }

  if (etapa === "fim") {
    const resultado = Object.entries(pontos).sort((a, b) => b[1] - a[1])[0][0];

    return (
      <div style={{ padding: 20 }}>
        <h1>Resultado: {resultado}</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{perguntas[etapa].texto}</h1>
      <button onClick={responder}>Responder</button>
    </div>
  );
}
