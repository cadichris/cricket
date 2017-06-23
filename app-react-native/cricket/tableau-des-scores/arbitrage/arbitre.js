'use strict'

import {toucher, penaliser, chiffreEstFerme} from "./score";

export function calculerLeNouveauScore(tableauDesScores, lancer) {
  const penalite = penaliteDuLancer(tableauDesScores, lancer)

  return tableauDesScores.map(s => (scorer(s, lancer, penalite)))
}

const LIMITE = 3

function penaliteDuLancer(scores, lancer) {
  const scoreDuLanceur = trouverLeScoreDuLanceur(scores, lancer.lanceur)
  return calculerLaPenalite(scoreDuLanceur.cible, lancer)
}

function trouverLeScoreDuLanceur(scores, lanceur) {
  return scores.filter(s => (s.joueur === lanceur))[0]
}

function calculerLaPenalite(cibleDuLanceur, lancer) {
  const touches = cibleDuLanceur[lancer.chiffre].touches
  const leChiffreVaSeFermer = touches + lancer.touches >= LIMITE
  const surplus = (touches + lancer.touches) - LIMITE

  return leChiffreVaSeFermer ? surplus * lancer.chiffre : 0
}

function scorer(score, lancer, penalite) {
  return score.joueur === lancer.lanceur
    ? toucher(lancer.chiffre, lancer.touches, score)
    : scorerUnAdversaire(score, lancer.chiffre, penalite)
}

function scorerUnAdversaire(score, chiffre, pointsDePenalite) {
  return chiffreEstFerme(chiffre, score)
    ? score
    : penaliser(pointsDePenalite, score)
}
