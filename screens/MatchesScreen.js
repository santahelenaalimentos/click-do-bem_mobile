import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
} from 'react-native'
import {
    Content,
    Card,
    CardItem,
    Left,
    Right,
    Body,
} from 'native-base'
import Colors from '../constants/Colors'
import MyHeader from '../components/MyHeader';
import { connect } from 'react-redux'

class MatchesScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            matches: []
        }
    }

    componentWillMount() {
        this.fetchMatches()
    }

    fetchMatches = () => {
        console.log(this.props.token)
        fetch(`http://dev-clickdobemapi.santahelena.com/api/v1/item/match`,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `bearer ${this.props.token}`
                }
            })
            .then(res => res.json())
            .then((data) => {
                if (data.length) {
                    return this.setState({ matches: data })
                }
            })
            .catch((err) => console.log(err))
    }

    render() {
        const { matches } = this.state

        if (!matches)
            return (
                <View style={{ flex: 1, backgroundColor: Colors.white }}>
                    <MyHeader title='Matches' />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: Colors.purple }}>Você ainda não efetuou nenhuma combinação.</Text>
                    </View>
                </View>
            )

        return (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <MyHeader title='Matches' />

                <Content>
                    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                        {matches.map((match, index) => (
                            <View key={index}>
                                <Card>
                                    <CardItem header bordered>
                                        <Left>
                                            <Text style={styles.cardTitle}>{match.titulo}</Text>
                                        </Left>
                                        <Right>
                                            <Text style={styles.cardTitle}>{match.tipoMatch}</Text>
                                        </Right>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Body>
                                            <Text style={styles.info}>Doador: {match.nomeDoador}</Text>
                                            <Text style={styles.info}>Receptor: {match.nomeReceptor}</Text>
                                            <Text style={styles.info}>Valor Estimado: {match.valor}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </View>
                        ))}
                    </View>
                </Content>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps, null)(MatchesScreen)

const styles = StyleSheet.create({
    cardTitle: {
        color: Colors.purple,
        fontSize: 16,
        fontWeight: '500',
    },
    info: {
        color: Colors.grey,
    },
})