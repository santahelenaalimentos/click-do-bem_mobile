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
} from 'native-base';
import Utils from '../../utils/Utils'
import { TextInputMask } from 'react-native-masked-text'
import ContinueButton from '../../components/SignUp/ContinueButton';
import Instructions from '../../components/SignUp/Instructions';
import Colors from '../../constants/Colors';
import MyHeader from '../../components/MyHeader'

export default class PhoneScreen extends React.Component {
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
      Utils.toast(errs.map(err => `${err}\n`))
      return
    }
    
    this.props.navigation.navigate('SignUpCredentials', {
      telefoneCelular, telefoneFixo, ...this.props.navigation.state.params
    });
  }

  render() {
    return (
      <Container>
        <MyHeader 
          goBack={() => this.props.navigation.goBack()}
          cancel={() => this.props.navigation.navigate('Login')}
          title='Cadastro'/>
        <Content>
          <View style={styles.inputsContainer}>
            <Instructions
              title="Informe seu"
              subtitle="Telefone" />
              
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
          handler={this.handleNext} />
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