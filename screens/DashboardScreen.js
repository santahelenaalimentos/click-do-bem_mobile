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
          title='Menu' />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button transparent
            style={styles.button}
            onPress={() => this.props.navigation.navigate('CreateDonation', { ...this.props.navigation.state.params })}>
            <Text style={styles.buttonText}>
              Criar Doação
            </Text>
          </Button>
          <Button transparent
            style={styles.button}
            onPress={() => this.props.navigation.navigate('CreateNeed', { ...this.props.navigation.state.params })}>
            <Text style={styles.buttonText}>
              Criar Necessidade
            </Text>
          </Button>
          <Button transparent
            style={styles.button}
            onPress={() => this.props.navigation.navigate('ProfileScreen')}>
            <Text style={styles.buttonText}>
              Meu Perfil
            </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    user: state.user
  }
}

export default connect(mapStateToProps, null)(DashboardScreen)

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.purple,
    borderWidth: 1,
    minWidth: '60%',
    height: 35,
    margin: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.purple,
    fontSize: 14,
  },

});
