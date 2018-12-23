import React from "react";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";
import { Text, TouchableHighlight, View } from "react-native";
import { verticalScale } from "react-native-size-matters";
import Celebration from "../../Technique/Celebration";
import { FontSizes, Styles, Textes } from "../../styles";
import Joueur from "./Joueur";
import Touches from "./Touches";
import AnimatedNumber from "../../Technique/AnimatedNumber";
import Vainqueurs from "./Vainqueurs";

const HAUTEUR_DE_LIGNE = verticalScale(40);

const TableauDesScores = ({
  scores,
  onLancerDansSimple,
  vainqueurs,
  actif
}) => (
  <Animatable.View style={[{ flex: 1 }]} animation="bounceInRight">
    {vainqueurs.length > 0 && <Celebration />}
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: 56, marginTop: 40, paddingLeft: 5 }}>
        {[20, 19, 18, 17, 16, 15, "Bull"].map(chiffre => (
          <View key={chiffre} style={[{ height: HAUTEUR_DE_LIGNE }]}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={[Textes.light, { fontSize: FontSizes.standard }]}>
                {chiffre}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {scores.map(score => (
          <View key={score.joueur} style={{ width: `${100 / scores.length}%` }}>
            <View style={{ height: HAUTEUR_DE_LIGNE }}>
              <Joueur nom={score.joueur} />
            </View>
            {[20, 19, 18, 17, 16, 15, 25].map(chiffre => (
              <TouchableHighlight
                key={chiffre}
                disabled={!actif}
                onPress={() => onLancerDansSimple(score.joueur, chiffre)}
              >
                <View
                  style={[
                    { height: HAUTEUR_DE_LIGNE, justifyContent: "center" },
                    Styles.bordureBasse,
                    Styles.bordureGauche,
                    score.cible[chiffre].ferme && Styles.chiffreFerme
                  ]}
                >
                  <View>
                    <Touches
                      symbole="X"
                      nombre={score.cible[chiffre].touches}
                    />
                  </View>
                </View>
              </TouchableHighlight>
            ))}
            <View
              style={[
                Styles.bordureHaute,
                Styles.bordureGauche,
                Styles.bordureBasse,
                {
                  height: HAUTEUR_DE_LIGNE,
                  borderTopWidth: 3,
                  justifyContent: "center"
                }
              ]}
            >
              <AnimatedNumber value={score.penalite}>
                {value => (
                  <Text
                    style={[
                      Textes.titre,
                      { fontSize: FontSizes.standard, textAlign: "center" }
                    ]}
                  >
                    {Math.round(value)}
                  </Text>
                )}
              </AnimatedNumber>
            </View>
          </View>
        ))}
      </View>
    </View>

    {vainqueurs.length > 0 && <Vainqueurs noms={vainqueurs} />}
  </Animatable.View>
);

TableauDesScores.propTypes = {
  scores: PropTypes.array.isRequired,
  onLancerDansSimple: PropTypes.func.isRequired,
  vainqueurs: PropTypes.array.isRequired,
  actif: PropTypes.bool.isRequired
};

export default TableauDesScores;
