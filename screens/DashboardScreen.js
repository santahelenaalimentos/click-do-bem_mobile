import React from 'react';
import {
  StyleSheet,
  View
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

  }


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
          </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({

  
});
