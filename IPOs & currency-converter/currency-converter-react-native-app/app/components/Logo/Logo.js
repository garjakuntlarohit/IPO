import React, { Component } from 'react';
import { View, Text, Keyboard, Animated, Platform } from 'react-native';

import styles from './styles';

const ANIMATION_DURATION = 250;

class Logo extends Component{
  constructor(props){
    super(props);

    this.containerImageWidth = new Animated.Value(styles.$largeContainerSize);
    this.imageWidth = new Animated.Value(styles.$largeImageSize);
  }
  componentDidMount(){
    let showListener = 'keyboardWillShow';
    let hideListener = 'keyboardWillHide';

    if(Platform.OS === 'android'){
      showListener = 'keyboardDidShow';
      hideListener = 'keyboardDidHide';
    }
    this.KeyboardShowListener = Keyboard.addListener(showListener, this.keyboardShow);
    this.KeyboardHideListener = Keyboard.addListener(hideListener, this.keyboardHide);
  }

  componentWillUnmount(){
    this.keyboardShow.remove();
    this.keyboardHide.remove();
  }

  keyboardShow = () => {

    Animated.parallel([
      Animated.timing(this.containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  }

  keyboardHide = () => {

    Animated.parallel([
      Animated.timing(this.containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  }

  render(){

    const containerImageStyle = [
      styles.containerImage,
      {width: this.containerImageWidth, height: this.containerImageWidth},
    ];

    const imageStyle = [
      styles.logo,
      {width: this.imageWidth},
      this.props.tintColor ? { tintColor: this.props.tintColor } : null,
    ];

    return(
      <View style={styles.container}>
        <Animated.Image resizeMode="contain" style={containerImageStyle} source={require('./images/background.png')}>
          <Animated.Image resizeMode="contain" style={imageStyle} source={require('./images/logo.png')}></Animated.Image>
        </Animated.Image>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    );
  }
}


export default Logo;
