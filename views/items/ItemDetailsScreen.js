import React, { PureComponent } from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    Platform,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from 'react-native'
import {
    Container,
    Content,
    Button,
    Card,
    CardItem,
    Left,
    Right,
    Body,
    Item,
    Picker,
    Icon,

} from 'native-base'
import { TextInputMask } from 'react-native-masked-text'
import MyHeader from '../_shared_components/MyHeader';
import Colors from '../../utils/Colors';
import { connect } from 'react-redux'
import Toast from '../../utils/Toast'

class ItemDetailsScreen extends PureComponent {
    static navigationOptions = {
        header: null,
        tabBarVisible: false
    }

    constructor(props) {
        super(props);

        this.state = {
            item: {},
            values: [],
            isVisible: false,
            itemUser: {},
            itemValue: null
        }
    }

    componentWillMount() {
        const item = this.props.navigation.getParam('item', {})
        this.setState({ item })
        this.fetchItemUserData(item.usuario.id)
        this.fetchValues()
    }

    fetchItemUserData = (id) => {
        fetch(`${global.BASE_API_V1}/colaborador/${id}`,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `bearer ${this.props.token}`
                }
            })
            .then(res => res.json())
            .then((data) => {
                this.setState({ itemUser: data })
            })
            .catch(err => {
                Session.logout(this.props);
                console.log('erro:', err);
            })
    }

    handleCloseModal = () => {
        this.setState({ isVisible: false })
    }

    handleOpenModal = () => {
        this.setState({ isVisible: true })
    }

    fetchValues = () =>
        fetch(`${global.BASE_API_V1}/item/valor-faixa`, {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${this.props.token}`,
            },
        })
            .then(res => res.json())
            .then(val => {
                console.log(val)
                return val
            })
            .then(values => this.setState({ values }))
            .catch(err => {
                Session.logout(this.props);
            })

    handleMatch = () => {
        let { itemValue, item: { id, tipoItem } } = this.state

        if (!itemValue && tipoItem != 'Necessidade')
            return Toast.toastTop('O valor deve ser informado para efetuar a solicitação.')

        fetch(`${global.BASE_API_V1}/item/match/${id}${tipoItem != 'Necessidade' ? `?valorFaixaId=${itemValue}` : ''}`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `bearer ${this.props.token}`
                }
            })
            .then(res => res.json())
            .then((data) => {
                if (data.sucesso) {
                    this.handleCloseModal()
                    this.props.navigation.goBack()
                    Toast.toastTop('Combinação realizada. Entre em contato com sua contraparte.')
                }
                else Toast.toastTop(data.mensagem)
            })
            .catch(err => {
                Session.logout(this.props);
                console.log('erro:', err);
            })
    }

    render() {
        const { height, width } = Dimensions.get('window');
        const { values, itemValue, item: { titulo, descricao, categoria, imagens, tipoItem, usuario, anonimo } } = this.state
        const isNeed = tipoItem === 'Necessidade'
        const isAnonymous = anonimo
        const viewerCPF = this.props.navigation.getParam('viewerCPF', {})
        const { nome, usuarioDados: { telefoneCelular = '', telefoneFixo = '', email = '' } = {} } = this.state.itemUser

        return (
            <Container>
                <MyHeader
                    title='Detalhes'
                    goBack={() => this.props.navigation.goBack()} />

                <View style={{ flex: 1 }}>

                    <View style={{ height: height / 2, marginTop: (Platform.OS === 'ios' ? .5 : -10) }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled>
                            {
                                imagens.length
                                    ?
                                    imagens.map(img =>
                                        <View style={{ height: height / 2, width: width, flex: 1 }} key={img.id}>
                                            <Image
                                                source={{ uri: `${global.BASE_IMAGES}${img.arquivo}` }}
                                                style={{ flex: 1, width: width }} />
                                        </View>)
                                    :
                                    <View style={{ height: height / 2, width: width, flex: 1 }}>
                                        <Image
                                            source={require('../../assets/images/tb-placeholder-gray.png')}
                                            style={{ flex: 1, width: width }} />
                                    </View>
                            }
                        </ScrollView>
                    </View>

                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <View style={{ margin: 10, alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 24, fontWeight: '700', color: Colors.purple }}>{titulo}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: Colors.evenLighterPurple, marginBottom: 10, paddingVertical: 3 }}>{categoria.descricao}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '300', color: Colors.grey }}>{descricao}</Text>
                            </View>

                            <View style={{ marginVertical: 30 }}>
                                {
                                    viewerCPF === usuario.cpfCnpj
                                        ?
                                        <Button transparent
                                            style={{ alignSelf: 'center', backgroundColor: Colors.evenLighterPurple, justifyContent: 'center', minWidth: '60%', maxHeight: 35 }}
                                            onPress={() => this.props.navigation.navigate(isNeed ? 'EditNeed' : 'EditDonation', { item: this.state.item })}>
                                            <Text style={{ color: Colors.white }}>{isNeed ? 'Editar Necessidade' : 'Editar Doação'}</Text>
                                        </Button>
                                        :
                                        <Button
                                            style={{ alignSelf: 'center', backgroundColor: Colors.purple, justifyContent: 'center', minWidth: '60%', height: 45 }}
                                            onPress={() => this.handleOpenModal()}>
                                            <Text style={{ color: 'white' }}>{isNeed ? 'Oferecer Item' : 'Solicitar Item'}</Text>
                                        </Button>
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>

                <Modal transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={this.closeModal}
                    animationType={'slide'}
                    hardwareAccelerated={true}
                    onRequestClose={() => this.setState({ isVisible: false })}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback onPress={() => this.handleCloseModal()}>
                            <View style={[styles.modalOuterRegion, { flex: isNeed ? .5 : .4 }]}></View>
                        </TouchableWithoutFeedback>
                        <View style={[styles.modalInnerContainer, { flex: isNeed ? .5 : .6 }]}>
                            <View style={StyleSheet.modalHeader}>
                                <Button transparent
                                    style={styles.modalSecondaryButton}
                                    onPress={() => this.handleCloseModal()}>
                                    <Text style={styles.modalSecondaryButtonText}>FECHAR</Text>
                                </Button>
                            </View>
                            <Content contentContainerStyle={styles.modalContent}>

                                <View style={styles.cardsContainer}>
                                    <Card>
                                        <CardItem header bordered>
                                            <Text style={styles.cardTitle}>Dados do {isNeed ? 'Beneficiado' : 'Doador'}</Text>
                                        </CardItem>
                                        <CardItem bordered>
                                            <Body>
                                                <Text style={styles.info}>Nome: {isAnonymous ? '(Oculto)' : nome}</Text>
                                                <Text style={styles.info}>Telefone: {isAnonymous ? '(Oculto)' : (telefoneFixo || '(não cadastrado)')}</Text>
                                                <Text style={styles.info}>Celular: {isAnonymous ? '(Oculto)' : telefoneCelular}</Text>
                                                <Text style={styles.info}>E-mail: {isAnonymous ? '(Oculto)' : email}</Text>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </View>

                                {
                                    !isNeed
                                    &&
                                    <Item style={styles.item}>
                                        <Left>
                                            <Text style={styles.label}>Valor</Text>
                                        </Left>
                                        <Right>
                                            <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff"
                                                style={styles.picker}
                                                selectedValue={itemValue}
                                                onValueChange={(itemValue) => this.setState({ itemValue })}>
                                                <Picker.Item key='0' label='Selecione' value={null} />
                                                {values.map(item => <Picker.Item key={item.id} label={item.descricao} value={item.id} />)}
                                            </Picker>
                                        </Right>
                                    </Item>
                                }

                                <View style={styles.buttonContainer}>
                                    <Button style={styles.modalPrimaryButton}
                                        onPress={() => this.handleMatch()}>
                                        <Text style={{ color: Colors.white }}>Confirmar Solicitação</Text>
                                    </Button>
                                </View>
                            </Content>
                        </View>
                    </View>
                </Modal>

            </Container>
        )
    }

}

function mapStateToProps(state) {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps, null)(ItemDetailsScreen)

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalOuterRegion: {
        width: '100%',
    },
    modalInnerContainer: {
        width: '100%',
        backgroundColor: Colors.iosGrey,
        elevation: 7,
        borderRadius: 5,
        shadowColor: Colors.grey,
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: .5,

    },
    modalHeaderContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    modalSecondaryButton: {
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginHorizontal: 10
    },
    modalSecondaryButtonText: {
        color: Colors.evenLighterPurple,
    },
    modalContent: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexGrow: 1,
    },
    cardsContainer: {
        minWidth: '90%',
    },
    item: {
        minWidth: '90%',
    },
    inputContainer: {
        minWidth: '85%',
        marginVertical: 10,
    },
    buttonContainer: {
        marginBottom: 25,
    },
    cardTitle: {
        color: Colors.purple,
        fontSize: 16,
        fontWeight: '500',
    },
    info: {
        color: Colors.grey,
        marginVertical: 1,
    },
    modalPrimaryButton: {
        height: 45,
        backgroundColor: Colors.purple,
        alignSelf: 'center',
        minWidth: '85%',
        justifyContent: 'center',
    },
    input: {
        height: 45,
        borderBottomColor: Colors.grey,
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    },
    label: {
        fontSize: 14,
        color: Colors.grey,
        marginBottom: -5,
    },
    picker: {
        width: Platform.OS === 'android' ? '150%' : undefined
    },
})
