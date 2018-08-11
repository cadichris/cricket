import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Celebration from "../../Technique/Celebration";
import { Textes } from "../../styles";
import Emoji from "@ardentlabs/react-native-emoji";

const Vainqueur = ({ nom }) => (
  <View>
    <Celebration />
    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
      <Text style={[Textes.titre]}>
        <Emoji name="trophy" />
      </Text>
      <Text style={[Textes.titre]}>{nom}</Text>
    </View>
  </View>
);

Vainqueur.propTypes = {
  nom: PropTypes.string.isRequired
};

export default Vainqueur;
