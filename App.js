import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Root } from 'native-base'
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'

export default class App extends React.Component {
  constructor(){
    super()

    // global.BASE_API_V1 = 'http://hml-clickdobemapi.santahelena.com/api/v1'
    global.BASE_API_V1 = 'http://dev-clickdobemapi.santahelena.com/api/v1'
    
    this.state = {
      isLoadingComplete: false,
    };
  }
  
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={createStore(reducer)}>
          <Root style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {/* {Platform.OS === 'android' && <StatusBar backgroundColor={'#cccccc'} style={{ paddingBottom: 10 }} />} */}
            <AppNavigator />
          </Root>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/sh-logo.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
