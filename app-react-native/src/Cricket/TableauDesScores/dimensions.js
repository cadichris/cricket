import { Dimensions } from "react-native";
import { verticalScale } from "react-native-size-matters";

export const HAUTEUR_DE_LIGNE = verticalScale(40);

export const LARGEUR_COLONNE_DES_CHIFFRES = 50;

export const LARGEUR_COLONNE_JOUEUR = nbJoueurs =>
  (Dimensions.get("window").width - LARGEUR_COLONNE_DES_CHIFFRES) / nbJoueurs;
