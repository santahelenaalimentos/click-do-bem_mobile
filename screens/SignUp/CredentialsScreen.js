import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  Left,
  Right,
  Button
} from 'native-base';

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
          <Content>
            <Header>
              <Body>
                <Left>
                </Left>

                <Title>
                  Cadastro
                </Title>
                <Right>
                    
                </Right>
              </Body>
            </Header>
            <Text>
              Informe o seu email e senha
            </Text>
            <TextInput></TextInput>
            <Button onPress={this.handleNext}>
              <Text>
                Continuar
              ]</Text>
            </Button>
          </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({

  
});
