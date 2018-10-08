import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  TextInput
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
import { TextInputMask } from 'react-native-masked-text'
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
      telefoneFixo: '',
      telefoneCelular: '',
    }

    this.handleNext = this.handleNext.bind(this)
  }

  handleNext(){
    const { telefoneCelular, telefoneFixo } = this.state;
    
    let errs = [];
    if(!telefoneCelular) errs.push('É necessário informar um número de celular.');
    if(telefoneCelular.length !== 15) errs.push('É necessário informar um número de celular válido.');
    if(errs.length){
      this.toastWarning(errs.map(err => `${err}\n`))
      return
    }
    
    this.props.navigation.navigate('SignUpCredentials', {
      telefoneCelular, telefoneFixo, ...this.props.navigation.state.params
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
            <Instructions
              title="Informe seu"
              subtitle="Telefone"
              colors={{ title: Colors.dark, subtitle: Colors.weirdGreen }} />
              
            <Text style={styles.label}>Celular</Text>
            <TextInputMask
            maxLength={15}
            style={styles.input}
            type = {'cel-phone'}
            value={this.state.telefoneCelular}
            onChangeText={(telefoneCelular) => this.setState({ telefoneCelular })}
            options = {{
              withDDD: true,
            }}
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInputMask
            placeholder='Opcional'
            maxLength={14}
            style={styles.input}
            type = {'cel-phone'}
            value={this.state.telefoneFixo}
            onChangeText={(telefoneFixo) => this.setState({ telefoneFixo })}
            options = {{
              withDDD: true,
            }}
            />

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
    borderBottomWidth:  Platform.OS === 'ios' ? 1 : 0,
  },
});