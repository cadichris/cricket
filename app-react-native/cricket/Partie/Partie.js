import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import InscriptionDesJoueurs from './InscriptionDesJoueurs'

class Partie extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {phase, style} = this.props
    return (
      <View style={style}>
        {
          phase === 'INSCRIPTION'
            ? <InscriptionDesJoueurs />
            : null
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    phase: state.partie.phase
  }
}

export default connect(mapStateToProps)(Partie)