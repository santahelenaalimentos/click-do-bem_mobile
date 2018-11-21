import React, { Component } from 'react'
import {
    Text,
    TextInput,
    View,
    Platform,
    StyleSheet,
} from 'react-native'
import {
    Button,
    Content,
    Container,
} from 'native-base'
import Colors from '../../utils/Colors'
import MyHeader from '../_shared_components/MyHeader'
import Toast from '../../utils/Toast'
import isValid from '../../utils/Validate'
import messages from '../../utils/ValidationMessages'
import { TextInputMask } from 'react-native-masked-text'
const ios = Platform.OS === 'ios'

export default class RecoverPasswordScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cpfCnpj: '',
            dataNascimento: '',
            novaSenha: '',
            confirmarSenha: '',
        }
    }

    handleRecoverPassword = () => {
        const { cpfCnpj, dataNascimento, novaSenha, confirmarSenha } = this.state

        let validation = []
        if (!isValid.cpf(cpfCnpj)) validation.push(messages.CPF_INVALID)
        if (!isValid.date(dataNascimento)) validation.push(messages.DATA_NASCIMENTO_INVALID)
        if (novaSenha !== confirmarSenha) validation.push(messages.PASS_CONFIRMATION_INVALID)
        if (validation.length) return messages.printValidationMessages(validation)

        const payload = {
            cpfCnpj: cpfCnpj.replace(".", "").replace(".", "").replace("-", ""),
            dataNascimento: dataNascimento.split("/").reverse().join("-"),
            novaSenha,
            confirmarSenha
        }

        this.submitRecoverPassword(payload)
    }

    submitRecoverPassword = (payload) => {
        fetch(`${global.BASE_API_V1}/usuario/esquecisenha`, {
            method: 'POST',
            headers: {
                "Content-Type": `application/json`
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, data.mensagem)
                if (data.sucesso) {
                    Toast.toastTop(data.mensagem)
                    this.props.navigation.navigate('Login')
                }
                else Toast.toastTop(data.mensagem instanceof Array ? data.mensagem.map(msg => `${msg}\n`) : data.mensagem)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container style={styles.container}>
                <MyHeader
                    title='Recuperar Senha'
                    goBack={() => this.props.navigation.navigate('Login')} />
                <Content containerContentStyle={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: ios ? 15 : 0 }}>

                    {ios && <View style={{height: 10}}/>}
                    <View style={{ minWidth: '85%', maxWidth: '85%', alignSelf:'center' }}>
                        <Text style={styles.instructions}> Para recuperar sua senha, preencha os dados abaixo e confirme. </Text>
                    </View>
                    <View style={{ height: 10 }} />
                    <View style={{ minWidth: '80%', maxWidth: '80%', alignSelf:'center' }}>
                        <Text style={styles.label}>CPF</Text>
                        <TextInputMask
                            style={styles.input}
                            type={'cpf'}
                            value={this.state.cpfCnpj}
                            maxLength={14}
                            onChangeText={(cpfCnpj) => this.setState({ cpfCnpj })} />

                        <Text style={styles.label}>Data de nascimento</Text>
                        <TextInputMask
                            style={styles.input}
                            type={'datetime'}
                            value={this.state.dataNascimento}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            maxLength={10}
                            onChangeText={(dataNascimento) => this.setState({ dataNascimento })} />
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            maxLength={8}
                            secureTextEntry={true}
                            style={styles.input}
                            value={this.state.novaSenha}
                            onChangeText={(novaSenha) => this.setState({ novaSenha })} />

                        <Text style={styles.label}>Confirme a senha</Text>
                        <TextInput
                            maxLength={8}
                            secureTextEntry={true}
                            style={styles.input}
                            value={this.state.confirmarSenha}
                            onChangeText={(confirmarSenha) => this.setState({ confirmarSenha })} />
                    </View>
                    <View style={{ height: 20 }} />
                    <View style={{ alignSelf:'center' }}>
                        <Button onPress={() => this.handleRecoverPassword()} style={{ justifyContent: 'center', backgroundColor: Colors.purple, height: 35, minWidth: '85%' }}>
                            <Text style={{ color: Colors.white }}>Confirmar</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
    }
})