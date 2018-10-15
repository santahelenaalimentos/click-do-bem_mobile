import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  AsyncStorage,
  Text,
} from 'react-native';
import {
  Container,
  Item,
  Label,
  Input,
  Content,
  Header,
  Title,
  Body,
} from 'native-base';
import { TextInputMask } from 'react-native-masked-text'

import Utils from '../../utils/Utils'
import ContinueButton from '../../components/SignUp/ContinueButton';
import Instructions from '../../components/SignUp/Instructions';
import Colors from '../../constants/Colors';
import MyHeader from '../../components/MyHeader'

export default class CpfScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      documento: '',
    }

    this.handleNext = this.handleNext.bind(this)
  }

  handleNext(){
    const { documento } = this.state;
    console.log(documento)
    if(documento.length != 14){
      Utils.toast('O CPF digitado não é válido.')
      return;
    }
    fetch(`http://dev-clickdobemapi.santahelena.com/api/v1/usuario/verificadocumento/${documento.replace(".","").replace(".","").replace("-","")}`, 
    {
      method: 'GET',
    })
    .then(res => res.json())
    .then((data) => {
      if(data.cadastrado){
        Utils.toast('CPF já cadastrado')
      }
      else if(data.situacao === 'ativo') {
        const cpf = documento.replace(".","").replace(".","").replace("-","");
        this.props.navigation.navigate('SignUpPersonal', {
          documento: cpf
        })
      }
      else Utils.toast('CPF não encontrado! Entre em contato com RH')
    })
    .catch((err) => console.log(err))
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
            <View style={{height: 10}} />
            <Instructions
              title="Informe seu"
              subtitle="CPF" />

            <Text style={styles.label}>CPF</Text>
            <TextInputMask
              style={styles.maskedInput}
              type={'cpf'}
              value={this.state.documento}
              maxLength={14}
              onChangeText={(documento) => this.setState({ documento })}/>

          </View>
        </Content>
        <ContinueButton handler={this.handleNext} />
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
    backgroundColor: 'white',
  },
  label: {
    fontSize: 14,
    color: '#999999',
    marginBottom: -5,
  },
  maskedInput: {
    height: 45,
    borderBottomColor: '#999999',
    borderBottomWidth:  Platform.OS === 'ios' ? 1 : 0,
  },
});

