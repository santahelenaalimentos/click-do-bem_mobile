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
    this.props.navigation.navigate('SignUpCredentials');
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.inputsContainer}>
            <Instructions
              title="Informe seu"
              subtitle="Telefone"
              colors={{ title: Colors.dark, subtitle: Colors.weirdGreen }} />
            <Item floatingLabel >
              <Label>Telefone</Label>
              <Input/>
            </Item>
            <Item floatingLabel>
              <Label>Celular</Label>
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