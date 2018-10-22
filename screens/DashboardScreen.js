import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  Container,
  Content,
  Button,
} from 'native-base';
import MyHeader from '../components/MyHeader'
import Colors from '../constants/Colors'
import { connect } from 'react-redux';

class DashboardScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container>
        <MyHeader 
          title='Dashboard'/>
        <Content>
          <Text style={{alignSelf: 'center', minWidth: '85%', color: Colors.purple, marginTop: 10}}>Olá, {this.props.user.nome}</Text>
          <Button 
          style={styles.button} 
          onPress={() => this.props.navigation.navigate('CreateDonation', {...this.props.navigation.state.params})}>
            <Text style={styles.buttonText}>
              Nova Doação
            </Text>
          </Button>
          <Button 
          style={styles.button} 
          onPress={() => this.props.navigation.navigate('CreateNeed', {...this.props.navigation.state.params})}>
            <Text style={styles.buttonText}>
              Nova Necessidade
            </Text>
          </Button>
          <Button 
          style={styles.button} 
          onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>
              Sair
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state){
  return {
    token: state.token,
    user: state.user
  }
}

export default connect(mapStateToProps, null)(DashboardScreen)

const styles = StyleSheet.create({
  button:{
    backgroundColor: Colors.purple,
    minWidth: '80%',
    minHeight: 45,
    margin: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },

});
