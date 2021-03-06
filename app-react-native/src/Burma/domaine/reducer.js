import {DEMARRER_BURMA, VOLEE} from './actions';
import {elementSuivant} from '../../utils/tableau';
import {
  dernierChiffre,
  leChiffreSuivant,
  premierChiffre,
} from './arbitrage/chiffre';
import Score from './arbitrage/Score';

const STATE_INITIAL = {
  scores: {},
  lanceur: undefined,
  chiffreCourant: undefined,
  vainqueur: undefined,
};

const burma = (state = STATE_INITIAL, action) => {
  switch (action.type) {
    case DEMARRER_BURMA:
      return {
        ...STATE_INITIAL,
        lanceur: action.joueurs[0],
        scores: action.joueurs.reduce(
          (scores, joueur) => ({
            ...scores,
            [joueur]: new Score().tableau(),
          }),
          {},
        ),
        chiffreCourant: premierChiffre(),
      };

    case VOLEE:
      const {
        payload: {lanceur, contrat},
      } = action;

      const laPartieSeTermine = estLaDerniereVolee(
        lesJoueurs(state),
        lanceur,
        state.chiffreCourant,
      );

      const chiffreSuivant = leChiffreSuivant(state.chiffreCourant).avec(
        lesJoueurs(state),
        lanceur,
      );

      const nextScores = {
        ...state.scores,
        [lanceur]: new Score(state.scores[lanceur]).noter(contrat).tableau(),
      };

      return {
        ...state,
        lanceur: laPartieSeTermine
          ? undefined
          : elementSuivant(lanceur, lesJoueurs(state)),
        chiffreCourant: chiffreSuivant,
        scores: nextScores,
        vainqueur: laPartieSeTermine ? meilleurScore(nextScores) : undefined,
      };

    default:
      return state;
  }
};

const lesJoueurs = state => Object.keys(state.scores);

const estLaDerniereVolee = (tousLesJoueurs, lanceur, chiffre) =>
  tousLesJoueurs.indexOf(lanceur) === tousLesJoueurs.length - 1 &&
  chiffre === dernierChiffre();

const meilleurScore = scores =>
  Object.keys(scores).reduce((vainqueur, challenger) => {
    const scoreDuVainqueur = new Score(scores[vainqueur]);
    const scoreDuChallenger = new Score(scores[challenger]);
    if (scoreDuVainqueur.estMeilleurQue(scoreDuChallenger)) return vainqueur;

    return challenger;
  }, Object.keys(scores)[0]);

export default burma;
