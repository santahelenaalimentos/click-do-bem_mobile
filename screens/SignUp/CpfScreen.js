import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  AsyncStorage,
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
      cpf: '',
    }

    this.handleNext = this.handleNext.bind(this)
  }

  _storeData = async () => {
    let { cpf } = this.state;
    let data = {
      cpf
    }
    try {
      await AsyncStorage.setItem('cpfData', JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  handleNext(){
    let { cpf } = this.state;
    console.log(cpf)
    if(cpf.length != 11){
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
    fetch(`http://ec2-52-23-254-48.compute-1.amazonaws.com/api/v1/usuario/verificadocumento/${cpf}`, 
    {
      method: 'GET',
    })
    .then(res => res.json())
    .then((data) => {
      if(data.cadastrado){
        this.toastWarning('Você já está cadastrado...')
        return
      }
      if(data.situacao === 'ativo') {
        this.toastSuccess('Cadastro autorizado...')
        console.log('guardando dados')
        this._storeData();
        console.log('dados guardados')
        this.props.navigation.navigate('SignUpPersonal')
        return
      }
      this.toastWarning('Acesso não permitido.')
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
            <View style={{height: 10}} />
            <Instructions
              title="Informe seu"
              subtitle="CPF"
              colors={{ title: Colors.dark, subtitle: Colors.weirdGreen }} />
            <Item stackedLabel >
              <Label>CPF</Label>
              <Input 
              value={this.state.cpf}
              onChangeText={(cpf) => this.setState({ cpf })}/>
            </Item>
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
  }
});

