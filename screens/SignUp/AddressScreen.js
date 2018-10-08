import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Picker,
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
} from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
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
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
      cep: '',
    }

    this.handleNext = this.handleNext.bind(this)
  }

  handleNext(){
    const { logradouro, numero, complemento, bairro, cidade, uf, cep } = this.state;
    this.props.navigation.navigate('SignUpPhone', {
      endereco: {logradouro, numero, complemento, bairro, cidade, uf, cep: cep.replace("-","") },
      ...this.props.navigation.state.params
    });
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
              subtitle="Endereço"
              colors={{ title: Colors.dark, subtitle: Colors.weirdGreen }} />

            <Text style={styles.label}>CEP</Text>
            <TextInputMask 
              style={styles.input}
              type='zip-code'
              value = {this.state.cep}
              maxLength={9}
              onChangeText = {(cep) => this.setState({cep})}/>

            <Text style={styles.label}>Estado</Text>
            <TextInput 
              style={styles.input}
              value = {this.state.uf}
              onChangeText = {(uf) => this.setState({uf})}/>

            <Text style={styles.label}>Cidade</Text>
            <TextInput 
              style={styles.input}
              value = {this.state.cidade}
              onChangeText = {(cidade) => this.setState({cidade})}/>

            <Text style={styles.label}>Endereço</Text>
            <TextInput 
              style={styles.input}
              value = {this.state.logradouro}
              onChangeText = {(logradouro) => this.setState({logradouro})}/>

            <Text style={styles.label}>Número</Text>
            <TextInput 
              style={styles.input}
              value = {this.state.numero}
              onChangeText = {(numero) => this.setState({numero})}/>

            <Text style={styles.label}>Bairro</Text>
            <TextInput 
              style={styles.input}
              value = {this.state.bairro}
              onChangeText = {(bairro) => this.setState({bairro})}/>

            <Text style={styles.label}>Complemento</Text>
            <TextInput 
              style={styles.input}
              value = {this.state.complemento}
              onChangeText = {(complemento) => this.setState({complemento})}/>

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

