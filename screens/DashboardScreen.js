import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  Container,
  Button,
} from 'native-base';
import MyHeader from '../components/MyHeader'
import Colors from '../constants/Colors'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container style={styles.container}>
        <MyHeader 
          buttonColor={Colors.weirdGreen}
          headerAndroid={Colors.dark}
          statusBarAndroid={Colors.lighterDark}
          title='Dashboard'/>
        <View>
          <Button 
          style={styles.button} 
          onPress={() => this.props.navigation.navigate('CreateDonation', {...this.props.navigation.state.params})}>
            <Text style={styles.buttonText}>
              Criar Nova Doação
            </Text>
          </Button>
          <Button 
          style={styles.button} 
          onPress={() => this.props.navigation.navigate('CreateNeed', {...this.props.navigation.state.params})}>
            <Text style={styles.buttonText}>
              Criar Nova Necessidade
            </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button:{
    backgroundColor: Colors.lemonGreen,
    minWidth: '60%',
    padding: 15,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },

});
