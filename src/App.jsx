import { useState } from "react";

const perguntas = [
  { texto: "Gosto de assumir o controle das situações.", tipo: "D" },
  { texto: "Tomo decisões rapidamente.", tipo: "D" },
  { texto: "Sou direto e objetivo ao falar.", tipo: "D" },
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
    texto: "Você tende a ser direto, decidido, competitivo e focado em resultados.",
  },
  I: {
    nome: "Influência",
    texto: "Você tende a ser comunicativo, persuasivo, otimista e sociável.",
  },
  S: {
    nome: "Estabilidade",
    texto: "Você tende a ser paciente, colaborativo, confiável e harmonioso.",
  },
  C: {
    nome: "Conformidade",
    texto: "
