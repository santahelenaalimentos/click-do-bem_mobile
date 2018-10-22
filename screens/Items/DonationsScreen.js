import React, { Component } from 'react'
import {
    FlatList,
    View,
    RefreshControl,
    StyleSheet,
    Modal,
    SafeAreaView,
    Platform,
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
    Picker,
    Icon,
    Segment,
} from 'native-base'
import { connect } from 'react-redux'
import MyHeader from '../../components/MyHeader'
import FiltersBar from '../../components/FiltersBar'
import Colors from '../../constants/Colors';

const ios = Platform.OS === 'ios'

class DonationsScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            filteredDonations: [],
            donations: [],
            loading: true,
            refreshing: false,
            modalVisible: false,
            filters:{
                categoria: null,
                meusItens: false,
            },
            categorias: []
        }

    }

    componentWillMount() {
        this.fetchCategorias();
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
                {
                    const donations = items.filter(item => item.tipoItem == 'Doação')
                    this.setState({
                        donations,
                        filteredDonations: donations,
                        loading: false
                    })
                }
                )
            .catch(err => console.log(err))

    fetchCategorias = () =>
        fetch('http://dev-clickdobemapi.santahelena.com/api/v1/categoria', {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${this.props.token}`,
            },
        })
            .then(res => res.json())
            .then(categorias => this.setState({ categorias }))
            .catch(err => console.log(err))


    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.fetchDonations().then(() => {
            this.setState({ 
                refreshing: false,
            });
            this.removeFilters()
        });
    }

    openModal = () => this.setState({ modalVisible: true })

    filterItems = () => {
        const { donations, filters } = this.state;
        const { categoria, meusItens } = filters;
        const cpf = this.props.user.cpfCnpj
        filteredDonations = donations
        filteredDonations = categoria ? filteredDonations.filter(item => item.categoria.descricao === categoria) : filteredDonations
        filteredDonations = meusItens ? filteredDonations.filter(item => item.usuario.cpfCnpj === cpf) : filteredDonations
        this.setState({ filteredDonations })
    }

    removeFilters = () => 
        this.setState({ filters: {
            categoria: null, 
            meusItens: false
        } })

    render() {
        const { filteredDonations, donations, loading, refreshing, filters, categorias } = this.state

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
                <FiltersBar open={this.openModal} filtered={donations.length != filteredDonations.length}/>

                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <SafeAreaView style={styles.modalContainer}>
                        <View style={{ flex: 1, alignItems: 'stretch' }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '3%' }}>
                                <Button transparent
                                    onPress={() => this.removeFilters()}
                                >
                                    <Text style={{ fontSize: 14, color: Colors.purple }}>Limpar</Text>
                                </Button>

                                <Button transparent
                                    onPress={() => this.setState({ modalVisible: false, })}
                                >
                                    <Text style={{ fontSize: 14, color: Colors.purple }}>Fechar</Text>
                                </Button>
                            </View>

                            <View style={{ flexDirection: 'row',
                                            justifyContent: 'space-between', alignItems: 'center',
                                            height: 70, paddingHorizontal: '5%', marginVertical: '1%' }}>
                                <Text>Categoria</Text>
                                <Picker
                                    style={{maxWidth: '85%'}}
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={filters.categoria}
                                    onValueChange={(categoria) => this.setState({ filters: {...filters, categoria} })}>
                                    <Picker.Item key='0' style={{alignItems: 'flex-end'}} label='Selecione' value={null} />
                                    {categorias.map(categoria => <Picker.Item key={categoria.id} label={categoria.descricao} value={categoria.descricao} />)}
                                </Picker>
                            </View>

                            <View style={{ marginVertical: '1%'}}>
                                <Segment style={{backgroundColor: 'white'}}>
                                    <Button first
                                        active={filters.meusItens}
                                        onPress={() => this.setState({filters: {...filters, meusItens: true} })}
                                        style={{
                                            backgroundColor: filters.meusItens ? Colors.purple : Colors.white,
                                            borderColor: Colors.purple
                                        }}
                                    >
                                        <Text style={{color: filters.meusItens ? Colors.white : Colors.purple}}>
                                            Minhas Doações
                                        </Text>
                                    </Button>
                                    <Button last 
                                        active={!filters.meusItens}
                                        onPress={() => this.setState({filters: {...filters, meusItens: false} })}
                                        style={{
                                            backgroundColor: !filters.meusItens ? Colors.purple : Colors.white,
                                            borderColor: Colors.purple
                                        }}
                                    >
                                        <Text style={{color: !filters.meusItens ? Colors.white : Colors.purple}}>
                                            Todas
                                        </Text>
                                    </Button>
                                </Segment>
                            </View>

                            <View style={{marginVertical: 30}}>
                                <Button
                                    style={{ backgroundColor: Colors.purple, alignSelf: 'center' }}
                                    onPress={() => {this.filterItems(); this.setState({modalVisible: false})} }
                                >
                                    <Text style={{ fontSize: 14, color: Colors.white }}>Visualizar</Text>
                                </Button>
                            </View>

                        </View>
                    </SafeAreaView>
                </Modal>

                <View style={ios && {flex: 1}}>
                    <FlatList
                        data={ filteredDonations }
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
                                        onPress={() => this.props.navigation.navigate('ItemDetails', { item, viewerCPF: this.props.user.cpfCnpj })}>
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
                    {/* { ios && <View style={{height: 100}}></View> } */}
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return { 
        token: state.token,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(DonationsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
    }
});