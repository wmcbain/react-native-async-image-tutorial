/* @flow */

import React, { // eslint-disable-line no-unused-vars
  Component
} from 'react'

import {
  Animated,
  View
} from 'react-native'

type Style = number | string | Object | Array<?Style>

type Props = {
  placeholderColor?: string,
  style: {
    width: number,
    height: number,
    [key: string]: Style
  },
  source: {
    uri: string
  }
}

type State = {
  loaded: bool,
  imageOpacity: Animated.Value,
  placeholderOpacity: Animated.Value,
  placeholderScale: Animated.Value,
}

export default class AsyncImage extends Component {

  props: Props
  state: State

  constructor(props: Props) {
    super(props)
    this.state = {
      loaded: false,
      imageOpacity: new Animated.Value(0.0),
      placeholderOpacity: new Animated.Value(1.0),
      placeholderScale: new Animated.Value(1.0)
    }
  }

  render() {
    const {
      placeholderColor,
      style,
      source
    } = this.props

    const {
      imageOpacity,
      placeholderOpacity,
      placeholderScale
    } = this.state

    return (
      <View
        style={style}>

        <Animated.Image
          source={source}
          resizeMode={'contain'}
          style={[
            style,
            {
              opacity: imageOpacity,
              position: 'absolute',
              resizeMode: 'contain'
            }
          ]}
          onLoad={this._onLoad} />

        {!this.state.loaded &&
          <Animated.View
            style={[
              style,
              {
                backgroundColor: placeholderColor || '#90a4ae',
                opacity: placeholderOpacity,
                position: 'absolute',
                transform: [{ scale: placeholderScale }]
              }
            ]} />
        }

      </View>
    )
  }

  _onLoad = () => {
    const {
      placeholderScale,
      placeholderOpacity,
      imageOpacity
    } = this.state

    Animated.sequence([
      Animated.timing(placeholderOpacity, {
        delay: 1000,
        toValue: 1.0
      }),
      Animated.parallel([
        Animated.timing(placeholderScale, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(placeholderOpacity, {
          toValue: 0.66,
          duration: 100,
          useNativeDriver: true
        }),
      ]),
      Animated.parallel([
        Animated.parallel([
          Animated.timing(placeholderOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }),
          Animated.timing(placeholderScale, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true
          }),
        ]),
        Animated.timing(imageOpacity, {
          toValue: 1.0,
          delay: 200,
          duration: 300,
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      this.setState(() => ({ loaded: true }))
    })
  }
}
