import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import {
  Button,
  Item,
  Label,
  Input,
  Content,
  Header,
} from 'native-base';
import Colors from '../constants/Colors';
import NoHeader from '../components/NoHeader'

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
    this.props.navigation.navigate('Dashboard');
    
  }

  onPressSignUp(){
    this.props.navigation.navigate('SignUpCPF');
  }

  render() {
    return (
      <View style={styles.container}>
        <NoHeader />
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/cb-logo.png')}
            style={styles.welcomeImage}
          /> 
        </View>

        <View style={{height: 20}}/>
        
        <Content style={styles.credentialsContainer}>
          <View >
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
          
          <View >
            <Button style={styles.signInButton} onPress={this.onPressSignIn} block >
              <Text style={styles.buttonText}>Entrar</Text>
            </Button>
            <View style={styles.ou}>
              <Text> ou </Text>
            </View>
            <Button style={styles.signUpButton} onPress={this.onPressSignUp} block >
              <Text style={styles.buttonText}>Criar nova conta</Text>
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
  logoContainer: {
    minWidth: '100%',
  },
  welcomeImage: {
    minWidth: '100%',
    height: 260,
    resizeMode: 'contain',
    marginTop: 30,
  },
  credentialsContainer: {
    minWidth: '85%',
  },
  credentialsInput: {
    minWidth: '80%',
    height: 50,
    color: '#333',
  },
  buttonText: {
    color: '#fff'
  },
  signInButton: {
    backgroundColor: Colors.lemonGreen,
    elevation: 3,
  },
  signUpButton: {
    backgroundColor: Colors.weirdGreen,
    elevation: 3,
  },
  ou:{
    alignSelf: 'center',
    height: 25,

  },
});
