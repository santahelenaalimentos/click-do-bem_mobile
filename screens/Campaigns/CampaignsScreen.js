import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Image,
} from 'react-native'
import {
    Card,
    CardItem,
    Body,
    Spinner,
    Button,
} from 'native-base'
import { connect } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import MyHeader from '../../components/MyHeader';

class CampaignsScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            campaigns: [
                { titulo: 'Natal 2018', descricao: 'Venha compartilhar itens no natal de 2018...' },
                { titulo: 'Natal 2019', descricao: 'Venha compartilhar itens no natal de 2019...' },
                { titulo: 'Natal 2020', descricao: 'Venha compartilhar itens no natal de 2020...' },
                { titulo: 'Natal 2021', descricao: 'Venha compartilhar itens no natal de 2021...' },
            ],
            isLoading: false,
            refreshing: false,
        }
    }

    componentWillMount() {
        //this.fetchCampaigns()
    }

    fetchCampaigns = () =>
        fetch(`${global.BASE_API_V1}/campanhas`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `bearer ${this.props.token}`
            }
        })
            .then(res => res.json())
            .then((data) => {

            })
            .catch(err => {
                Session.logout(this.props);
                console.log('erro:', err);
            })

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.fetchCampaigns().then(() => {
            this.setState({
                refreshing: false,
            });
        });
    }

    retryFetchCampaigns = () => {
        this.setState({ isLoading: true })
        this.fetchC()
    }

    render() {
        const { campaigns, isLoading, refreshing } = this.state

        if (isLoading)
            return (
                <View style={{ flex: 1, backgroundColor: Colors.white }}>
                    <MyHeader title='Campanhas' />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Spinner color={Colors.purple} />
                    </View>
                </View>
            )

        if (!campaigns.length && !isLoading)
            return (
                <View style={{ flex: 1, backgroundColor: Colors.white }}>
                    <MyHeader title='Campanhas' />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: Colors.purple }}>Não existem campanhas cadastradas.</Text>
                        <Button transparent onPress={() => this.retryFetchCampaigns()} style={{ alignSelf: 'center' }}>
                            <MaterialCommunityIcons name='refresh' color={Colors.purple} size={32} />
                        </Button>
                    </View>
                </View>
            )

        return (
            <View style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 10 }}>
                <MyHeader title='Campanhas' />

                <View style={styles.listContainer}>
                    <FlatList
                        data={campaigns}
                        keyExtractor={(item) => item.titulo}
                        refreshControl={
                            <RefreshControl
                                onRefresh={this._onRefresh}
                                refreshing={refreshing}
                                colors={[Colors.purple, Colors.blue]}
                            />
                        }
                        renderItem={({ item }) =>
                            <View>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Text style={styles.cardTitle}>{item.titulo}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image source={require('../../assets/images/tb-placeholder-gray.png')} style={{ height: 200, width: null, flex: 1 }} />
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text style={styles.info}>{item.descricao}</Text>
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

export default connect(mapStateToProps, null)(CampaignsScreen)

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
    },
    tagContainer: {

    },
    tagText: {
        color: Colors.purple,
        fontSize: 14,
    }
})