import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {
    Container,
    Content,
    List,
    ListItem,
    Icon,
    Right,
    Left,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MyHeader from '../_shared_components/MyHeader'
import Colors from '../../utils/Colors'
import { connect } from 'react-redux';

class MenuScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Container>
                <MyHeader title='Menu' />

                <Content>
                    <List>
                        <ListItem
                            style={styles.menuItem}
                            onPress={() => this.props.navigation.navigate('CreateDonation', { ...this.props.navigation.state.params })}>
                            <Left>
                                <MaterialCommunityIcons name='plus' size={20} color={Colors.purple} />
                                <Text style={styles.buttonText}>Criar uma Doação</Text>
                            </Left>
                            <Right>
                                <Icon name='arrow-forward' />
                            </Right>
                        </ListItem>
                        <ListItem
                            style={styles.menuItem}
                            onPress={() => this.props.navigation.navigate('CreateNeed', { ...this.props.navigation.state.params })}>
                            <Left>
                                <MaterialCommunityIcons name='plus' size={20} color={Colors.purple} />
                                <Text style={styles.buttonText}>Criar uma Necessidade</Text>
                            </Left>
                            <Right>
                                <Icon name='arrow-forward' />
                            </Right>
                        </ListItem>
                        <ListItem
                            style={styles.menuItem}
                            onPress={() => this.props.navigation.navigate('Ranking')}>
                            <Left>
                                <MaterialCommunityIcons name='format-list-numbers' size={20} color={Colors.purple} />
                                <Text style={styles.buttonText}>Ranking de Doações</Text>
                            </Left>
                            <Right>
                                <Icon name='arrow-forward' />
                            </Right>
                        </ListItem>
                        <ListItem
                            style={styles.menuItem}
                            onPress={() => this.props.navigation.navigate('Entities')}>
                            <Left>
                                <MaterialCommunityIcons name='city' size={20} color={Colors.purple} />
                                <Text style={styles.buttonText}>Entidades Parceiras</Text>
                            </Left>
                            <Right>
                                <Icon name='arrow-forward' />
                            </Right>
                        </ListItem>
                        <ListItem
                            style={styles.menuItem}
                            onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                            <Left>
                                <MaterialCommunityIcons name='account' size={20} color={Colors.purple} />
                                <Text style={styles.buttonText}>Meu Perfil</Text>
                            </Left>
                            <Right>
                                <Icon name='arrow-forward' />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.token,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(MenuScreen)

const styles = StyleSheet.create({
    button: {
        borderColor: Colors.purple,
        borderWidth: 1,
        minWidth: '60%',
        height: 35,
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: Colors.grey,
        alignSelf: 'center',
        marginLeft: 10,
        fontSize: 14,
    },

});
