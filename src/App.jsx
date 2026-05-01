import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const QUESTIONS = [
  // D - Dominância
  { id: 1, text: "Gosto de assumir o controle das situações e liderar decisões.", dim: "D" },
  { id: 2, text: "Tomo decisões rapidamente, mesmo com informações limitadas.", dim: "D" },
  { id: 3, text: "Sou direto e objetivo ao me comunicar — vou direto ao ponto.", dim: "D" },
  { id: 4, text: "Fico impaciente quando as coisas avançam mais devagar do que eu gostaria.", dim: "D" },
  { id: 5, text: "Gosto de enfrentar desafios difíceis e superar obstáculos.", dim: "D" },
  { id: 6, text: "Prefiro liderar a seguir orientações de outros.", dim: "D" },
  // I - Influência
  { id: 7, text: "Faço amigos facilmente e me adapto bem a novos ambientes sociais.", dim: "I" },
  { id: 8, text: "Motivo os outros com entusiasmo e energia positiva.", dim: "I" },
  { id: 9, text: "Prefiro trabalhar em equipe a trabalhar isoladamente.", dim: "I" },
  { id: 10, text: "Sou expressivo emocionalmente e demonstro meus sentimentos com facilidade.", dim: "I" },
  { id: 11, text: "Fico energizado em situações sociais e adoro conhecer pessoas novas.", dim: "I" },
  { id: 12, text: "Consigo convencer e inspirar pessoas com facilidade.", dim: "I" },
  // S - Estabilidade
  { id: 13, text: "Prefiro ambientes estáveis e rotinas a mudanças frequentes.", dim: "S" },
  { id: 14, text: "Sou paciente e compreensivo com as dificuldades dos outros.", dim: "S" },
  { id: 15, text: "Me dedico completamente a uma tarefa até concluí-la antes de começar outra.", dim: "S" },
  { id: 16, text: "Sou um ouvinte atento — as pessoas se sentem à vontade para me contar seus problemas.", dim: "S" },
  { id: 17, text: "Prefiro evitar conflitos e busco manter a harmonia no grupo.", dim: "S" },
  { id: 18, text: "Mantenho a calma sob pressão e raramente perco o controle emocional.", dim: "S" },
  // C - Conformidade / Conscienciosidade
  { id: 19, text: "Analiso detalhadamente antes de tomar qualquer decisão importante.", dim: "C" },
  { id: 20, text: "Sigo procedimentos e padrões com cuidado e atenção.", dim: "C" },
  { id: 21, text: "Me preocupo muito com qualidade e precisão no meu trabalho.", dim: "C" },
  { id: 22, text: "Gosto de entender os 'porquês' antes de agir.", dim: "C" },
  { id: 23, text: "Sou organizado e sistemático — tenho lugar para tudo e tudo em seu lugar.", dim: "C" },
  { id: 24, text: "Verifico meu trabalho repetidamente para garantir que não há erros.", dim: "C" },
];

const DISC_INFO = {
  D: {
    label: "Dominância",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    icon: "⚡",
    traits: ["Direto", "Decisivo", "Orientado a resultados", "Competitivo"],
    description: "Pessoas com perfil D alto são orientadas à ação, competitivas e focadas em resultados. Lideram com assertividade e tomam decisões rápidas.",
  },
  I: {
    label: "Influência",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    icon: "✨",
    traits: ["Entusiasta", "Otimista", "Comunicativo", "Persuasivo"],
    description: "Pessoas com perfil I alto são sociáveis, carismáticas e inspiradoras. Motivam equipes com energia e entusiasmo contagiante.",
  },
  S: {
    label: "Estabilidade",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    icon: "🌿",
    traits: ["Paciente", "Confiável", "Empático", "Colaborativo"],
    description: "Pessoas com perfil S alto são estáveis, confiáveis e excelentes ouvintes. Criam ambientes harmoniosos e são pilares de confiança nas equipes.",
  },
  C: {
    label: "Conformidade",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    icon: "🔍",
    traits: ["Analítico", "Preciso", "Sistemático", "Detalhista"],
    description: "Pessoas com perfil C alto são metódicas, precisas e orientadas à qualidade. Analisam profundamente antes de agir e garantem excelência nos resultados.",
  },
};

const LABELS = ["Discordo totalmente", "Discordo", "Neutro", "Concordo", "Concordo totalmente"];

function ScaleButton({ value, selected, onClick, color }) {
  const sizes = ["w-9 h-9", "w-10 h-10", "w-11 h-11", "w-10 h-10", "w-9 h-9"];
  return (
    <button
      onClick={() => onClick(value)}
      style={{
        background: selected ? color : "rgba(255,255,255,0.05)",
        borderColor: selected ? color : "rgba(255,255,255,0.1)",
        transform: selected ? "scale(1.15)" : "scale(1)",
        boxShadow: selected ? `0 0 20px ${color}55` : "none",
      }}
      className={`${sizes[value - 1]} rounded-full border-2 transition-all duration-200 hover:border-white/30 cursor-pointer flex items-center justify-center text-sm font-bold text-white`}
    >
      {value}
    </button>
  );
}

