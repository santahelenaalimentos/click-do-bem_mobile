import React, { PureComponent } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native'
import {
  Container,
  Button,
} from 'native-base'
import MyHeader from '../../components/MyHeader';
import Colors from '../../constants/Colors';


export default class ItemDetails extends PureComponent {
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super (props);
  }

  render(){
    const {height, width} = Dimensions.get('window');
    const { titulo, descricao, categoria, imagens, tipoItem } = this.props.navigation.getParam('item', {});
    return (
      <Container>
        <MyHeader
        title='Detalhes'
        goBack={() => this.props.navigation.goBack()}
        cancel={() => this.props.navigation.goBack()}/>

        <View style={{ flex: 1 }}>
          
          <View style={{height: height/2, marginTop: (Platform.OS === 'ios' ? 1 : -10) }}>
            <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled>
              { 
                imagens.length
                ? 
                imagens.map(img => 
                <View style={{  height: height/2, width: width, flex: 1}} key={img.id}>
                  <Image 
                  source={{ uri: `http://dev-clickdobemapi.santahelena.com${img.arquivo}` }} 
                  style={{flex: 1, width: width}}/>
                </View>)
                :
                <View style={{  height: height/2, width: width, flex: 1}}>
                  <Image 
                  source={require('../../assets/images/tb-placeholder.png')} 
                  style={{flex: 1, width: width}}/>
                </View>
              }
            </ScrollView>
          </View>

          <View style={{flex: 1}}>
            <ScrollView>
              <View style={{ margin: 10, alignItems: 'flex-start'}}>
                <Text style={{fontSize: 24, fontWeight: '700', color: Colors.purple}}>{titulo}</Text>
                <Text style={{fontSize: 12, fontWeight: '400', color: Colors.grey, marginBottom: 10, padding: 3,  borderWidth: 1, borderColor: Colors.grey, borderRadius: 3}}>{categoria.descricao}</Text>
                <Text style={{fontSize: 14, fontWeight: '500', color: Colors.grey}}>{descricao}</Text>
              </View>

              <View style={{marginVertical: 30}}>
                <Button style={{alignSelf: 'center', backgroundColor: Colors.purple, justifyContent: 'center', minWidth: '60%', height:45}}>
                  <Text style={{ color: 'white'}}>{tipoItem === 'Necessidade' ? 'Oferecer Doação' : 'Solicitar Doação'}</Text>
                </Button>
              </View>
            </ScrollView>
          </View>
        </View>

      </Container>
    )
  }

}
