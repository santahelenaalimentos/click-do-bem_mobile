import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Header,
  Body,
  Left,
  Right,
} from 'native-base'
import MyHeader from '../../components/MyHeader'
import Colors from '../../constants/Colors'

export default class CreateDonationScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MyHeader 
          buttonColor={Colors.weirdGreen}
          goBack={() => this.props.navigation.goBack()}
          cancel={() => this.props.navigation.navigate('Dashboard')}
          headerAndroid={Colors.dark}
          statusBarAndroid={Colors.lighterDark}
          title='Nova Doação'/>
        <View>
          <Form>
            <Item>
              <Label>Título</Label>
              <Input />
            </Item>
            <Item>
              <Label>Descrição</Label>
              <Input />
            </Item>
            <Item>
              <Label>Categoria</Label>
              <Input />
            </Item>
            <Item>
              <Label>Imagens</Label>
              <Input />
            </Item>
            <Item>
              <Label>Anônimo</Label>
              <Input />
            </Item>
          </Form>
          <Button style={styles.button}>
            <Text style={styles.buttonText}>Salvar</Text>
          </Button>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
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