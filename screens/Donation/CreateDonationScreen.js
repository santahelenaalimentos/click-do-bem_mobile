import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Label,
  Input
} from 'native-base'

export default class CreateDonationScreen extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Label>Título</Label>
              <Input />
            </Item>
            <Item>
              <Label>Descrição</Label>
              <Input />
            </Item>
            <Item>
              <Label>Categoria</Label>
              <Input />
            </Item>
            <Item>
              <Label>Imagens</Label>
              <Input />
            </Item>
            <Item>
              <Label>Anônimo</Label>
              <Input />
            </Item>
          </Form>
          <Button>
            <Text>Salvar</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}