import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {selectV2, text, withKnobs} from '@storybook/addon-knobs/react';
import {action} from '@storybook/addon-actions';
import CommandesDeLaPartie from '../CommandesDeLaPartie';
import {View} from 'react-native';
import {Styles} from '../../../../styles';
import {BULL} from '../../../domaine/arbitrage/chiffre';

storiesOf('Burma', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <View style={[Styles.container, {paddingTop: 50}]}>{story()}</View>
  ))
  .add('Commandes de la partie', () => (
    <CommandesDeLaPartie
      lanceur={text('lanceur', 'Noémie')}
      chiffreCourant={selectV2(
        'chiffre courant',
        ['17', 'DOUBLE', 'TRIPLE', BULL],
        'DOUBLE',
      )}
      onLancerSurChiffre={action('lancer sur Chiffre')}
      onLancerSurDouble={action('lancer sur Double')}
      onLancerSurTriple={action('lancer sur Triple')}
    />
  ));
