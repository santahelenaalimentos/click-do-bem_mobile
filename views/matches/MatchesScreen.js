import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native'
import {
    Card,
    CardItem,
    Left,
    Right,
    Body,
    Spinner,
    Button,
} from 'native-base'
import { connect } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../../utils/Colors'
import Strings from '../../utils/Strings'
import MyHeader from '../_shared_components/MyHeader';

class MatchesScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            matches: [],
            isLoading: true,
            refreshing: false,
        }
    }

    componentWillMount() {
        this.fetchMatches()
    }

    fetchMatches = () =>
        fetch(`${global.BASE_API_V1}/item/match`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `bearer ${this.props.token}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                if (data.sucesso) {
                    this.setState({ matches: data.mensagem })
                }
                this.setState({ isLoading: false })
            })
            .catch(err => { 
                Session.logout(this.props); 
                console.log('erro:', err);
            })

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.fetchMatches().then(() => {
            this.setState({
                refreshing: false,
            });
        });
    }

    retryFetchMatches = () => {
        this.setState({isLoading: true})
        this.fetchMatches()
    }

    render() {
        const { matches, isLoading, refreshing } = this.state

        if (isLoading)
            return (
                <View style={{ flex: 1, backgroundColor: Colors.white }}>
                    <MyHeader title='Matches' />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Spinner color={Colors.purple} />
                    </View>
                </View>
            )

        if (!matches.length && !isLoading)
            return (
                <View style={{ flex: 1, backgroundColor: Colors.white }}>
                    <MyHeader title='Matches' />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: Colors.purple }}>Você ainda não efetuou nenhum match.</Text>
                        <Button transparent onPress={() => this.retryFetchMatches()} style={{alignSelf: 'center'}}>
                            <MaterialCommunityIcons name='refresh' color={Colors.purple} size={32}/>
                        </Button>
                    </View>
                </View>
            )

        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <MyHeader title='Matches' />

                <View style={styles.listContainer}>
                    <FlatList
                        data={matches}
                        keyExtractor={(item) => item.id}
                        refreshControl={
                            <RefreshControl
                                onRefresh={this._onRefresh}
                                refreshing={refreshing}
                                colors={[Colors.purple, Colors.blue]}
                            />
                        }
                        renderItem={({item}) =>
                            <View>
                                <Card>
                                    <CardItem header bordered>
                                        <Left>
                                            <Text style={styles.cardTitle}>{item.titulo}</Text>
                                        </Left>
                                        <Right>
                                            <View style={styles.tagContainer}>
                                                <Text style={styles.tagText}>{item.tipoMatch}</Text>
                                            </View>
                                        </Right>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Body>
                                            <Text style={styles.info}>Doador: {Strings.formatName(item.nomeDoador)}</Text>
                                            <Text style={styles.info}>Receptor: {Strings.formatName(item.nomeReceptor)}</Text>
                                            <Text style={styles.info}>Categoria: {item.categoria}</Text>
                                            {/* <Text style={styles.info}>Campanha: {item.campanha ? item.campanha.descricao : '(Não informado)'}</Text> */}
                                            <Text style={styles.info}>Valor Estimado: {item.valorFaixa}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </View>
                        }
                    />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps, null)(MatchesScreen)

const styles = StyleSheet.create({
    cardTitle: {
        color: Colors.purple,
        fontSize: 16,
        fontWeight: '500',
    },
    info: {
        color: Colors.grey,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    tagContainer:{

    },
    tagText:{
        color: Colors.purple,
        fontSize: 14,
    }
})