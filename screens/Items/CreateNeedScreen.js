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
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import Utils from '../../utils/Utils'
import MyHeader from '../../components/MyHeader'
import Colors from '../../constants/Colors'
import ThumbnailWithIcon from '../../components/ThumbnailWithIcon'

class CreateNeedScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      categorias: [],
      titulo: '',
      descricao: '',
      tipoItem: 1, //necessidade???
      categoria: null,
      anonimo: false,
      image: null,
      images: [],
    }

    this.token = props.token
  }

  componentWillMount() {
    const { Permissions } = Expo
    const { status } = Permissions.getAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)
    if (Platform.OS === 'ios' && !status) Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)
    else Permissions.askAsync(Permissions.CAMERA)

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

  handleCreateNeed = () => {
    const { titulo, descricao, tipoItem, categoria, anonimo, images } = this.state
    const imagens = images.map((image, index) => ({ nomeImagem: `${index}.jpg`, imagemBase64: image.base64 }))
    const data = { titulo, descricao, tipoItem, categoria, anonimo, imagens }
    console.log('request: ', data)
    fetch('http://dev-clickdobemapi.santahelena.com/api/v1/item', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${this.token}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(body => {
        console.log('response: ', body)
        if (body.sucesso) {
          Utils.toast('Item cadastrado com sucesso', 0)
          this.props.navigation.navigate('Dashboard')
        } else {
          Utils.toast(body.mensagem.map(msg => `${msg}\n`), 0)
        }
      })
      .catch(err => console.log(err))
  }


  _pickImage = async (camera) => {
    const { images } = this.state
    if (images.length == 5) return Utils.toast('Limite máximo de 5 imagens.')

    const imgProperties = {
      allowsEditing: true,
      mediaTypes: 'Images',
      base64: false,
      aspect: [4, 3],
      quality: 0,
    };

    let image = camera
      ? await ImagePicker.launchCameraAsync(imgProperties)
      : await ImagePicker.launchImageLibraryAsync(imgProperties);

    let result = await ImageManipulator.manipulate(
      image.uri,
      [{ resize: { width: 640 } }],
      { format: 'jpeg', compress: 0.5, base64: true }
    )

    if (!result.cancelled) {
      images.push({ uri: result.uri, base64: result.base64 })
      this.setState({ images })
    }
  }

  removeImage = (uri) => {
    const { images } = this.state;
    this.setState({ images: images.filter((item) => item.uri != uri) })
  }

  render() {
    const { categorias, titulo, descricao, categoria, anonimo, images } = this.state;
    return (
      <Container style={styles.container}>
        <MyHeader
          buttonColor={Colors.weirdGreen}
          goBack={() => this.props.navigation.goBack()}
          cancel={() => this.props.navigation.navigate('Dashboard')}
          headerAndroid={Colors.dark}
          statusBarAndroid={Colors.lighterDark}
          title='Necessidade' />
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
            <Item style={styles.item}>
              <Left>
                <Text style={styles.label}>Fotos</Text>
              </Left>
              <Right>
                <View style={{ flexDirection: 'row' }}>
                  <Button onPress={() => this._pickImage(false)} transparent style={styles.iconButton}>
                    <Ionicons
                      name={Platform.OS === 'ios' ? 'ios-images' : 'md-images'}
                      size={28}
                      color={Colors.grey}
                    />
                  </Button>
                  <Button onPress={() => this._pickImage(true)} transparent style={styles.iconButton}>
                    <Ionicons
                      name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
                      size={28}
                      color={Colors.grey}
                    />
                  </Button>
                </View>
              </Right>
            </Item>
            {images &&
              <View style={styles.thumbnailsContainer}>
                {images.map((image, index) =>
                  <ThumbnailWithIcon key={index} uri={image.uri} remove={this.removeImage} />
                )}
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
                  {categorias.map(categoria => <Picker.Item key={categoria.id} label={categoria.descricao} value={categoria.descricao} />)}
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
                  onValueChange={value => this.setState({ anonimo: value })} />
              </Right>
            </Item>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={this.handleCreateNeed}>
              <Text style={styles.buttonText}>Salvar</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(mapStateToProps, null)(CreateNeedScreen)


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