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
  Picker,
  Left,
  Right,
  Icon,
} from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import MyHeader from '../../components/MyHeader'
import ContinueButton from '../../components/SignUp/ContinueButton';
import Instructions from '../../components/SignUp/Instructions';
import Colors from '../../constants/Colors';

const ufList = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']

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
      uf: null,
      cep: '',
    }

    this.handleNext = this.handleNext.bind(this)
  }

  handleNext(){
    const { logradouro, numero, complemento, bairro, cidade, uf, cep } = this.state;
    if(!logradouro || !numero || !bairro || !cidade || !uf || !cep){
      this.toastWarning('Favor preencher os campos obrigatórios')
      return
    }
    if(uf.length > 2) {
      this.toastWarning('Favor preencher o estado');
      return;
    }

    this.props.navigation.navigate('SignUpPhone', {
      endereco: {logradouro, numero, complemento, bairro, cidade, uf, cep: cep.replace("-","") },
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
            <Instructions
              title="Informe seu"
              subtitle="Endereço"
              colors={{ title: Colors.dark, subtitle: Colors.weirdGreen }} />

            <Item style={[styles.item, styles.inputEstado]}>
              <Left>
                <Text style={styles.labelUf}>Estado</Text>
              </Left>
              <Right>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: Platform.OS === 'android' ? '100%' : undefined }}
                  selectedValue={this.state.uf}
                  onValueChange={(uf) => this.setState({ uf })}>
                  <Picker.Item key='0' label='Selecione' value={null} />
                  { ufList.map(uf => <Picker.Item key={uf} label={uf} value={uf}/>) }
                </Picker>
              </Right>
            </Item>

            <Text style={styles.label}>Cidade</Text>
            <TextInput 
              style={styles.input}
              value = {this.state.cidade}
              onChangeText = {(cidade) => this.setState({cidade})}/>

            <Text style={styles.label}>CEP</Text>
            <TextInputMask 
              style={styles.input}
              type='zip-code'
              value = {this.state.cep}
              maxLength={9}
              onChangeText = {(cep) => this.setState({cep})}/>

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
              placeholder='Opcional'
              style={styles.input}
              value = {this.state.complemento}
              onChangeText = {(complemento) => this.setState({complemento})}/>

            <View style={{height: 40}}/>
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
  labelUf: {
    fontSize: 14,
    color: '#999999',
  },
  input: {
    height: 45,
    borderBottomColor: '#999999',
    borderBottomWidth:  Platform.OS === 'ios' ? 1 : 0,
  },
  inputEstado: {
    height: 45,
    borderBottomColor: '#999999',
    borderBottomWidth:  Platform.OS === 'ios' ? 1 : 1,
  },
  item: {
    minHeight: 70,
  },
});

