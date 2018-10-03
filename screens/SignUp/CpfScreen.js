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
  Title,
  Body,
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
    this.props.navigation.navigate('SignUpPersonal');
  }

  render() {
    return (
      <Container>
        <Header style={styles.header} androidStatusBarColor={Colors.weirdGreen}>
          <Body>
            <Title>Cadastro</Title>
          </Body>
        </Header>
        <Content>
          <View style={styles.inputsContainer}>
            <View style={{height: 10}} />
            <Instructions
              title="Informe seu"
              subtitle="CPF"
              colors={{ title: Colors.dark, subtitle: Colors.weirdGreen }} />
            <Item floatingLabel >
              <Label>CPF</Label>
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
    ...Platform.select({
      ios: {

      },
      android: {
        backgroundColor: '#aaaaaa',
      }
    }),
  },
  inputsContainer: {
    flex: 1,
    width: '89%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  }
});

