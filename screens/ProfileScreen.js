import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
} from 'react-native'
import {
    Button,
    Content,
    Card,
    CardItem,
    Body,
    Left,
    Right,
    Container,
} from 'native-base'
import { connect } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MyHeader from '../components/MyHeader';
import Colors from '../constants/Colors';
import Strings from '../utils/Strings'
import { signOut } from '../actions';
import Storage from '../utils/Storage'
const ios = Platform.OS === 'ios'

class ProfileScreen extends Component {

    handleSignOut = () => {
        Storage._deleteUser()
        this.props.dispatch(signOut())
        this.props.navigation.navigate('Login')
    }

    handleChangePassword = () => {
        this.props.navigation.navigate('ChangePassword',{ 
            documento: this.props.user.cpfCnpj, 
        })
    }

    handleEditInfo = () => {
        const { id, nome, cpfCnpj, dataNascimento, email, telefoneFixo, telefoneCelular, cep, cidade,
            uf, bairro, logradouro, numero, complemento } = this.props.user

        this.props.navigation.navigate('EditInfo',{
            user:{  id, documento: cpfCnpj, dataNascimento, email, telefoneFixo, 
                telefoneCelular, cep, cidade, uf, bairro, logradouro, numero, complemento, nome }
        })
    }

    render() {
        const { nome, cpfCnpj, email, telefoneFixo, telefoneCelular, cep, cidade, uf, bairro, logradouro, numero, complemento } = this.props.user;
        console.log(this.props.user)
        return (
            <View style={styles.container}>
                <MyHeader title='Perfil' goBack={() => this.props.navigation.goBack()} />

                <Content contentContainerStyle={styles.content} scrollEnabled={true}>
                    <View style={styles.cardsContainer}>

                        <View style={styles.titleSection}>
                            <Text style={styles.bigText}>{Strings.formatName(nome)}</Text>
                            <Button danger
                                style={styles.signOutButton}
                                onPress={this.handleSignOut}>
                                <Text style={styles.buttonText}> Sair </Text>
                            </Button>
                        </View>

                        <Card>
                            <CardItem header bordered>
                                <Left>
                                    <Text style={styles.cardTitle}>Informações</Text>
                                </Left>
                                <Right>
                                    <Button style={{ height: 20 }} transparent
                                        onPress={() => this.handleEditInfo()}>
                                        <MaterialCommunityIcons name='pencil' size={20} color={Colors.grey} />
                                    </Button>
                                </Right>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Text style={styles.separatorTitle}>Contato</Text>
                                    <Text style={styles.info}>Email: {email}</Text>
                                    <Text style={styles.info}>Telefone: {telefoneFixo}</Text>
                                    <Text style={styles.info}>Celular: {telefoneCelular}</Text>
                                    <Text style={styles.separatorTitle}>Endereço</Text>
                                    <Text style={styles.info}>Logradouro: {logradouro}</Text>
                                    <Text style={styles.info}>Número: {numero}</Text>
                                    <Text style={styles.info}>Complemento: {complemento}</Text>
                                    <Text style={styles.info}>Bairro: {bairro}</Text>
                                    <Text style={styles.info}>Cidade: {cidade}</Text>
                                    <Text style={styles.info}>Estado: {uf}</Text>
                                    <Text style={styles.info}>CEP: {cep}</Text>
                                </Body>
                            </CardItem>
                        </Card>

                        <Card>
                            <CardItem header bordered>
                                <Left>
                                    <Text style={styles.cardTitle}>Segurança</Text>
                                </Left>
                                <Right>
                                    <Button style={{ height: 20 }} transparent
                                        onPress={() => this.handleChangePassword()}>
                                        <MaterialCommunityIcons name='pencil' size={20} color={Colors.grey} />
                                    </Button>
                                </Right>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Text style={styles.info}>CPF: {Strings.formatCPF(cpfCnpj)}</Text>
                                    <Text style={styles.info}>Senha: ········</Text>
                                </Body>
                            </CardItem>
                        </Card>

                    </View>
                </Content>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(ProfileScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        ...Platform.select({
            ios: {
                flex: 1,
            },
        }),
        alignItems: 'center',
        minWidth: '90%',
        minHeight: '100%',
    },
    titleSection: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    cardTitle: {
        color: Colors.purple,
        fontSize: 16,
        fontWeight: '500',
    },
    separatorTitle:{
        color: Colors.grey,
        fontSize: 14,
        fontWeight: '500',
        marginTop: 5,
    },
    bigText: {
        color: Colors.purple,
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 5,
        marginTop: 10,
    },
    signOutButton: {
        minWidth: '20%',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: 12,
    },
    info: {
        color: Colors.grey,
    },
    cardsContainer: {
        minWidth: '90%',
        flex: 1,
    }
})