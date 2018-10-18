import React, { Component } from 'react'
import {
  FlatList,
  View,
  RefreshControl,
} from 'react-native'
import {
  Container,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Button,
  Text,
  Spinner,
} from 'native-base'
import MyHeader from '../../components/MyHeader'
import Colors from '../../constants/Colors';

export default class NeedsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      needs: [],
      loading: true,
      refreshing: false,
    }

  }

  componentWillMount() {
    this.fetchNeeds();
  }

  fetchNeeds = () => 
    fetch('http://dev-clickdobemapi.santahelena.com/api/v1/item', {
      method: 'GET',
      headers: {
        "Authorization": `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9oYXNoIjoiZmJlZWIyMmQtZTE0MS00NTQxLTk0M2YtYjVjYTAzMTM2OGMxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6IjI1MTk1NTA1ODk2IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IkpPQU8gREEgU0lMVkEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDb2xhYm9yYWRvciIsIm5iZiI6MTUzODk2NTk5NiwiZXhwIjoxNzk4MTY1OTk2LCJpc3MiOiJQTUtBLkF1ZGl0b3JpYUltb2JpbGlhcmlhLlRva2VuU2VydmVyIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1NDgyMiJ9.UP-NrKNWT6qDR0sHS04GTl84aID5WR-Gtk3XR2eDiqE`,
      },
    })
      .then(res => res.json())
      .then(items => { console.log(items[0].titulo, items[0].tipoItem, items[0].categoria.descricao); return items; })
      .then(items =>
        this.setState({
          needs: items.filter(item => item.tipoItem == 'Necessidade'),
          loading: false
        }))
      .catch(err => console.log(err))
  

  _onRefresh = () => {
    console.log('ATUALIZANDO')
    this.setState({refreshing: true});
    this.fetchNeeds().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    const { needs, loading, refreshing } = this.state

    if (loading) {
      return (
        <Container>
          <MyHeader
            title='Necessidades' />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Spinner color={Colors.purple} />
          </View>
        </Container>
      )
    }

    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <MyHeader
          title='Necessidades' />
        <View>
          <FlatList
            data={needs}
            renderItem={({ item }) =>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={item.imagens.length ? { uri: `http://dev-clickdobemapi.santahelena.com/${item.imagens[0].arquivo}` } : require('../../assets/images/tb-placeholder-gray.png')} />
                </Left>
                <Body>
                  <Text numberOfLines={1}>{item.titulo || 'Sem título'}</Text>
                  <Text note numberOfLines={1}>{item.descricao || 'Sem descrição'}</Text>
                </Body>
                <Right>
                  <Button transparent
                    onPress={() => this.props.navigation.navigate('ItemDetails')}>
                    <Text style={{color: Colors.blue}}>Detalhes</Text>
                  </Button>
                </Right>
              </ListItem>
            }
            keyExtractor={(doacao) => doacao.id} 
            refreshControl = {
              <RefreshControl 
                onRefresh = {this._onRefresh} 
                refreshing = { refreshing }
                colors = {[ Colors.purple, Colors.blue ]}
              />
            }
            />
        </View>
      </View>
    )
  }
}