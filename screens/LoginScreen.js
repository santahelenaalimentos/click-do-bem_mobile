import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
} from 'react-native';
import {
  Button,
  Item,
  Label,
  Input,
  Content,
  Header,
  Toast,
} from 'native-base';
import md5 from 'md5';
import { TextInputMask } from 'react-native-masked-text'
import Colors from '../constants/Colors';
import NoHeader from '../components/NoHeader'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);

    

    this.state = {
      nome: '25195505896',
      senha: 'a1b2c3d4',
    }

    this.onPressSignIn = this.onPressSignIn.bind(this)
    this.onPressSignUp = this.onPressSignUp.bind(this)
  }

  onPressSignIn(){
    const { nome, senha } = this.state;
    const data = { nome: nome.replace(".","").replace(".","").replace("-",""), senha: md5(senha) };

    fetch(`http://ec2-52-23-254-48.compute-1.amazonaws.com/api/v1/usuario/autenticar`, 
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    })
    .then(res => res.json())
    .then((data) => {
      if(data.sucesso) {
        this.props.navigation.navigate('Dashboard',{
          token: data.token
        })
      }
      else {
        console.log(data);
        this.toastWarning(data.mensagem);
      }
    })
    .catch((err) => console.log(err))    
  }

  onPressSignUp(){
    this.props.navigation.navigate('SignUpCPF');
  }

  toastSuccess(msg){
    Toast.show({
      text: msg,
      buttonText: 'OK',
      type: 'success',
      duration: 3000,
    })
  }

  toastWarning(msg){
    Toast.show({
      text: msg,
      buttonText: 'OK',
      type: 'warning',
      duration: 3000,
    })
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
        
        <Content style={styles.credentialsContainer}>
          <View >

            <Text style={styles.label}>CPF</Text>
            <TextInputMask
              style={styles.input}
              type={'cpf'}
              value={this.state.nome}
              maxLength={14}
              onChangeText={(nome) => this.setState({ nome })}/>

            <Text style={styles.label}>Senha</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              value={this.state.senha}
              maxLength={8}
              onChangeText={(senha) => this.setState({ senha })}/>

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
    backgroundColor: '#fff',
  },
  logoContainer: {
    minWidth: '80%',
    minWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeImage: {
    height: 200,
    resizeMode: 'contain',
    marginTop:  Platform.OS === 'ios' ? 80 : 30,
    marginLeft: 15,
  },
  credentialsContainer: {
    minWidth: '85%',
  },
  credentialsInput: {
    minWidth: '80%',
    height: 40,
  },
  buttonText: {
    color: '#fff'
  },
  signInButton: {
    backgroundColor: Colors.lemonGreen,
    elevation: 1, 
    marginBottom: 4,
  },
  signUpButton: {
    backgroundColor: Colors.weirdGreen,
    elevation: 1, 
    marginBottom: 4,
  },
  ou:{
    alignSelf: 'center',
    height: 25,

  },
  label: {
    fontSize: 14,
    color: '#999999',
    marginBottom: -5,
    marginTop: 15
  },
  input: {
    height: 45,
    borderBottomColor: '#999999',
    borderBottomWidth:  Platform.OS === 'ios' ? 1 : 0,
  },
});
