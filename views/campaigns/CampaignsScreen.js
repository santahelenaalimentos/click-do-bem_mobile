import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Image,
    Modal,
    TouchableWithoutFeedback,
    Platform,
    ScrollView,
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
import Colors from '../../utils/Colors'
import MyHeader from '../_shared_components/MyHeader';
import Session from '../../utils/Session'

const ios = Platform.OS === 'ios'

class CampaignsScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            campaigns: null,
            isLoading: true,
            refreshing: false,
            modalVisible: false,
            selectedCampaign: null,
        }
    }

    componentWillMount() {
        this.fetchCampaigns()
    }

    fetchCampaigns = () =>
        fetch(`${global.BASE_API_V1}/campanha`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `bearer ${this.props.token}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({ campaigns: data, isLoading: false })
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

    handleCloseModal = () => this.setState({ modalVisible: false })

    handleSelectCampaign = (item) => this.setState({ modalVisible: true, selectedCampaign: item })

    render() {
        const { selectedCampaign, campaigns, isLoading, refreshing } = this.state

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
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <MyHeader title='Campanhas' />

                <View style={styles.listContainer}>
                    <FlatList
                        data={campaigns}
                        keyExtractor={(item) => item.id}
                        refreshControl={
                            <RefreshControl
                                onRefresh={this._onRefresh}
                                refreshing={refreshing}
                                colors={[Colors.purple, Colors.blue]}
                            />
                        }
                        renderItem={({ item }) =>
                            <View>
                                <TouchableWithoutFeedback onPress={() => this.handleSelectCampaign(item)}>
                                    <Card>
                                        <CardItem cardBody>
                                            <Image source={item.imagem ? {uri: `${global.BASE_IMAGES}${item.imagem}`} : require('../../assets/images/tb-placeholder-gray.png')} style={{ height: 150, width: null, flex: 1, margin: 5, resizeMode: 'cover' }} />
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <Text style={styles.cardTitle}>{item.descricao}</Text>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </TouchableWithoutFeedback>
                            </View>
                        }
                    />
                </View>

                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.handleCloseModal()}
                >
                    <TouchableWithoutFeedback onPress={() => this.handleCloseModal()}>
                        <View style={styles.modalOuterRegion}></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.modalInnerContainer}>
                        <View style={{ flex: 1, alignItems: 'stretch', paddingHorizontal: 10 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: '3%' }}>

                                <Button transparent
                                    onPress={() => { this.handleCloseModal() }}
                                >
                                    <Text style={{ fontSize: 14, color: Colors.purple }}>Fechar</Text>
                                </Button>
                            </View>
                        </View>

                        <View style={{ flex: 9, alignItems: 'stretch', padding: 10 }}>
                            {
                                selectedCampaign
                                &&
                                <ScrollView>
                                    <Card>
                                        <CardItem>
                                            <Image source={require('../../assets/images/tb-placeholder-gray.png')} style={{ height: 250, width: null, flex: 1 }} />
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.cardTitle}>{selectedCampaign.titulo}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Text style={styles.info}>{selectedCampaign.descricao}</Text>
                                        </CardItem>
                                    </Card>
                                </ScrollView>
                            }
                        </View>
                    </View>
                </Modal>
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
        fontSize: 14,
        fontWeight: '500',
    },
    info: {
        color: Colors.grey,
        fontSize: 12,
        fontWeight: '400'
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    tagContainer: {

    },
    tagText: {
        color: Colors.purple,
        fontSize: 14,
    },
    modalOuterRegion: {
        width: '100%',
        flex: .2
    },
    modalInnerContainer: {
        width: '100%',
        flex: .8,
        backgroundColor: Colors.iosGrey,
        elevation: 7,
        marginTop: ios ? 0 : 7,
        borderRadius: 5,
        shadowColor: Colors.grey,
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: .5,
    },
})