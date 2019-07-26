import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
} from 'react-native'
import {
    Button,
    Item,
    Label,
    Input,
    Container,
    Content,

} from 'native-base'

import { connect } from 'react-redux'
import Utils from '../../utils/Utils'
import MyHeader from '../_shared_components/MyHeader'
import Colors from '../../utils/Colors'
import Session from '../../utils/Session'
import * as firebase from 'firebase'
import { default as UUID } from "uuid";

class NotificationScreen extends React.Component{

    state = {
        id: '',
        titulo: '',
        descricao: '',
    }

    componentWillMount() {
        this.setState({ id: UUID.v4()})
    }

    handleCreateNotification = () => {

        const { id, titulo, descricao } = this.state
        console.log(id)

        try {
            firebase.database().ref('/notifications').child(id)
            .set({ title: titulo, bodyMessage: descricao })

            Utils.toast('Sua notificação foi enviada com sucesso!', 0)
            this.props.navigation.navigate('Menu')

        } catch (error) {
            console.log(error)
            Session.logout(this.props);
        }
    }

    render() {

        const { titulo, descricao } = this.state

        return(
            <Container>
                <MyHeader title='Push Notification' goBack={() => this.props.navigation.goBack()} />
                <Content>
                    <View style={styles.inputContainer}>
                        <Item stackedLabel>
                            <Label style={styles.label}>Título</Label>
                            <Input
                                autoCapitalize='sentences'
                                maxLength={50}
                                value={titulo}
                                style={styles.regularInput}
                                onChangeText={value => this.setState({ titulo: value })} />
                        </Item>
                        <Item stackedLabel style={styles.textAreaContainer}>
                            <Label style={styles.label}>Descrição</Label>
                            <Input
                                autoCapitalize='sentences'
                                style={styles.textArea}
                                maxLength={255}
                                value={descricao}
                                onChangeText={value => this.setState({ descricao: value })}
                                multiline={true}
                                numberOfLines={6} />
                        </Item>
                        </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.button}
                            onPress={() => this.handleCreateNotification()}>
                            <Text style={styles.buttonText}>Enviar notificação</Text>
                        </Button>
                    </View>

                    <View style={{ height: 20 }} />
                </Content>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.token,
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(NotificationScreen)

const styles = StyleSheet.create({
    inputContainer: {
        maxWidth: '85%',
        minWidth: '85%',
        alignSelf: 'center',
    },
    buttonContainer: {
        alignSelf: 'center',
        maxWidth: '85%',
    },
    iconButton: {
        marginHorizontal: 10,
    },
    button: {
        backgroundColor: Colors.purple,
        minWidth: '100%',
        marginTop: 35,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
    },
    item: {
        minHeight: 70,
    },
    textAreaContainer: {
        minHeight: 120,
    },
    textArea: {
        textAlignVertical: 'top',
        maxWidth: '100%',
    },
    regularInput: {
        maxWidth: '100%',
    },
    maskedInput: {
        minWidth: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        borderBottomWidth: 0
    },
    label: {
        color: '#666666'
    },
    picker: {
        width: Platform.OS === 'android' ? '150%' : undefined
    },
    thumbnailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
})