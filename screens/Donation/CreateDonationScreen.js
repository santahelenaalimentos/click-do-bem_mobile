import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Switch,
  Platform,
} from 'react-native'
import {
  Button,
  Item,
  Label,
  Input,
  Left,
  Right,
  Container,
  Content,
  Picker,
  Icon,
} from 'native-base'
import {
  ImagePicker,
  ImageManipulator,
} from 'expo'
import Utils from '../../utils/Utils'
import MyHeader from '../../components/MyHeader'
import Colors from '../../constants/Colors'
import ThumbnailWithIcon from '../../components/ThumbnailWithIcon'

export default class CreateDonationScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props){
    super(props)
    this.state={
      categorias: [],

      titulo: '',
      descricao: '',
      tipoItem: 2, //doação???
      categoria: null,
      anonimo: false,
      image: null,
      images: [],
    }

    this.token = props.navigation.state.params.token
    this.handleCreateDonation = this.handleCreateDonation.bind(this)
    this.removeImage = this.removeImage.bind(this)
  }
  
  componentWillMount(){
    const { Permissions } = Expo
    const { status } = Permissions.getAsync(Permissions.CAMERA_ROLL)
    if(Platform.OS === 'ios' && !status){
      let result = Permissions.askAsync(Permissions.CAMERA_ROLL)
      console.log(result)
    }

    fetch('http://dev-clickdobemapi.santahelena.com/api/v1/categoria', {
      method: 'GET',
      headers: {
        "Authorization": `bearer ${this.token}`,
      },
    })
    .then(res => res.json())
    .then(categorias => this.setState({ categorias }))
    .catch(err => console.log(err))
  }

  handleCreateDonation(){
    let { titulo, descricao, tipoItem, categoria, anonimo } = this.state
    let data = { titulo, descricao, tipoItem, categoria, anonimo }
    fetch('http://dev-clickdobemapi.santahelena.com/api/v1/item', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${this.token}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if(data.sucesso){
        Utils.toast('Item cadastrado com sucesso', 0)
        this.props.navigation.navigate('Dashboard')
      } else {
        Utils.toast(data.mensagem.map(msg => `${msg}\n`), 0)
      }
    })
    .catch(err => console.log(err))
  }

  _pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: 'Images',
      base64: false,
      aspect: [4, 3],
      quality: 0,
    })

    let result = await ImageManipulator.manipulate(
      image.uri,
      [{resize: { width: 640 } }],
      { format: 'jpeg', compress: 0.5, base64: true }
    )
    console.log(result)

    if (!result.cancelled) {
      let { images } = this.state
      images.push(result.uri)
      this.setState({ images })
    }
  }

  removeImage(uri){
    const { images } = this.state;
    this.setState({ images: images.filter((item) => item != uri) })
    console.log('removendo')
  }

  render() {
    let { images } = this.state
    const { categorias, titulo, descricao, categoria, anonimo } = this.state
    return (
      <Container>
        <MyHeader 
          buttonColor={Colors.weirdGreen}
          goBack={() => this.props.navigation.goBack()}
          cancel={() => this.props.navigation.navigate('Dashboard')}
          headerAndroid={Colors.dark}
          statusBarAndroid={Colors.lighterDark}
          title='Nova Doação'/>
        <Content>
          <View style={styles.inputContainer}>
            <Item stackedLabel>
              <Label style={styles.label}>Título</Label>
              <Input 
              maxLength={50}
              value={titulo}
              style={styles.regularInput}
              onChangeText={value => this.setState({titulo: value})}/>
            </Item>
            <Item stackedLabel style={styles.textAreaContainer}>
              <Label style={styles.label}>Descrição</Label>
              <Input 
              style={styles.textArea}
              maxLength={255}
              value={descricao}
              onChangeText={value => this.setState({descricao: value})}
              multiline={true}
              numberOfLines={6}/>
            </Item>
            <Item style={styles.item}>
                <Left>
                  <Text style={styles.label}>Fotos</Text>
                </Left>
                <Right>
                  <Button onPress={this._pickImage} style={styles.secondaryButton}>
                    <Text style={styles.buttonText}>Adicionar...</Text>
                  </Button>
                </Right>
            </Item>
            {images && 
            <View style={styles.thumbnailsContainer}>
            { images.map((image, index) => 
              <ThumbnailWithIcon key={index} uri={image} remove={this.removeImage}/>
            ) }
            </View>
            }
            <Item style={styles.item}>
              <Left>
                <Text style={styles.label}>Categoria</Text>
              </Left>
              <Right>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={styles.picker}
                  selectedValue={categoria}
                  onValueChange={(cat) => this.setState({ categoria: cat })}>
                  <Picker.Item key='0' label='Selecione' value={null} />
                  { categorias.map(categoria => <Picker.Item key={categoria.id} label={categoria.descricao} value={categoria.descricao}/>) }
                </Picker>
              </Right>
            </Item>
            <Item style={styles.item}>
              <Left>
                <Text style={styles.label}>Anônimo</Text>
              </Left>
              <Right>
                <Switch 
                  value={anonimo} 
                  onValueChange={value => this.setState({ anonimo: value })}/>
              </Right>
            </Item>

          </View>
          <View style={styles.buttonContainer}>
            <Button 
              style={styles.button}
              onPress={this.handleCreateDonation}>
              <Text style={styles.buttonText}>Salvar</Text>
            </Button>
          </View>

          <View style ={{height: 20}}/>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    maxWidth: '85%',
    minWidth: '85%',
    alignSelf: 'center',
  },
  buttonContainer:{
    alignSelf: 'center',
    maxWidth: '85%',
  },
  secondaryButton:{
    backgroundColor: Colors.blue,
    minWidth: '50%',
    justifyContent: 'center'
  },
  button:{
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
  label: {
    color: '#666666'
  },
  picker:{ 
    width: Platform.OS === 'android' ? '150%' : undefined 
  },
  thumbnailsContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
})