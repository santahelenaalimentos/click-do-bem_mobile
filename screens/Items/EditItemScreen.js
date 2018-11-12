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
import { TextInputMask } from 'react-native-masked-text'
import Utils from '../../utils/Utils'
import MyHeader from '../../components/MyHeader'
import Colors from '../../constants/Colors'
import ThumbnailWithIcon from '../../components/ThumbnailWithIcon'
import Session from '../../utils/Session'


class EditItemScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            categorias: [],
            titulo: '',
            descricao: '',
            itemValue: '000',
            tipoItem: 0, //doação???
            categoria: null,
            anonimo: false,
            image: null,
            images: [],
            imgExcluir: []
        }

        this.token = props.token
    }

    componentWillMount() {
        const { Permissions } = Expo
        const { status } = Permissions.getAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)
        if (!status) Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)

        const item = this.props.navigation.getParam('item', {})

        this.setState({
            id: item.id,
            titulo: item.titulo,
            descricao: item.descricao,
            tipoItem: item.tipoItem === 'Necessidade' ? 1 : 2, //doação???
            categoria: item.categoria.descricao,
            anonimo: item.anonimo,
            images: item.imagens.map(img => ({id: img.id, uri: `${global.BASE_IMAGES}${img.arquivo}`, base64: null })),
            itemValue: item.valor+'00',
            //adicionar imagens excluidas (que contenham id) num array de strings
        })

        this.fetchCategorias()
    }

    fetchCategorias = () => {
        fetch(`${global.BASE_API_V1}/categoria`, {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${this.token}`,
            },
        })
            .then(res => res.json())
            .then(categorias => this.setState({ categorias }))
            .catch(err => { 
                Session.logout(this.props); 
            })
    }

    handleEditItem = () => {
        const { id, titulo, descricao, tipoItem, categoria, anonimo, images, imgExcluir } = this.state
        const itemValue = tipoItem === 1 
                            ? Number(this.state.itemValue.replace('R$', '').replace(/\./g, '').replace(',', '.'))
                            : null

        const imagens = images
                        .filter(img => img.id === null) //before sending, remove the images already saved
                        .map((image, index) => ({ nomeImagem: `${index}.jpg`, imagemBase64: image.base64 }))

        const data = { id, titulo, descricao, tipoItem, categoria, anonimo, imagens, imgExcluir, valor: itemValue }

        // if((!data.itemValue || data.itemValue < 0) && !this.donation) return toastTop('Deve ser preenchido o valor financeiro da necessidade')

        fetch(`${global.BASE_API_V1}/item`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(body => {
                if (body.sucesso) {
                    Utils.toast('Item editado com sucesso')
                    this.props.navigation.navigate(tipoItem === 1 ? 'Needs' : 'Donations')
                } else {
                    Utils.toast(body.mensagem.map(msg => `${msg}\n`))
                }
            })
            .catch(err => { 
                Session.logout(this.props); 
            })
    }

    _pickImage = async (camera) => {
        const { images } = this.state
        if (images.length == 5) return Utils.toast('Limite máximo de 5 imagens.')

        const imageOptions = {
            allowsEditing: true,
            mediaTypes: 'Images',
            base64: false,
            aspect: [4, 3],
            quality: 1,
        };

        const manipulationOptions = {
            format: 'jpeg',
            compress: 0.5,
            base64: true
        };

        let image = camera
            ? await ImagePicker.launchCameraAsync(imageOptions)
            : await ImagePicker.launchImageLibraryAsync(imageOptions);

        let result = await ImageManipulator.manipulate(
            image.uri,
            [{ resize: { width: 640 } }],
            manipulationOptions
        )

        if (!result.cancelled) {
            images.push({ id: null, uri: result.uri, base64: result.base64 })
            this.setState({ images })
        }
    }

    removeImage = (uri) => {
        const { images, imgExcluir } = this.state;
        const removedItem = images.filter(item => item.uri === uri)[0]
        if(removedItem.id) {
            this.setState({ images: images.filter((item) => item.uri != uri), imgExcluir: [...imgExcluir, removedItem.id]})
        }
        else{
            this.setState({ images: images.filter((item) => item.uri != uri) })
        }
    }

    render() {        
        const { categorias, titulo, descricao, categoria, anonimo, tipoItem, images, itemValue } = this.state
        const isNeed = tipoItem === 1

        return (
            <Container>
                <MyHeader
                    buttonColor={Colors.blue}
                    cancel={() => this.props.navigation.goBack()}
                    title={`Editar ${tipoItem === 2 ? 'Doação' : 'Necessidade'}`} />
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
                        {
                            isNeed
                            &&
                            <Item stackedLabel>
                                <Label style={styles.label}>Valor financeiro do item</Label>
                                <TextInputMask
                                    style={styles.maskedInput}
                                    underlineColorAndroid='transparent'
                                    type='money'
                                    value={itemValue}
                                    maxLength={20}
                                    onChangeText={(itemValue) => this.setState({ itemValue })} />
                            </Item>
                        }
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
                            onPress={this.handleEditItem}>
                            <Text style={styles.buttonText}>Salvar Edição</Text>
                        </Button>
                    </View>

                    <View style={{ height: 20 }} />
                </Content>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return { token: state.token }
}

export default connect(mapStateToProps, null)(EditItemScreen)

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
    maskedInput:{
        minWidth: '100%',
        flex: 1,
        justifyContent: 'flex-end',
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