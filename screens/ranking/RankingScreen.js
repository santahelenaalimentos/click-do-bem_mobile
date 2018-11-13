import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
} from 'react-native'
import {
    Container,
    Content,
    Item,
    Left,
    Right,
    Button,
    Spinner,
} from 'native-base'
import MyHeader from '../_shared_components/MyHeader'
import Colors from '../../utils/Colors';
import { connect } from 'react-redux'
import Session from '../../utils/Session'

const mock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class RankingScreen extends Component {
    state = {
        individual: null,
        grupos: null,
    }

    componentDidMount(){
        this.fetchRanking()
    }

    fetchRanking = () => 
        fetch(`${global.BASE_API_V1}/item/ranking/individual`,{
            method: 'GET',
            headers: {
                'Authorization': `bearer ${this.props.token}`,
                'Content-Type': 'application/json,'
            }
        })
        .then(res => res.json())
        .then(individual => {
            this.setState({ individual })
        })
        .catch(err => { 
            Session.logout(this.props); 
            console.log('erro:', err);
        })

    render() {
        const { individual, grupos } = this.state
        return (
            <Container>
                <MyHeader 
                    title='Ranking' 
                    goBack={() => this.props.navigation.goBack()}/>
                <Content>
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button}>
                            <Text style={styles.buttonText}>Colaboradores</Text>
                        </Button>
                        <Button style={styles.button}>
                            <Text style={styles.buttonText}>Campanhas</Text>
                        </Button>
                    </View>
                    <View>
                        {
                            individual
                            ?
                            individual.map((item, index) =>
                                <View key={index} style={styles.itemContainer}>
                                    <Item style={styles.item}>
                                        <Left style={styles.textContainer}>
                                            <Text style={{color: Colors.grey}}> {formatName(item.nome)} </Text>
                                        </Left>
                                        <Right style={styles.textContainer}>
                                            <Text style={{color: Colors.grey}}> {item.pontuacao} pontos </Text>
                                        </Right>
                                    </Item>
                                </View>
                            )
                            :
                            <Spinner color={Colors.purple} />
                        }
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        minHeight: 50,
    },
    item:{
        paddingHorizontal: 10
    },
    textContainer:{
        height: 50, 
        justifyContent: 'center'
    },
    buttonContainer:{
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 70,
    },
    button:{
        alignSelf: 'center',
        backgroundColor: Colors.evenLighterPurple,
        height: 30,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    buttonText:{
        color: Colors.white,
    }

})

function mapStateToProps(state){
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps, null)(RankingScreen)
