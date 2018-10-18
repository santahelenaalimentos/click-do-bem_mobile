import React, { PureComponent } from 'react'
import {
  Text,
  View,
  Image,
  FlatList,
} from 'react-native'
import {
  Container,
  Content,
  DeckSwiper,
  Card,
  CardItem,
} from 'native-base'
import MyHeader from '../../components/MyHeader';

export default class ItemDetails extends PureComponent {
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super (props);
  }

  render(){
    const { titulo, descricao, categoria, imagens} = this.props.navigation.getParam('item', {});
    console.log(titulo, descricao, categoria, imagens)
    console.log()
    return (
      <View style={{flex:1}}>
        <MyHeader
        title='Detalhes'
        goBack={() => this.props.navigation.goBack()}
        cancel={() => this.props.navigation.goBack()}/>
        <View>
          
          <View 
            style={{
              minWidth: '100%',
              flexDirection: 'column'}}>
            <View style={{height: 150}}>
              <FlatList
              style={{ 
                minWidth: '100%',

              }}
                renderItem={item =>
                  <Text>{item.titulo}</Text>
                }
              />
            </View>
          </View>

          <Text>{titulo}</Text>
          <Text>{descricao}</Text>
          <Text>{categoria.descricao}</Text>
        </View>
      </View>
    )
  }

}
