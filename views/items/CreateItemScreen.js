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
import { TextInputMask } from 'react-native-masked-text'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import Utils from '../../utils/Utils'
import MyHeader from '../_shared_components/MyHeader'
import Colors from '../../utils/Colors'
import ThumbnailWithIcon from '../_shared_components/ThumbnailWithIcon'
import Session from '../../utils/Session'
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions';

const ios = Platform.OS === 'ios'

class CreateItemScreen extends React.Component {

    state = {
        categorias: [],
        values: [],
        titulo: '',
        descricao: '',
        tipoItem: 0,
        itemValue: null,
        categoria: null,
        anonimo: false,
        image: null,
        images: [],
        campaigns: [],
        campaign: null,
        creating: false,
    }

    disabled = false

    token = this.props.token
    user = this.props.user

    componentWillMount() {
        this.donation = this.props.donation
        this.setState({ tipoItem: this.donation ? 2 : 1 })

        //const { Permissions } = Expo
        const { status } = Permissions.getAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)
        if (!status) Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)

        this.fetchCategories()
        this.fetchValues()
        this.fetchCampaigns()
    }

    fetchCategories = () =>
        fetch(`${global.BASE_API_V1}/categoria`, {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${this.token}`,
            },
        })
            .then(res => res.json())
            // .then(cat => {
            //     console.log(cat)
            //     return cat
            // })
            .then(categorias => this.setState({ categorias }))
            .catch(err => {
                Session.logout(this.props);
            })

    fetchValues = () =>
        fetch(`${global.BASE_API_V1}/item/valor-faixa`, {
            method: 'GET',
            headers: {
                "Authorization": `bearer ${this.token}`,
            },
        })
            .then(res => res.json())
            // .then(val => {
            //     console.log(val)
            //     return val
            // })
            .then(values => this.setState({ values }))
            .catch(err => {
                Session.logout(this.props);
            })

    fetchCampaigns = () =>
        fetch(`${global.BASE_API_V1}/campanha`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `bearer ${this.token}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({ campaigns: data })
            })
            .catch(err => {
                Session.logout(this.props);
                console.log('erro:', err);
            })

    handleCreateItem = () => {
        this.disabled = true

        const { titulo, descricao, tipoItem, categoria, anonimo, images, itemValue, campaign } = this.state

        const imagens = images.map((image, index) => ({ nomeImagem: `${index}.jpg`, imagemBase64: image.base64 }))
        const data = { titulo, descricao, tipoItem, categoriaId: categoria, anonimo, imagens, valorFaixaId: itemValue, campanhaId: campaign }

        console.log(data)
        // if((!data.itemValue || data.itemValue < 0) && !this.donation) return toastTop('Deve ser preenchido o valor financeiro da necessidade')
        fetch(`${global.BASE_API_V1}/item`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${this.token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(body => {
                if (body.sucesso) {
                    // Salvo o ID do item criado para utilizar no PushNotification
                    console.log(body)
                    console.log(this.user)
                    console.log(this.user.id)
                    try {
                        firebase.database().ref('/itens').child(body.mensagem.id)
                    .set({ doacao: this.donation, userId: this.user.id })
                    } catch (error) {
                        console.log(error)
                    }

                    Utils.toast('Sua ' + (this.donation ? 'doação' : 'necessidade') + ' foi criada com sucesso', 0)
                    this.props.navigation.navigate('Menu')
                } else {
                    Utils.toast(body.mensagem instanceof Array ? body.mensagem.map(msg => `${msg}\n`) : body.mensagem, 0)
                }
            })
            .catch(err => {
                console.log(err)
                Session.logout(this.props);
            })
            .then(() => this.disabled = false)
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
            images.push({ uri: result.uri, base64: result.base64 })
            this.setState({ images })
        }
    }

    removeImage = (uri) => {
        const { images } = this.state;
        this.setState({ images: images.filter((item) => item.uri != uri) })
    }

    render() {
        let { images } = this.state
        const { categorias, titulo, descricao, categoria, anonimo, itemValue, values, campaign, campaigns } = this.state
        return (
            <Container>
                <MyHeader
                    cancel={() => this.props.navigation.goBack()}
                    title={this.donation ? 'Doação' : 'Necessidade'} />
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
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    style={styles.picker}
                                    selectedValue={categoria}
                                    onValueChange={(cat) => this.setState({ categoria: cat })}>
                                    <Picker.Item key='0' label='Selecione' value={null} />
                                    {categorias.map(categoria => <Picker.Item key={categoria.id} label={categoria.descricao} value={categoria.id} />)}
                                </Picker>
                            </Right>
                        </Item>
                        {
                            !this.donation
                            &&
                            <Item style={styles.item}>
                                <Left>
                                    <Text style={styles.label}>Valor</Text>
                                </Left>
                                <Right>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        style={styles.picker}
                                        selectedValue={itemValue}
                                        onValueChange={(itemValue) => this.setState({ itemValue })}>
                                        <Picker.Item key='0' label='Selecione' value={null} />
                                        {values.map(item => <Picker.Item key={item.id} label={item.descricao} value={item.id} />)}
                                    </Picker>
                                </Right>
                            </Item>
                        }
                        <Item style={styles.item}>
                            <Left>
                                <Text style={styles.label}>Campanha</Text>
                            </Left>
                            <Right>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    style={styles.picker}
                                    selectedValue={campaign}
                                    onValueChange={(campaign) => this.setState({ campaign })}>
                                    <Picker.Item key='0' label='Selecione' value={null} />
                                    {campaigns.map(item => <Picker.Item key={item.id} label={item.descricao} value={item.id} />)}
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
                            onPress={() => !this.disabled && this.handleCreateItem()}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </Button>
                    </View>

                    <View style={{ height: 20 }} />
                </Content>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return { token: state.token, user: state.user }
}

export default connect(mapStateToProps, null)(CreateItemScreen)

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
    maskedInput: {
        minWidth: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        borderBottomWidth: 0
    },
    label: {
        color: '#666666'
    },
    picker: {
        width: Platform.OS === 'android' ? '150%' : '150%'
    },
    thumbnailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
})