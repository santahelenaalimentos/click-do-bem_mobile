import React, { Component } from 'react'
import {
    FlatList,
    View,
    RefreshControl,
    StyleSheet,
    Modal,
    SafeAreaView,
    Platform,
    Animated,
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
import Colors from '../../constants/Colors';

const ios = Platform.OS === 'ios'

class ItemsScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            filteredItems: [],
            categorias: [],
            loading: true,
            refreshing: false,
            modalVisible: false,
            filters:{
                categoria: null,
                meusItens: false,
            },
        }

    }

    componentWillMount() {
        this.isDonation = this.props.donation
        
        this.scrollY = new Animated.Value(0)
        this.fetchCategorias();
        this.fetchItems();

        this.scrollY = new Animated.Value(0)
        this.animatedHeaderHeight = this.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [40 , 0],
            extrapolate: 'clamp'
        })

        this.animatedOpacity = this.scrollY.interpolate({
            inputRange: [0, 25],
            outputRange: [1 , 0],
            extrapolate: 'clamp'
        })
    }

    fetchItems = () =>
        fetch('http://dev-clickdobemapi.santahelena.com/api/v1/item', {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${this.props.token}`,
            },
        })
            .then(res => res.json())
            .then(data =>
                {
                    const items = data.filter(item => item.tipoItem == (this.isDonation ? 'Doação' : 'Necessidade') )
                    this.setState({
                        items,
                        filteredItems: items,
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
        this.fetchItems().then(() => {
            this.setState({ 
                refreshing: false,
            });
            this.removeFilters()
        });
    }

    openModal = () => this.setState({ modalVisible: true })

    filterItems = () => {
        const { items, filters } = this.state;
        const { categoria, meusItens } = filters;
        const cpf = this.props.user.cpfCnpj
        filteredItems = items
        filteredItems = categoria ? filteredItems.filter(item => item.categoria.descricao === categoria) : filteredItems
        filteredItems = meusItens ? filteredItems.filter(item => item.usuario.cpfCnpj === cpf) : filteredItems
        this.setState({ filteredItems })
    }

    removeFilters = () => 
        this.setState({ filters: {
            categoria: null, 
            meusItens: false
        } })

    render() {
        const { filteredItems, items, loading, refreshing, filters, categorias } = this.state
        const filtered = items.length != filteredItems.length

        if (loading) {
            return (
                <Container>
                    <MyHeader title={this.isDonation ? 'Doações' : 'Necessidades'} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Spinner color={Colors.purple} />
                    </View>
                </Container>
            )
        }

        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>

                <MyHeader title={this.isDonation ? 'Doações' : 'Necessidade'} />

                <Animated.View style={{ height: this.animatedHeaderHeight, opacity: this.animatedOpacity, paddingHorizontal: '4%', justifyContent: 'center' }}>
                    {
                    filtered
                    ?
                    <Button
                        style={{ backgroundColor: Colors.purple, height: 25, alignSelf: 'flex-start' }}
                        onPress={() => this.openModal()}>
                        <Text style={{ color: Colors.white, fontSize: 12, fontWeight: '400', paddingHorizontal: 5 }}>Filtros ··· </Text>
                    </Button>
                    :
                    <Button
                        transparent
                        style={{ borderWidth: .5, borderColor: Colors.purple, height: 25, alignSelf: 'flex-start' }}
                        onPress={() => this.openModal()}>
                        <Text style={{ color: Colors.purple, fontSize: 12, fontWeight: '400', paddingHorizontal: 5 }}>Filtros</Text>
                    </Button>

                    }
                </Animated.View>



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

                                {/* <Button transparent
                                    onPress={() => this.setState({ modalVisible: false, })}
                                >
                                    <Text style={{ fontSize: 14, color: Colors.purple }}>Fechar</Text>
                                </Button> */}
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
                                            {this.isDonation ? 'Minhas Doações' : 'Minhas Necessidades'}
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

                <View style={{flex: 1}}>
                    <FlatList
                        data={ filteredItems }
                        onScroll={
                            Animated.event([
                                {nativeEvent: {contentOffset: {y: this.scrollY}}}
                            ])
                        }
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
                        keyExtractor={(item) => item.id}
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

export default connect(mapStateToProps, null)(ItemsScreen)

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