import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
} from 'react-native'
import {
    Card,
    CardItem,
    Body,
    Right,
    Left,
    Thumbnail,
} from 'native-base'
import MyHeader from '../_shared_components/MyHeader';
import Colors from '../../utils/Colors'
import entities from './entities.json'

export default class FeaturedEntitiesScreen extends Component {

    state = {
        entities: entities
    }

    render() {
        console.log(this.state.entities)
        return (
            <View style={{ flex: 1 }}>
                <MyHeader title='Entidades' goBack={() => this.props.navigation.goBack()} />

                <View style={styles.listContainer}>
                    <ScrollView 
                        showsVerticalScrollIndicator={false}>

                        {
                            this.state.entities.map(item =>
                                (
                                    <Card key={item.name}>
                                        <CardItem cardBody>
                                            <Body style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ padding: 5, width: '35%' }}>
                                                    <Image
                                                        source={item.image
                                                            ? { uri: `${global.BASE_IMAGES}${item.image}` }
                                                            : require('../../assets/images/tb-placeholder-gray.png')}
                                                        style={styles.image} />
                                                </View>
                                                <View style={{ padding: 5, width: '65%' }}>
                                                    <Text style={styles.cardTitle}>{item.name}</Text>
                                                    <Text style={styles.info}>{item.data}</Text>
                                                </View>
                                            </Body>

                                        </CardItem>

                                    </Card>)
                            )
                        }

                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardTitle: {
        color: Colors.purple,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'left',
    },
    info: {
        color: Colors.grey,
        fontSize: 10,
        fontWeight: '300',
        textAlign: 'left'
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    image: {
        height: 100,
        width: 100,
        flex: 1,
        margin: 5,
        resizeMode: 'center'
    }
})
