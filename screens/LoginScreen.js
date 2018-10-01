import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ToastAndroid
} from 'react-native';
import {
  Button,
  Item,
  Label,
  Input,
  Content
} from 'native-base';
import { Colors } from '../constants/Colors';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);

    

    this.state = {
      login: '',
      password: '',
    }

    this.onPressSignIn = this.onPressSignIn.bind(this)
    this.onPressSignUp = this.onPressSignUp.bind(this)
  }

  onPressSignIn(){
    ToastAndroid.show('Fazendo login...', ToastAndroid.SHORT);
    this.props.navigation.navigate('Dashboard');
    
  }

  onPressSignUp(){
    const { navigate } = this.props.navigation;
    ToastAndroid.show('Fazendo cadastro...', ToastAndroid.SHORT);
    navigate('SignUpCPF');
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={{height: 40}}/>

        <View >
          <Image
            source={require('../assets/images/sh-logo.png')}
            style={styles.welcomeImage}
          /> 
        </View>

        <View style={{height: 20}}/>
        
        <Content >
          <View style={styles.credentialsContainer}>
            <Item floatingLabel >
              <Label >CPF</Label>
              <Input style={styles.credentialsInput} />
            </Item>
            <Item floatingLabel >
              <Label >Senha</Label>
              <Input style={styles.credentialsInput} />
            </Item>
          </View>

          <View style={{height: 40}}/>
          
          <View style={styles.buttonContainer}>
            <Button onPress={this.onPressSignIn} block primary >
              <Text style={styles.buttonText}>Entrar</Text>
            </Button>
            <View style={{height: 20}}/>
            <Button onPress={this.onPressSignUp} block success >
              <Text style={styles.buttonText}>Cadastar</Text>
            </Button>
          </View>
        </Content>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcomeImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain'
  },
  credentialsContainer: {
    minWidth: '80%',
  },
  credentialsInput: {
    minWidth: '80%',
    height: 50,
    color: '#333',
  },
  buttonContainer:{
    minWidth: '80%',
    flexDirection: 'column',
  },
  buttonText: {
    color: '#fff'
  }
  
});
