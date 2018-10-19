import React, { Component } from 'react'
import {
  FlatList,
  View,
  RefreshControl,
  StyleSheet,
  Modal,
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
import { connect } from 'react-redux'
import MyHeader from '../../components/MyHeader'
import FiltersBar from '../../components/FiltersBar'
import Colors from '../../constants/Colors';


class DonationsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      donations: [],
      loading: true,
      refreshing: false,
      modalVisible: false,
    }

  }

  componentWillMount() {
    this.fetchDonations();
  }

  fetchDonations = () =>
    fetch('http://dev-clickdobemapi.santahelena.com/api/v1/item', {
      method: 'GET',
      headers: {
        "Authorization": `bearer ${this.props.token}`,
      },
    })
      .then(res => res.json())
      .then(items => { console.log(items[0].titulo, items[0].tipoItem, items[0].categoria.descricao); return items; })
      .then(items =>
        this.setState({
          donations: items.filter(item => item.tipoItem == 'Doação'),
          loading: false
        }))
      .catch(err => console.log(err))


  _onRefresh = () => {
    console.log('ATUALIZANDO')
    this.setState({ refreshing: true });
    this.fetchDonations().then(() => {
      this.setState({ refreshing: false });
    });
  }

  openModal = () => this.setState({modalVisible: true})

  render() {
    const { donations, loading, refreshing } = this.state

    if (loading) {
      return (
        <Container>
          <MyHeader
            title='Doações' />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Spinner color={Colors.purple} />
          </View>
        </Container>
      )
    }

    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        
        <MyHeader title='Doações' />
        <FiltersBar open={this.openModal} />

        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text style={{ fontSize: 50, color: Colors.purple }}>Filtros,</Text>
              <Text style={{ fontSize: 50, color: Colors.purple }}>MUITOS</Text>
              <Text style={{ fontSize: 50, color: Colors.purple }}>Filtros</Text>
              <Button
                transparent
                style={{ alignSelf: 'center', justifyContent: 'center'}}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Text>Fechar</Text>
              </Button>
            </View>
          </View>
        </Modal>

        <View>
          <FlatList
            data={donations}
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
                    onPress={() => this.props.navigation.navigate('ItemDetails', { item })}>
                    <Text style={{ color: Colors.blue }}>Detalhes</Text>
                  </Button>
                </Right>
              </ListItem>
            }
            keyExtractor={(doacao) => doacao.id}
            refreshControl={
              <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={refreshing}
                colors={[Colors.purple, Colors.blue]}
              />
            }
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(mapStateToProps, null)(DonationsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    alignItems: 'center',
  },
});