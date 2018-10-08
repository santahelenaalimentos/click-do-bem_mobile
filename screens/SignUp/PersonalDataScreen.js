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
  Toast,
} from 'native-base';
import { TextInputMask } from 'react-native-masked-text'
import MyHeader from '../../components/MyHeader'
import ContinueButton from '../../components/SignUp/ContinueButton';
import Instructions from '../../components/SignUp/Instructions';
import Colors from '../../constants/Colors';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      nome: '',
      dataNascimento: ''
    }
    this.handleNext = this.handleNext.bind(this)
  }

  handleNext(){
    const { nome, dataNascimento } = this.state;

    let errs = [];
    if(!nome || !dataNascimento) errs.push('É obrigatório informar todos os campos');
    let nasc = dataNascimento.split('/');
    let today = new Date();
    if(nasc[0] > 31 || nasc[1] > 12 || nasc[2] > today.getFullYear() || dataNascimento.length !== 10)
    errs.push('A data de nascimento deve ser válida')
    if(errs.length){
      this.toastWarning(errs.map(err => `${err}\n`))
      return
    }

    this.props.navigation.navigate('SignUpAddress', {
      nome, dataNascimento: dataNascimento.split("/").reverse().join("-"), 
      ...this.props.navigation.state.params
    });
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
          statusBarAndroid={Colors.lighterDark}
          title='Cadastro'/>
        <Content>
          <View style={styles.inputsContainer}>
            <View style={{height: 20}} />
            <Instructions
              title="Informe seus"
              subtitle="Dados Pessoais"
              colors={{ title: Colors.dark, subtitle: Colors.weirdGreen }} />

            <Text style={styles.label}>Nome</Text>
            <TextInput autoCapitalize='words'
            style={styles.input}
            value = {this.state.nome}
            onChangeText = {(nome) => this.setState({nome})}/>

            <Text style={styles.label}>Data de nascimento</Text>
            <TextInputMask
              style={styles.input}
              type={'datetime'}
              value={this.state.dataNascimento}
              options={{
                format: 'DD/MM/YYYY'
              }}
              maxLength={10}
              onChangeText={(dataNascimento) => this.setState({ dataNascimento })}/>

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
    borderBottomWidth:  Platform.OS === 'ios' ? 1 : 0,
  },
});

