import React from 'react';
import { statusBarHeight } from '../constants/Layout';
import {
  StyleSheet,
  Platform
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
            <Header style={styles.header}>
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
  header:{
    ...Platform.select({
      android: {
        height: 78,
        paddingTop: 24,
      },
    }),

  },
  
});
