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
} from 'native-base'
import { TextInputMask } from 'react-native-masked-text'
import MyHeader from '../../components/MyHeader';
import Colors from '../../constants/Colors';
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
            isVisible: false,
            itemUser: {},
            itemValue: '0000'
        }
    }

    componentWillMount() {
        const item = this.props.navigation.getParam('item', {})
        this.setState({ item })
        this.fetchItemUserData(item.usuario.id)
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
                console.log(data.usuarioDados)
                this.setState({ itemUser: data })
            })
            .catch((err) => console.log(err))
    }

    handleCloseModal = () => {
        this.setState({ isVisible: false })
    }

    handleOpenModal = () => {
        this.setState({ isVisible: true })
    }

    handleMatch = () => {
        let { itemValue, item: { id, tipoItem } } = this.state
        itemValue = Number(itemValue.replace('R$', '').replace(/\./g, '').replace(',', '.'))

        if ((!id || !itemValue || itemValue <= 0) && tipoItem != 'Necessidade')
            return Toast.toastTop('O valor deve ser informado para efetuar a solicitação.')

        //TODO remover console.log
        console.log(`${global.BASE_API_V1}/item/match/${id}${tipoItem != 'Necessidade' ? `?valor=${itemValue}` : ''}`)
        console.log(this.props.token)

        fetch(`${global.BASE_API_V1}/item/match/${id}${tipoItem != 'Necessidade' ? `?valor=${itemValue}` : ''}`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `bearer ${this.props.token}`
                }
            })
            .then(res => { console.log(res); return res.json(); } )
            .then((data) => {
                console.log(data)
                if (data.sucesso) {
                    this.handleCloseModal()
                    this.props.navigation.goBack()
                    Toast.toastTop('Combinação realizada. Entre em contato com sua contraparte.')
                }
                else Toast.toastTop(data.mensagem)
            })
            .catch((err) => console.log(err))
    }

    render() {
        const { height, width } = Dimensions.get('window');
        const { titulo, descricao, categoria, imagens, tipoItem, usuario, anonimo } = this.state.item
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
                                            source={require('../../assets/images/tb-placeholder.png')}
                                            style={{ flex: 1, width: width }} />
                                    </View>
                            }
                        </ScrollView>
                    </View>

                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <View style={{ margin: 10, alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 24, fontWeight: '700', color: Colors.purple }}>{titulo}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: Colors.grey, marginBottom: 10, paddingVertical: 3 }}>{categoria.descricao}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '300', color: Colors.grey }}>{descricao}</Text>
                            </View>

                            <View style={{ marginVertical: 30 }}>
                                {
                                    viewerCPF === usuario.cpfCnpj
                                        ?
                                        <Button transparent
                                            style={{ alignSelf: 'center', borderColor: Colors.purple, borderWidth: 1, justifyContent: 'center', minWidth: '60%', maxHeight: 35 }}
                                            onPress={() => this.props.navigation.navigate(isNeed ? 'EditNeed' : 'EditDonation', { item: this.state.item })}>
                                            <Text style={{ color: Colors.purple }}>{isNeed ? 'Editar Necessidade' : 'Editar Doação'}</Text>
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
                            <View style={[styles.modalOuterRegion, { flex: isNeed ? .55 : .4 }]}></View>
                        </TouchableWithoutFeedback>
                        <View style={[styles.modalInnerContainer, { flex: isNeed ? .45 : .6 }]}>
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
                                            <Left>
                                                <Text style={styles.cardTitle}>Dados do {isNeed ? 'Beneficiado' : 'Doador'}</Text>
                                            </Left>
                                            <Right>

                                            </Right>
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
                                    <KeyboardAvoidingView style={styles.inputContainer}>
                                        <Text style={styles.label}>Valor financeiro do item</Text>
                                        <TextInputMask
                                            style={styles.input}
                                            type='money'
                                            value={this.state.itemValue}
                                            maxLength={20}
                                            onChangeText={(itemValue) => this.setState({ itemValue })} />

                                    </KeyboardAvoidingView>
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
        elevation: 1,
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
        color: Colors.purple,
    },
    modalContent: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexGrow: 1,
    },
    cardsContainer: {
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
    }
})
