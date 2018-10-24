import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'
import {
    Button
} from 'native-base'
import MyHeader from '../components/MyHeader';
import { connect } from 'react-redux'
import Colors from '../constants/Colors';
import Strings from '../utils/Strings'

class ProfileScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MyHeader title='Perfil' />
                <View style={styles.innerContainer}>
                    <View>
                        <Text>Olá, {Strings.formatName(this.props.user.nome)}</Text>
                    </View>
                    <View>
                        <Button danger
                            style={styles.button}
                            onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.buttonText}> Sair </Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

 export default connect(mapStateToProps, null)(ProfileScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    button: {
        minWidth: '60%',
        height: 35,
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 14,
    },
})