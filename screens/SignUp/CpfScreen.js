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
      documento: '',
    }

    this.handleNext = this.handleNext.bind(this)
  }

  handleNext(){
    const { documento } = this.state;
    console.log(documento)
    if(documento.length != 14){
      Toast.show({
        text: 'O CPF digitado não é válido.',
        buttonText: 'OK',
        type: 'warning',
        style: {
          marginBottom: 100,
        },
        duration: 10000,
      })
      return;
    }
    fetch(`http://ec2-52-23-254-48.compute-1.amazonaws.com/api/v1/usuario/verificadocumento/${documento.replace(".","").replace(".","").replace("-","")}`, 
    {
      method: 'GET',
    })
    .then(res => res.json())
    .then((data) => {
      if(data.cadastrado){
        this.toastWarning('Você já está cadastrado...')
      }
      else if(data.situacao === 'ativo') {
        const cpf = documento.replace(".","").replace(".","").replace("-","");
        this.toastSuccess('Cadastro autorizado...')
        this.props.navigation.navigate('SignUpPersonal', {
          documento: cpf
        })
      }
      else this.toastWarning('Acesso não permitido.')
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
          statusBarAndroid={Colors.lighterDark}
          title='Cadastro'/>
        <Content>
          <View style={styles.inputsContainer}>
            <View style={{height: 10}} />
            <Instructions
              title="Informe seu"
              subtitle="CPF"
              colors={{ title: Colors.dark, subtitle: Colors.weirdGreen }} />

            <Text style={styles.label}>CPF</Text>
            <TextInputMask
              style={styles.maskedInput}
              type={'cpf'}
              value={this.state.documento}
              maxLength={14}
              onChangeText={(documento) => this.setState({ documento })}/>

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
    borderBottomWidth:  Platform.OS === 'ios' ? 1 : 1,
  },
});

