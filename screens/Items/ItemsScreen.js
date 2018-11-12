import React, { Component } from 'react'
import {
    FlatList,
    View,
    RefreshControl,
    StyleSheet,
    Modal,
    Platform,
    Animated,
    TouchableWithoutFeedback
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
    Item,
    Switch
} from 'native-base'
import { connect } from 'react-redux'
import MyHeader from '../../components/MyHeader'
import Colors from '../../constants/Colors';
import Session from '../../utils/Session'

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
            filters: {
                categoria: null,
                meusItens: false,
            },
        }
    }

    componentWillMount() {
        this.isDonation = this.props.donation

        this.fetchCategorias();
        this.fetchItems();

        this.scrollY = new Animated.Value(0)
        this.animatedHeaderHeight = this.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [40, 0],
            extrapolate: 'clamp'
        })

        this.animatedOpacity = this.scrollY.interpolate({
            inputRange: [0, 25],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
    }

    fetchItems = () =>
        fetch(`${global.BASE_API_V1}/item`, {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${this.props.token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                const items = data.filter(item => item.tipoItem == (this.isDonation ? 'Doação' : 'Necessidade'))
                this.setState({
                    items,
                    filteredItems: items,
                    loading: false
                })
            }
            )
            .catch(err => { 
                Session.logout(this.props); 
                console.log('erro:', err);
            })

    fetchCategorias = () =>
        fetch(`${global.BASE_API_V1}/categoria`, {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${this.props.token}`,
            },
        })
            .then(res => res.json())
            .then(categorias => this.setState({ categorias }))
            .catch(err => { 
                Session.logout(this.props); 
                console.log('erro:', err);
            })


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

    handleCloseModal = () => this.setState({ modalVisible: false })

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
        this.setState({
            filters: {
                categoria: null,
                meusItens: false
            }
        })

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

                <MyHeader title={this.isDonation ? 'Doações' : 'Necessidades'} />

                <Animated.View style={{ height: this.animatedHeaderHeight, opacity: this.animatedOpacity, paddingHorizontal: '4%', justifyContent: 'center' }}>
                    {
                        filtered
                            ?
                            <Button
                                style={{ backgroundColor: Colors.purple, height: 25, alignSelf: 'flex-start' }}
                                onPress={() => this.openModal()}>
                                <Text style={{ color: Colors.white, fontSize: 12, fontWeight: '600', paddingHorizontal: 5 }}>Filtros</Text>
                            </Button>
                            :
                            <Button
                                transparent
                                style={{ backgroundColor: Colors.evenLighterPurple, height: 25, alignSelf: 'flex-start' }}
                                onPress={() => this.openModal()}>
                                <Text style={{ color: Colors.white, fontSize: 12, fontWeight: '400', paddingHorizontal: 5 }}>Filtros</Text>
                            </Button>

                    }
                </Animated.View>



                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <TouchableWithoutFeedback onPress={() => { this.filterItems(); this.handleCloseModal(); }}>
                        <View style={styles.modalOuterRegion}></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.modalInnerContainer}>
                        <View style={{ flex: 1, alignItems: 'stretch' }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '3%' }}>
                                <Button transparent
                                    onPress={() => this.removeFilters()}
                                >
                                    <Text style={{ fontSize: 14, color: Colors.purple }}>Limpar</Text>
                                </Button>

                                <Button transparent
                                    onPress={() => { this.filterItems(); this.handleCloseModal() }}
                                >
                                    <Text style={{ fontSize: 14, color: Colors.purple }}>Fechar</Text>
                                </Button>
                            </View>
                        </View>
                        
                        <View style={{ flex: 9, alignItems: 'stretch', padding: 10 }}>
                            <View style={{
                                flexDirection: 'row', borderBottomWidth: .5, borderColor: Colors.evenLighterGrey,
                                justifyContent: 'space-between', alignItems: 'center', borderTopWidth: .5,
                                height: 70, paddingHorizontal: '5%', marginVertical: '1%'
                            }}>
                                <Text>Categoria</Text>
                                <Picker
                                    style={{ maxWidth: '70%', alignSelf: ios ? 'flex-end' : 'center', justifyContent:'center' }}
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={filters.categoria}
                                    onValueChange={(categoria) => this.setState({ filters: { ...filters, categoria } })}>
                                    <Picker.Item key='0' style={{ alignItems: 'flex-end' }} label='Selecione' value={null} />
                                    {categorias.map(categoria => <Picker.Item key={categoria.id} label={categoria.descricao} value={categoria.descricao} />)}
                                </Picker>
                            </View>

                            <View style={{ 
                                flexDirection: 'row', borderBottomWidth: .5, borderColor: Colors.evenLighterGrey,
                                justifyContent: 'space-between', alignItems: 'center',
                                height: 70, paddingHorizontal: '5%', marginVertical: '1%'
                            }}>
                                <Text>Somente meus itens</Text>
                                <Switch
                                    value={filters.meusItens}
                                    onValueChange={value => this.setState({ filters:{...filters, meusItens: value} })} />
                            </View>

                            {/* <View style={{ marginVertical: 30 }}>
                                <Button
                                    style={{ backgroundColor: Colors.purple, alignSelf: 'center' }}
                                    onPress={() => { this.filterItems(); this.setState({ modalVisible: false }) }}
                                >
                                    <Text style={{ fontSize: 14, color: Colors.white }}>Aplicar</Text>
                                </Button>
                            </View> */}

                        </View>
                    </View>
                </Modal>

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={filteredItems}
                        onScroll={
                            Animated.event([
                                { nativeEvent: { contentOffset: { y: this.scrollY } } }
                            ])
                        }
                        renderItem={({ item }) =>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail square source={item.imagens.length ? { uri: `${global.BASE_IMAGES}${item.imagens[0].arquivo}` } : require('../../assets/images/tb-placeholder-gray.png')} />
                                </Left>
                                <Body>
                                    <Text style={styles.titulo} numberOfLines={1}>{item.titulo || 'Sem título'}</Text>
                                    <Text note numberOfLines={1}>{item.descricao || 'Sem descrição'}</Text>
                                </Body>
                                <Right>
                                    <Button transparent
                                        onPress={() => this.props.navigation.navigate('ItemDetails', { item, viewerCPF: this.props.user.cpfCnpj })}>
                                        <Text style={{ color: Colors.evenLighterPurple }}>Detalhes</Text>
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
    modalOuterRegion: {
        width: '100%',
        flex: .5
    },
    modalInnerContainer: {
        width: '100%',
        flex: .5,
        backgroundColor: Colors.iosGrey,
        elevation: 7,
        marginTop: ios ? 0 : 7,
        borderRadius: 5,
        shadowColor: Colors.grey,
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: .5,
    },
    titulo: {
        color: Colors.grey,
    }
});