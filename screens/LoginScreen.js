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
    const { navigate } = this.props.navigation;
    ToastAndroid.show('Fazendo login...', ToastAndroid.SHORT);
    navigate('Dashboard');
  }

  onPressSignUp(){
    ToastAndroid.show('Fazendo cadastro...', ToastAndroid.SHORT);
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.halfHeight}>
          <Image
            source={require('../assets/images/sh-logo.png')}
            style={styles.welcomeImage}
          /> 
        </View>

        <Content contentContainerStyle={styles.halfHeight}>
          <Item floatingLabel style={{width: '80%'}}>
            <Label style={{color: '#666'}}>Username</Label>
            <Input  style={styles.credentialsInput}/>
          </Item>
          <Item floatingLabel style={{width: '80%'}}>
            <Label style={{color: '#666'}}>Password</Label>
            <Input  style={styles.credentialsInput}/>
          </Item>

          <View style={styles.buttonContainer}>
            <Button onPress={this.onPressSignIn} block primary style={styles.signinButton}>
              <Text style={styles.buttonText}>Entrar</Text>
            </Button>
            <Button onPress={this.onPressSignUp} block success style={styles.signupButton}>
              <Text style={styles.buttonText}>Cadastrar</Text>
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
  },
  halfHeight: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain'
  },
  credentialsInput: {
    width: '85%',
    height: 50,
    color: '#333',
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    marginTop: 15
  },
  signinButton: {
    marginRight: 10,
    width: '20%'
  },
  signupButton: {
    width: '20%'
  },
  buttonText: {
    color: '#fff'
  }
  
});
