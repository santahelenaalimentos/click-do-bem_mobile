import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
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

    this.handleNext = this.handleNext.bind(this)
  }

  handleNext(){
    this.props.navigation.navigate('SignUpPhone');
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
            <Item floatingLabel >
              <Label>CEP</Label>
              <Input/>
            </Item>
            <Item floatingLabel>
              <Label>Estado</Label>
              <Input/>
            </Item>
            <Item floatingLabel>
              <Label>Cidade</Label>
              <Input/>
            </Item>
            <Item floatingLabel>
              <Label>Endereço</Label>
              <Input/>
            </Item>
            <Item floatingLabel>
              <Label>Número</Label>
              <Input/>
            </Item>
            <Item floatingLabel>
              <Label>Bairro</Label>
              <Input/>
            </Item>
            <Item floatingLabel>
              <Label>Complemento</Label>
              <Input/>
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
  header: {
    backgroundColor: 'white',
  },
  inputsContainer: {
    flex: 1,
    width: '89%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  }
});

