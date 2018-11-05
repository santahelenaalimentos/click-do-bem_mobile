import React from 'react';
import {
    StyleSheet,
    View,
    Platform,
    Text,
    TextInput,
} from 'react-native';
import {
    Container,
    Content,
    Button,
} from 'native-base';
import md5 from 'md5';
import Toast from '../utils/Toast'
import MyHeader from '../components/MyHeader'
import Colors from '../constants/Colors';
import { connect } from 'react-redux';

class ChangePasswordScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            documento: '',
            senhaAtual: '',
            novaSenha: '',
            confirmarSenha: '',
        }
    }

    componentWillMount(){
        this.setState({ documento: this.props.navigation.getParam('documento', {}) })
    }

    handleSubmit = () => {
        const { documento, senhaAtual, novaSenha, confirmarSenha } = this.state

        const payload = { documento, senhaAtual: md5(senhaAtual), novaSenha, confirmarSenha }

        console.log(payload)
        console.log(this.props.token)

        fetch(`${global.BASE_API_V1}/usuario/trocarsenha`, {
            method: 'POST',
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
        const { senhaAtual, novaSenha, confirmarSenha } = this.state
        return (
            <Container>
                <MyHeader
                    cancel={() => this.props.navigation.goBack()}
                    title='Mudar Senha' />
                <Content>
                    <View style={styles.inputsContainer}>

                        <Text style={styles.label}>Senha Atual</Text>
                        <TextInput
                            maxLength={8}
                            secureTextEntry={true}
                            style={styles.input}
                            value={senhaAtual}
                            onChangeText={(senhaAtual) => this.setState({ senhaAtual })} />

                        <Text style={styles.label}>Senha Nova</Text>
                        <TextInput
                            maxLength={8}
                            secureTextEntry={true}
                            style={styles.input}
                            value={novaSenha}
                            onChangeText={(novaSenha) => this.setState({ novaSenha })} />

                        <Text style={styles.label}>Confirme a senha</Text>
                        <TextInput
                            maxLength={8}
                            secureTextEntry={true}
                            style={styles.input}
                            value={confirmarSenha}
                            onChangeText={(confirmarSenha) => this.setState({ confirmarSenha })} />

                    </View>
                    <View>
                        <Button 
                            style={styles.primaryButton}
                            onPress={() => this.handleSubmit()}>
                            <Text style={{ color: Colors.white }}>Salvar</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps, null)(ChangePasswordScreen)

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
    },
    inputsContainer: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
    },
    label: {
        fontSize: 14,
        color: '#999999',
        marginBottom: -5,
        marginTop: 15
    },
    input: {
        height: 45,
        borderBottomColor: '#999999',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    },
    primaryButton: {
        backgroundColor: Colors.purple,
        height: 35,
        width: '40%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
    },
});