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
} from 'native-base';
import Utils from '../../utils/Utils'
import ContinueButton from '../../components/SignUp/ContinueButton';
import Instructions from '../../components/SignUp/Instructions';
import MyHeader from '../../components/MyHeader'

export default class CredentialsScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            confirmaEmail: '',
            senha: '',
            confirmaSenha: '',
        }
        this.handleNext = this.handleNext.bind(this)
    }

    handleNext() {
        const { email, senha, confirmaEmail, confirmaSenha } = this.state;
        let data = {
            email, senha, ...this.props.navigation.state.params
        }

        let errs = [];
        if (senha !== confirmaSenha) errs.push('As senhas informadas não coincidem')
        if (email !== confirmaEmail) errs.push('Os emails informados não coincidem')
        if (!senha || !email || !confirmaEmail || !confirmaSenha) errs.push('É preciso preencher todos os campos')
        if (!(email.indexOf('@') > -1) || (email.indexOf(' ') > -1) || !(email.indexOf('.') > -1)) errs.push('Insira um e-mail válido')
        if (errs.length > 0) {
            Utils.toast(errs.map(err => `${err}\n`))
            return
        }

        fetch(`http://dev-clickdobemapi.santahelena.com/api/v1/colaborador`,
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
                    Utils.toast('Cadastro efetuado com sucesso!')
                    this.props.navigation.navigate('Login')
                }
                else {
                    Utils.toast(data.mensagem.map(msg => `${msg}\n`));
                }
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <Container>
                <MyHeader
                    goBack={() => this.props.navigation.goBack()}
                    cancel={() => this.props.navigation.navigate('Login')}
                    title='Cadastro' />
                <Content>
                    <View style={styles.inputsContainer}>
                        <Instructions
                            title="Informe seu"
                            subtitle="E-mail e senha" />

                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            textContentType={'emailAddress'} />

                        <Text style={styles.label}>Confirme o e-mail</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.confirmaEmail}
                            onChangeText={(confirmaEmail) => this.setState({ confirmaEmail })} />

                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            maxLength={8}
                            secureTextEntry={true}
                            style={styles.input}
                            value={this.state.senha}
                            onChangeText={(senha) => this.setState({ senha })} />

                        <Text style={styles.label}>Confirme a senha</Text>
                        <TextInput
                            maxLength={8}
                            secureTextEntry={true}
                            style={styles.input}
                            value={this.state.confirmaSenha}
                            onChangeText={(confirmaSenha) => this.setState({ confirmaSenha })} />

                    </View>
                </Content>
                <ContinueButton
                    handler={this.handleNext} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
    },
    inputsContainer: {
        flex: 1,
        width: '89%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
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