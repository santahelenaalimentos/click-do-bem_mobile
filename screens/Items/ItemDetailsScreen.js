import React, { PureComponent } from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native'
import {
  Container,
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
    const { titulo, descricao, categoria, imagens} = this.props.navigation.getParam('item', {});
    return (
      <Container>
        <MyHeader
        title='Detalhes'
        goBack={() => this.props.navigation.goBack()}
        cancel={() => this.props.navigation.goBack()}/>

        <View style={{ flex: 1 }}>
          
          <View style={{height: height/2, marginTop: -10, }}>
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

          <View style={{ margin: 10}}>
            <Text style={{fontSize: 24, fontWeight: '700', color: Colors.purple}}>{titulo}</Text>
            <Text style={{fontSize: 14, fontWeight: '500', color: Colors.grey}}>{descricao}</Text>
          </View>
          {/* <Text style={{fontSize: 24, fontWeight: '700', color: Colors.purple}}>{categoria.descricao}</Text> */}
        </View>

      </Container>
    )
  }

}
