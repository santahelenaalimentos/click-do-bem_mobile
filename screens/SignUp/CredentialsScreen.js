import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import {
  Container,
  Item,
  Label,
  Input,
  Content,
  Header,
  Body,
  Title,
  Toast,
} from 'native-base';
import ContinueButton from '../../components/SignUp/ContinueButton';
import Instructions from '../../components/SignUp/Instructions';
import Colors from '../../constants/Colors';
import MyHeader from '../../components/MyHeader'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      email: '',
      confirmaEmail: '',
      senha: '',
      confirmaSenha: '',
    }
    this.handleNext = this.handleNext.bind(this)
  }

  handleNext(){
    const { email, senha } = this.state;
    let data = {
      email, senha, ...this.props.navigation.state.params
    }
    // console.log('data:', data);
    console.log(JSON.stringify(data));

    fetch(`http://ec2-52-23-254-48.compute-1.amazonaws.com/api/v1/colaborador/cadastrar`, 
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
        this.toastSuccess('Cadastro efetuado com sucesso!')
        this.props.navigation.navigate('Login')
      }
      else {
        console.log(data);
        this.toastWarning('Ocorreu um erro inesperado.');
      }
    })
    .catch((err) => console.log(err))
  }

  toastSuccess(msg){
    Toast.show({
      text: msg,
      buttonText: 'OK',
      type: 'success',
      style: {
        marginBottom: 100,
      },
      duration: 3000,
    })
  }

  toastWarning(msg){
    Toast.show({
      text: msg,
      buttonText: 'OK',
      type: 'warning',
      style: {
        marginBottom: 100,
      },
      duration: 3000,
    })
  }

  render() {
    return (
      <Container>
        <MyHeader 
          buttonColor={Colors.weirdGreen}
          goBack={() => this.props.navigation.goBack()}
          cancel={() => this.props.navigation.navigate('Login')}
          headerAndroid={Colors.dark}
          statusBarAndroid={Colors.lighterDark}/>        
        <Content>
          <View style={styles.inputsContainer}>
            <Instructions
              title="Informe seu"
              subtitle="E-mail e senha"
              colors={{ title: Colors.dark, subtitle: Colors.weirdGreen }} />

            <Text style={styles.label}>E-mail</Text>
            <TextInput 
              style={styles.input}
              value = {this.state.email}
              onChangeText = {(email) => this.setState({email})}/>

            <Text style={styles.label}>Confirme o e-mail</Text>
            <TextInput 
              style={styles.input}
              value = {this.state.confirmaEmail}
              onChangeText = {(confirmaEmail) => this.setState({confirmaEmail})}/>

            <Text style={styles.label}>Senha</Text>
            <TextInput 
              secureTextEntry = {true}
              style={styles.input}
              value = {this.state.senha}
              onChangeText = {(senha) => this.setState({senha})}/>

            <Text style={styles.label}>Confirme a senha</Text>
            <TextInput 
              secureTextEntry = {true}
              style={styles.input}
              value = {this.state.confirmaSenha}
              onChangeText = {(confirmaSenha) => this.setState({confirmaSenha})}/>

          </View>
        </Content>
        <ContinueButton
          handler={this.handleNext}
          colors={{ button: Colors.lemonGreen, container: Colors.dark }} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
  },
  inputsContainer: {
    flex: 1,
    width: '89%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
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
    borderBottomWidth:  Platform.OS === 'ios' ? 1 : 1,
  },
});