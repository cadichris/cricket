import React from 'react'
import { Animated } from 'react-native'

class ViewQuiDecale extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      animations: {
        decalage: new Animated.Value(1000)
      }
    }
  }

  componentDidMount() {
    const {dureeDuDecalage} = this.props
    Animated.timing(this.state.animations.decalage, {toValue: 0, duration: dureeDuDecalage,}).start()
  }

  render() {
    const {decalage} = this.state.animations
    const {coteDeDepart} = this.props

    return (
      <Animated.View
        style={this.props.style ? [[...this.props.style], {[coteDeDepart]: decalage}] : {[coteDeDepart]: decalage}}>
        {this.props.children}
      </Animated.View>
    )
  }
}

export default ViewQuiDecale