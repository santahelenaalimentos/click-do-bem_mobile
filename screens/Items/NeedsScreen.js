import React, { Component } from 'react'
import {
  FlatList,
} from 'react-native'
import {
  Container,
  Content,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Button,
  Text,
} from 'native-base'
import MyHeader from '../../components/MyHeader'

export default class NeedsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);

    this.state = {
      needs: [],
    }

  }

  componentWillMount() {
    fetch('http://dev-clickdobemapi.santahelena.com/api/v1/item', {
      method: 'GET',
      headers: {
        "Authorization": `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9oYXNoIjoiZmJlZWIyMmQtZTE0MS00NTQxLTk0M2YtYjVjYTAzMTM2OGMxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6IjI1MTk1NTA1ODk2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IkpPQU8gREEgU0lMVkEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDb2xhYm9yYWRvciIsIm5iZiI6MTUzODk2NTk5NiwiZXhwIjoxNzk4MTY1OTk2LCJpc3MiOiJQTUtBLkF1ZGl0b3JpYUltb2JpbGlhcmlhLlRva2VuU2VydmVyIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1NDgyMiJ9.UP-NrKNWT6qDR0sHS04GTl84aID5WR-Gtk3XR2eDiqE`,
      },
    })
      .then(res => res.json())
      .then(items => {console.log(items[0].titulo, items[0].tipoItem, items[0].categoria.descricao); return items; })
      .then(items => this.setState({ needs: items.filter(item => item.tipoItem == 'Necessidade') }))
      .catch(err => console.log(err))
  }

  render() {
    const { needs } = this.state

    return (
      <Container>
        <MyHeader
          title='Necessidades' />
        <Content>
          <FlatList
            data = {needs}
            renderItem = {({ item }) =>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={item.imagens.length ? item.imagens[0].uri : require('../../assets/images/tb-placeholder-gray.png')} />
                </Left>
                <Body>
                  <Text numberOfLines={1}>{item.titulo || 'Sem título'}</Text>
                  <Text note numberOfLines={1}>{item.descricao || 'Sem descrição'}</Text>
                </Body>
                <Right>
                  <Button transparent style={{elevation: 0}}>
                    <Text>Detalhes</Text>
                  </Button>
                </Right>
              </ListItem>
            }
            keyExtractor={(doacao) => doacao.id} />
        </Content>
      </Container>
    )
  }
}