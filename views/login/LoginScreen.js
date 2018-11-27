import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
} from 'react-native';
import {
    Button,
    Content,
} from 'native-base';
import md5 from 'md5';
import { connect } from 'react-redux'
import { signIn } from '../../redux/actions/index'
import Utils from '../../utils/Utils'
import { TextInputMask } from 'react-native-masked-text'
import Colors from '../../utils/Colors';
import NoHeader from '../_shared_components/NoHeader'
import Storage from '../../utils/Storage'

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            nome: '11618050877', 
            // nome: '91183200900',
            senha: 'a1b2c3d4',
        }
    }

    componentWillMount() {
        Storage._recoverData('storedUserData')
            .then(data => {
                let dados = JSON.parse(data)
                return dados
            })
            .then(user => {
                if (user) {
                    this.props.dispatch(signIn(user.token, user))
                    this.navigateHome()
                }
            })
            .catch(err => console.log(err))
    }

    onPressSignIn = () => {
        const { nome, senha } = this.state;
        const data = { nome: nome.replace(".", "").replace(".", "").replace("-", ""), senha: md5(senha) };

        fetch(`${global.BASE_API_V1}/usuario/autenticar`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            })
            .then(res => res.json())
            .then((data) => {
                if (data.sucesso) {
                    console.log(data.token)
                    const user = this.formatData(data.usuario)
                    this.props.dispatch(signIn(data.token, user))
                    Storage._storeUser(user, data.token)
                    this.navigateHome()
                }
                else {
                    Utils.toastTop(data.mensagem);
                }
            })
            .catch((err) => console.log(err))
    }

    formatData = (usuario) => {
        usuario.usuarioDados.id = usuario.id
        const { id, nome, cpfCnpj, usuarioPerfil, usuarioLogin } = usuario
        return {
            id, nome, cpfCnpj, usuarioPerfil, usuarioLogin,
            ...usuario.usuarioDados
        }
    }

    onPressRecoverPassword = () => this.props.navigation.navigate('RecoverPassword')

    navigateSignUp = () => this.props.navigation.navigate('SignUp')

    navigateHome = () => this.props.navigation.navigate('Home')

    render() {
        return (
            <View style={styles.container}>
                <NoHeader />
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/cbem-logo.png')}
                        style={styles.welcomeImage}
                    />
                </View>

                <Content style={styles.credentialsContainer}>
                    <View >

                        <Text style={styles.label}>CPF</Text>
                        <TextInputMask
                            style={styles.input}
                            underlineColorAndroid={Colors.grey}
                            type={'cpf'}
                            value={this.state.nome}
                            maxLength={14}
                            onChangeText={(nome) => this.setState({ nome })} />

                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            secureTextEntry={true}
                            underlineColorAndroid={Colors.grey}
                            style={styles.input}
                            value={this.state.senha}
                            maxLength={8}
                            onChangeText={(senha) => this.setState({ senha })} />

                        <View style={{ minWidth: '85%', alignItems: 'flex-end' }}>
                            <View>
                                <Button transparent
                                    onPress={() => this.onPressRecoverPassword()}
                                    style={{ height: 27 }}>
                                    <Text style={{ color: Colors.evenLighterPurple }}>Esqueci minha senha</Text>
                                </Button>
                            </View>
                        </View>

                    </View>

                    <View style={{ height: 20 }} />

                    <View >
                        <Button style={styles.signInButton} onPress={this.onPressSignIn} block >
                            <Text style={styles.signInText}>Entrar</Text>
                        </Button>
                        <View style={styles.ou}>
                            <Text></Text>
                        </View>
                        <Button style={styles.signUpButton} onPress={this.navigateSignUp} block >
                            <Text style={styles.signUpText}>Criar nova conta</Text>
                        </Button>
                    </View>
                </Content>

            </View>
        );
    }
}

export default connect()(LoginScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logoContainer: {
        minWidth: '80%',
        minWidth: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeImage: {
        height: 250,
        resizeMode: 'contain',
        marginTop: Platform.OS === 'ios' ? '10%' : '0%',
    },
    credentialsContainer: {
        minWidth: '85%',
    },
    credentialsInput: {
        minWidth: '80%',
        height: 40,
    },
    signInText: {
        color: '#fff'
    },
    signUpText: {
        color: Colors.purple,
    },
    signInButton: {
        backgroundColor: Colors.purple,
        elevation: 1,
        marginBottom: 4,
    },
    signUpButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.purple,
        elevation: 1,
        marginBottom: 4,
    },
    ou: {
        alignSelf: 'center',
        height: 15,

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
});
