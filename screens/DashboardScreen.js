import React from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Body,
  Title,
} from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    // this.handleBackPress = this.handleBackPress.bind(this)
  }

  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  // }

  // handleBackPress = () => {
  //   this.props.navigation.popToTop(); // works best when the goBack is async
  //   return true;
  // }

  render() {
    return (
        <Container>
          <Content>
            <Header>
              <Body>
                <Title>
                  Dashboard
                </Title>
              </Body>
            </Header>
            <View style={styles.container}>
              <View style={styles.box}/>
              <View style={styles.box}/>
              <View style={styles.box}/>
            </View>
          </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: '#e76e63',
    margin: 10,
  }
  
});
