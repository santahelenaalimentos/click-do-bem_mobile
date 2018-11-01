import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
    TextInput,
} from 'react-native'
import {
    Container,
    Content,
    Item,
    Picker,
    Right,
    Left,
    Icon,
    Button,
} from 'native-base'
import MyHeader from '../components/MyHeader'
import { TextInputMask } from 'react-native-masked-text'
import Toast from '../utils/Toast'
import { connect } from 'react-redux'
import Colors from '../constants/Colors';
const ufList = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']

class EditInfoScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id:'',
            nome: '',
            dataNascimento: '',
            telefoneCelular: '',
            telefoneFixo: '',
            email: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: null,
            cep: '',
        }
    }

    componentWillMount(){
        const { id, nome, telefoneCelular, telefoneFixo, email, logradouro, numero, 
                complemento, dataNascimento, bairro, cidade, uf, cep } = this.props.navigation.getParam('user', {})
        this.setState({ id, nome, dataNascimento, telefoneCelular, telefoneFixo, email, logradouro, numero, 
                        complemento, bairro, cidade, uf, cep })
    }

    handleSubmit = () => {
        const { id, nome, dataNascimento, telefoneCelular, telefoneFixo, email, logradouro, numero, complemento, bairro, cidade, uf, cep } = this.state

        const payload = { 
            id, 
            nome, 
            dataNascimento,
            endereco:{ logradouro, numero, complemento, bairro, cidade, uf, cep },
            telefoneFixo,
            telefoneCelular,
            email,
        }

        console.log(payload)
        console.log(this.props.token)

        fetch(`http://dev-clickdobemapi.santahelena.com/api/v1/colaborador`, {
            method: 'PUT',
            headers:{
                'Authorization': `bearer ${this.props.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.sucesso){
                Toast.toast(data.mensagem, 50)
                this.props.navigation.goBack()
            } 
            else if(data.mensagem) Toast.toastTop(data.mensagem instanceof Array ? data.mensagem.map(msg => `${msg}\n`) : data.mensagem)
            else Toast.toastTop('Ocorreu um erro desconhecido.')
        })
        .catch(err => console.log(err))
    }

    render() {
        const { logradouro, numero, complemento, bairro, cidade, uf, cep, nome, telefoneCelular, telefoneFixo, email } = this.state
        return (
            <Container>
                <MyHeader
                    title='Editar Informações'
                    cancel={() => this.props.navigation.goBack()} />
                <Content>
                    <View style={styles.inputsContainer}>

                        <Text style={styles.label}>Nome</Text>
                        <TextInput autoCapitalize='words'
                            style={styles.input}
                            value={nome}
                            onChangeText={(nome) => this.setState({ nome })} />

                        <Text style={styles.label}>Celular</Text>
                        <TextInputMask
                            maxLength={15}
                            style={styles.input}
                            type={'cel-phone'}
                            value={telefoneCelular}
                            onChangeText={(telefoneCelular) => this.setState({ telefoneCelular })}
                            options={{
                                withDDD: true,
                            }}
                        />

                        <Text style={styles.label}>Telefone</Text>
                        <TextInputMask
                            placeholder='Opcional'
                            maxLength={14}
                            style={styles.input}
                            type={'cel-phone'}
                            value={telefoneFixo}
                            onChangeText={(telefoneFixo) => this.setState({ telefoneFixo })}
                            options={{
                                withDDD: true,
                            }}
                        />

                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={(email) => this.setState({ email })}
                            textContentType={'emailAddress'} />

                        <Item style={[styles.item, styles.inputEstado]}>
                            <Left>
                                <Text style={styles.labelUf}>Estado</Text>
                            </Left>
                            <Right>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    style={{ width: Platform.OS === 'android' ? '100%' : undefined }}
                                    selectedValue={uf}
                                    onValueChange={(uf) => this.setState({ uf })}>
                                    <Picker.Item key='0' label='Selecione' value={null} />
                                    {ufList.map(uf => <Picker.Item key={uf} label={uf} value={uf} />)}
                                </Picker>
                            </Right>
                        </Item>

                        <Text style={styles.label}>Cidade</Text>
                        <TextInput
                            style={styles.input}
                            value={cidade}
                            onChangeText={(cidade) => this.setState({ cidade })} />

                        <Text style={styles.label}>CEP</Text>
                        <TextInputMask
                            style={styles.input}
                            type='zip-code'
                            value={cep}
                            maxLength={9}
                            onChangeText={(cep) => this.setState({ cep })} />

                        <Text style={styles.label}>Endereço</Text>
                        <TextInput
                            style={styles.input}
                            value={logradouro}
                            onChangeText={(logradouro) => this.setState({ logradouro })} />

                        <Text style={styles.label}>Número</Text>
                        <TextInput
                            style={styles.input}
                            value={numero}
                            onChangeText={(numero) => this.setState({ numero })} />

                        <Text style={styles.label}>Bairro</Text>
                        <TextInput
                            style={styles.input}
                            value={bairro}
                            onChangeText={(bairro) => this.setState({ bairro })} />

                        <Text style={styles.label}>Complemento</Text>
                        <TextInput
                            placeholder='Opcional'
                            style={styles.input}
                            value={complemento}
                            onChangeText={(complemento) => this.setState({ complemento })} />

                    </View>

                    <Button
                        style={styles.primaryButton}
                        onPress={() => this.handleSubmit()}>
                        <Text style={{ color: Colors.white }}>Salvar</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps, null)(EditInfoScreen)

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
    },
    inputsContainer: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        color: '#999999',
        marginBottom: -5,
        marginTop: 15
    },
    labelUf: {
        fontSize: 14,
        color: '#999999',
    },
    input: {
        height: 45,
        borderBottomColor: '#999999',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    },
    inputEstado: {
        height: 45,
        borderBottomColor: '#999999',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 1,
    },
    item: {
        minHeight: 70,
    },
    primaryButton: {
        backgroundColor: Colors.purple,
        height: 35,
        width: '40%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
    },
})