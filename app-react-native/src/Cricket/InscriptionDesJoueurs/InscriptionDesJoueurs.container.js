import React from 'react'
import { connect } from 'react-redux'
import { inscrireJoueur, demarrerPartie } from '../Cricket.actions'
import InscriptionDesJoueurs from './InscriptionDesJoueurs'

class InscriptionDesJoueursContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      joueur: ''
    }
  }

  render() {
    return <InscriptionDesJoueurs
      {...this.props}
      joueur={this.state.joueur}
      nommerLeJoueur={(nom) => this.setState({joueur: nom})}
      inscriptionEstPossible={() => this.inscriptionEstPossible()}
      declencherInscrireJoueur={() => this.inscrireJoueur()}
      declencherDemarrerLaPartie={() => this.props.dispatch(demarrerPartie())}
    />
  }

  inscriptionEstPossible() {
    const { joueur } = this.state
    const { joueurs } = this.props
    const joueurAvecNom = joueur !== ''
    const nomUnique = joueurs.indexOf(joueur) === -1

    return joueurAvecNom && nomUnique
  }

inscrireJoueur() {
    const { dispatch } = this.props
    const { joueur } = this.state
    dispatch(inscrireJoueur(joueur))
    this.setState({joueur: ''})
  }

}

const mapStateToProps = (state) => ({
    laPartiePeutDemarrer: state.cricket.actuel.peutDemarrer,
    joueurs: state.cricket.actuel.joueurs
  }
)

export default connect(mapStateToProps)(InscriptionDesJoueursContainer)