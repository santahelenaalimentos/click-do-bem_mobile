import React, { Component } from 'react'
import {
    Text,
    View,
    Platform,
} from 'react-native'
import {
    Header,
    Body,
    Title,
    Left,
    Right,
    Icon,
    Button,
} from 'native-base'
import Colors from '../constants/Colors'

export default function MyHeader(props) {

    let { buttonColor, goBack, cancel, title } = props;
    return (
        <View>
            {
                Platform.OS === 'ios'
                    ?
                    <Header>
                        <Left>
                            {goBack &&
                                <Button transparent onPress={goBack}>
                                    <Icon style={{ color: Colors.blue, marginTop: -2 }} name='arrow-back' />
                                    <Text style={{ color: Colors.blue }}> Voltar</Text>
                                </Button>
                            }
                        </Left>
                        <Body>
                            <Title>{title}</Title>
                        </Body>
                        <Right>
                            {cancel &&
                                <Text style={{ color: Colors.blue }} onPress={cancel}>Cancelar</Text>
                            }
                        </Right>
                    </Header>
                    :
                    <Header androidStatusBarColor={Colors.purple} style={{ backgroundColor: Colors.purple, elevation: 7, marginBottom: 10 }}>
                        {goBack &&
                            <Left>
                                <Button transparent onPress={goBack}>
                                    <Icon name='arrow-back' />
                                </Button>
                            </Left>
                        }
                        <Body>
                            <Title>{title}</Title>
                        </Body>
                        <Right>
                            {cancel &&
                                <Button transparent onPress={cancel}>
                                    <Icon type="MaterialIcons" name="clear" />
                                </Button>
                            }
                        </Right>
                    </Header>
            }
        </View>
    )
}
