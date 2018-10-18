import React, { PureComponent } from 'react'
import { 
  Text,
  View,
  Image,
} from 'react-native'
import { 
  Container,
  Content,
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
    return (
      <Container>
        <MyHeader
        title='Detalhes'/>
        <Content>
          <Image 
            source={imagens.length 
              ? { uri: `http://dev-clickdobemapi.santahelena.com/${imagens[0].arquivo}` } 
              : require('../../assets/images/tb-placeholder-gray.png')} 
            style={{ width: 320, height: 240 }}
          />
          <Text>{titulo}</Text>
          <Text>{descricao}</Text>
          <Text>{categoria.descricao}</Text>
        </Content>
      </Container>
    )
  }

}
