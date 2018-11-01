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
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native'
import {
    Container,
    Button,
    Card,
    CardItem,
    Left,
    Right,
    Body,
} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TextInputMask } from 'react-native-masked-text'
import MyHeader from '../../components/MyHeader';
import Colors from '../../constants/Colors';
import { connect } from 'react-redux'

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
        fetch(`http://dev-clickdobemapi.santahelena.com/api/v1/colaborador/${id}`,
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

    render() {
        const { height, width } = Dimensions.get('window');
        const { titulo, descricao, categoria, imagens, tipoItem, usuario } = this.state.item
        const isNeed = tipoItem === 'Necessidade'
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
                                                source={{ uri: `http://dev-clickdobemapi.santahelena.com${img.arquivo}` }}
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
                                <Text style={{ fontSize: 12, fontWeight: '400', color: Colors.grey, marginBottom: 10, paddingVertical: 3 }}>{categoria.descricao}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: Colors.grey }}>{descricao}</Text>
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
                            <View style={styles.modalOuterRegion}></View>
                        </TouchableWithoutFeedback>
                        <View style={styles.modalInnerContainer}>
                            <View style={StyleSheet.modalHeader}>
                                <Button transparent
                                    style={styles.modalSecondaryButton}
                                    onPress={() => this.handleCloseModal()}>
                                    <Text style={styles.modalSecondaryButtonText}>FECHAR</Text>
                                </Button>
                            </View>
                            <View style={styles.modalContent}>

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
                                                <Text style={styles.info}>Nome: {nome}</Text>
                                                <Text style={styles.info}>Telefone: {telefoneFixo || '(não cadastrado)'}</Text>
                                                <Text style={styles.info}>Celular: {telefoneCelular}</Text>
                                                <Text style={styles.info}>E-mail: {email}</Text>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Valor financeiro do item</Text>
                                    <TextInputMask
                                        style={styles.input}
                                        type='money'
                                        value={this.state.itemValue}
                                        maxLength={20}
                                        onChangeText={(itemValue) => this.setState({ itemValue })} />

                                </View>

                                <View style={styles.buttonContainer}>
                                    <Button style={styles.modalPrimaryButton}>
                                        <Text style={{color: Colors.white}}>Confirmar Solicitação</Text>
                                    </Button>
                                </View>
                            </View>
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
        flex: .3,
    },
    modalInnerContainer: {
        width: '100%',
        flex: .7,
        backgroundColor: Colors.white,
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
        justifyContent:'space-around',
        flex: 1,
    },
    cardsContainer: {
        minWidth: '90%',
        flex: 2,
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
    inputContainer: {
        minWidth: '85%',
        flex: 1,
    },
    buttonContainer:{
        flex: 1,
    },
    modalPrimaryButton:{
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
