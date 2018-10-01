import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {
  Container,
  Item,
  Label,
  Input,
  Header,
  Body,
  Title,
} from 'native-base';
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
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <Container>
        <KeyboardAvoidingView style={styles.content}>

          <Header style={styles.header}>
            <Body>
              <Title>
                Cadastro
              </Title>
            </Body>
          </Header>

          <Instructions
            title="Informe seu"
            subtitle="E-mail e senha"
            colors={{ title: Colors.dark, subtitle: Colors.lemonGreen }} />

          <View style={styles.inputsContainer} >
            <Item floatingLabel >
              <Label >E-mail</Label>
              <Input />
            </Item>
            <Item floatingLabel >
              <Label >Confirme o e-mail</Label>
              <Input />
            </Item>
            <Item floatingLabel >
              <Label >Senha</Label>
              <Input />
            </Item>
            <Item floatingLabel >
              <Label >Confirme a senha</Label>
              <Input />
            </Item>
          </View>

        </KeyboardAvoidingView>

        <ContinueButton
          handler={this.handleNext}
          colors={{ button: Colors.lemonGreen, container: Colors.dark }} />

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
  },
  inputsContainer: {
    width: '89%',
    alignSelf: 'center',
    marginTop: 50,
  }
});