function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #111827 60%, #0f172a 100%)" }}>
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="space-y-2">
          <div className="flex justify-center gap-3 mb-6">
            {["D", "I", "S", "C"].map((d) => (
              <div key={d} className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black" style={{ background: DISC_INFO[d].bg, color: DISC_INFO[d].color, border: `1.5px solid ${DISC_INFO[d].color}40` }}>
                {d}
              </div>
            ))}
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Avaliação DISC
          </h1>
          <p className="text-lg text-slate-400 font-light">Descubra seu perfil comportamental</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-left">
          {Object.entries(DISC_INFO).map(([key, info]) => (
            <div key={key} className="p-4 rounded-2xl" style={{ background: info.bg, border: `1px solid ${info.color}30` }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{info.icon}</span>
                <span className="font-bold text-white text-sm">{info.label}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{info.traits.join(" · ")}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3 text-sm text-slate-500">
          <p>24 afirmações · ~5 minutos · Relatório com IA</p>
        </div>
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 8px 32px rgba(99,102,241,0.3)" }}
        >
          Iniciar Avaliação →
        </button>
      </div>
    </div>
  );
}

function QuestionScreen({ question, current, total, answer, onAnswer, onNext, onPrev }) {
  const progress = ((current) / total) * 100;
  const info = DISC_INFO[question.dim];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #111827 60%, #0f172a 100%)" }}>
      <div className="max-w-xl w-full space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Questão {current} de {total}</span>
            <span style={{ color: info.color }} className="font-semibold">{info.icon} {info.label}</span>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${info.color}, ${info.color}aa)` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="p-8 rounded-3xl space-y-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}>
          <p className="text-xl text-white leading-relaxed font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
            "{question.text}"
          </p>

          {/* Scale */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 py-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <ScaleButton key={v} value={v} selected={answer === v} onClick={onAnswer} color={info.color} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>{LABELS[0]}</span>
              <span>{LABELS[4]}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {current > 1 && (
            <button onClick={onPrev} className="flex-1 py-3.5 rounded-2xl text-slate-400 font-semibold transition-all hover:text-white" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              ← Anterior
            </button>
          )}
          <button
            onClick={onNext}
            disabled={!answer}
            className="flex-1 py-3.5 rounded-2xl text-white font-bold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
            style={{ background: answer ? `linear-gradient(135deg, ${info.color}, ${info.color}bb)` : "rgba(255,255,255,0.06)", boxShadow: answer ? `0 8px 24px ${info.color}40` : "none" }}
          >
            {current === total ? "Ver Resultado →" : "Próxima →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  const [dot, setDot] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDot(d => (d + 1) % 4), 400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #111827 60%, #0f172a 100%)" }}>
      <div className="flex gap-3">
        {Object.entries(DISC_INFO).map(([k, info], i) => (
          <div key={k} className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-all duration-300" style={{ background: info.bg, color: info.color, border: `1.5px solid ${info.color}50`, transform: dot === i ? "scale(1.3)" : "scale(1)" }}>
            {k}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-white text-lg font-semibold">Analisando seu perfil{"...".slice(0, dot + 1)}</p>
        <p className="text-slate-500 text-sm mt-1">A IA está gerando seu relatório personalizado</p>
      </div>
    </div>
  );
}

const CustomRadarLabel = ({ x, y, cx, cy, value }) => {
  const dx = x - cx, dy = y - cy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = x + (dx / len) * 18, ny = y + (dy / len) * 14;
  return <text x={nx} y={ny} textAnchor="middle" dominantBaseline="middle" fill={DISC_INFO[value]?.color || "#fff"} fontSize={13} fontWeight="800">{value}</text>;
};

function ResultsScreen({ scores, aiInsight, name }) {
  const maxScore = 30;
  const radarData = Object.entries(scores).map(([k, v]) => ({ subject: k, value: Math.round((v / maxScore) * 100), fullMark: 100 }));
  const barData = Object.entries(scores).map(([k, v]) => ({ name: DISC_INFO[k].label, score: Math.round((v / maxScore) * 100), key: k }));
  const dominantKey = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const dominant = DISC_INFO[dominantKey];

  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #111827 60%, #0f172a 100%)" }}>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-slate-500 text-sm uppercase tracking-widest">Resultado da Avaliação</p>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Seu Perfil Comportamental
          </h1>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full" style={{ background: dominant.bg, border: `1px solid ${dominant.color}40` }}>
            <span className="text-xl">{dominant.icon}</span>
            <span className="font-bold text-white">Perfil Dominante: {dominant.label}</span>
          </div>
        </div>

        {/* Charts side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Radar */}
          <div className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-slate-400 text-sm mb-3 font-medium">Visão Geral</p>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={75}>
                <PolarGrid stroke="rgba(255,255,255,0.07)" />
                <PolarAngleAxis dataKey="subject" tick={<CustomRadarLabel />} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar */}
          <div className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-slate-400 text-sm mb-3 font-medium">Pontuação por Dimensão</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} width={85} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff", fontSize: 13 }}
                  formatter={(v) => [`${v}%`, "Score"]}
                />
                <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                  {barData.map((entry) => (
                    <rect key={entry.key} fill={DISC_INFO[entry.key].color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score cards */}
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .map(([k, v]) => {
              const pct = Math.round((v / maxScore) * 100);
              const info = DISC_INFO[k];
              return (
                <div key={k} className="p-4 rounded-2xl" style={{ background: info.bg, border: `1px solid ${info.color}30` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{info.icon}</span>
                      <span className="text-white font-bold text-sm">{info.label}</span>
                    </div>
                    <span className="font-black text-xl" style={{ color: info.color }}>{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.3)" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: info.color }} />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {info.traits.slice(0, 2).map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.25)", color: info.color }}>{t}</span>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        {/* AI Insight */}
        <div className="p-6 rounded-3xl space-y-4" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <p className="text-indigo-400 font-bold text-sm uppercase tracking-widest">Análise Personalizada por IA</p>
          </div>
          {aiInsight ? (
            <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-line">{aiInsight}</p>
          ) : (
            <div className="space-y-2">
              {[80, 60, 90, 50].map((w, i) => (
                <div key={i} className="h-3 rounded-full animate-pulse" style={{ width: `${w}%`, background: "rgba(255,255,255,0.06)" }} />
              ))}
            </div>
          )}
        </div>

        {/* Restart */}
        <button
          onClick={() => window.location.reload()}
          className="w-full py-4 rounded-2xl text-slate-400 font-semibold transition-all hover:text-white text-sm"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          Refazer Avaliação
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("welcome"); // welcome | questions | loading | results
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState(null);
  const [aiInsight, setAiInsight] = useState(null);

  const question = QUESTIONS[current];

  function handleAnswer(value) {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  }

  function handleNext() {
    if (current < QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
    } else {
      finishAssessment();
    }
  }

  function handlePrev() {
    if (current > 0) setCurrent(c => c - 1);
  }

  function calcScores() {
    const dims = { D: 0, I: 0, S: 0, C: 0 };
    QUESTIONS.forEach(q => {
      dims[q.dim] += answers[q.id] || 0;
    });
    return dims;
  }

  async function finishAssessment() {
    setStep("loading");
    const s = calcScores();
    setScores(s);

    const maxScore = 30;
    const pcts = Object.fromEntries(Object.entries(s).map(([k, v]) => [k, Math.round((v / maxScore) * 100)]));
    const dominant = Object.entries(pcts).sort((a, b) => b[1] - a[1])[0][0];

    const prompt = `Você é um especialista em psicologia comportamental e perfis DISC. 
Analise os seguintes resultados de uma avaliação DISC e gere um relatório personalizado em português brasileiro:

Pontuações (% de 0-100):
- Dominância (D): ${pcts.D}%
- Influência (I): ${pcts.I}%
- Estabilidade (S): ${pcts.S}%
- Conformidade (C): ${pcts.C}%
- Perfil Dominante: ${dominant} (${DISC_INFO[dominant].label})

Gere um relatório com 3-4 parágrafos que inclua:
1. Uma descrição do perfil predominante e o que isso significa para o profissional
2. Pontos fortes principais baseados na combinação de perfis
3. Áreas de atenção ou desenvolvimento
4. Uma dica prática para o dia a dia

Seja específico, inspirador e útil. Limite a 250 palavras. Não use marcadores ou títulos, escreva em formato de texto corrido.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      setAiInsight(text);
    } catch (e) {
      setAiInsight("Não foi possível gerar a análise por IA no momento. Consulte seu perfil dominante e as pontuações acima para compreender seu estilo comportamental.");
    }

    setStep("results");
  }

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  if (step === "welcome") return <WelcomeScreen onStart={() => setStep("questions")} />;
  if (step === "questions") return (
    <QuestionScreen
      question={question}
      current={current + 1}
      total={QUESTIONS.length}
      answer={answers[question.id]}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrev={handlePrev}
    />
  );
  if (step === "loading") return <LoadingScreen />;
  if (step === "results") return <ResultsScreen scores={scores} aiInsight={aiInsight} />;
}
   
