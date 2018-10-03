import React from 'react';
import {
  StyleSheet,
  View,
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
    this.props.navigation.navigate('SignUpAddress');
  }

  render() {
    return (
      <Container>
        <Header style={styles.header} androidStatusBarColor={Colors.lemonGreen}>
          <Body>
            <Title>Cadastro</Title>
          </Body>
        </Header>
        <Content>
          <View style={styles.inputsContainer}>
            <View style={{height: 40}} />
            <Instructions
              title="Informe seus"
              subtitle="Dados Pessoais"
              colors={{ title: Colors.dark, subtitle: Colors.weirdGreen }} />
            <Item floatingLabel >
              <Label>Nome</Label>
              <Input/>
            </Item>
            <Item floatingLabel>
              <Label>Data de Nascimento</Label>
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

