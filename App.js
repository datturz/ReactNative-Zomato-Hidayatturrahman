import React, { Component } from 'react';
import { Alert, ScrollView, Image } from 'react-native';
import { Container, Header, Content, Left, List, ListItem, Body, Text, Thumbnail, Item, Icon, Input, Button, Card, CardItem, Right } from 'native-base';
import axios from 'axios';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: [],
      pencarian: ''
    };
  }

  cariresto = () => {
    let url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.pencarian}`;
    let config = {
      headers: { 'user-key': '326e2c65ae274c9ac71d50f5150a2501' }
    };
    axios.get(url, config)
      .then((info) => {
        this.setState({
          restaurant: info.data.restaurants,
        })
        console.log(info.data.restaurants)
      })
  }
  render() {
    const data = this.state.restaurant.map((item, index) => {
      let nama = item.restaurant.name;
      let kota = item.restaurant.location.city;
      let alamat = item.restaurant.location.address;
      let harga = item.restaurant.average_cost_for_two * 198.37;
      let number_string = harga.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);
      if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.')
      }
      let foto = item.restaurant.thumb;
      let fotonotfound = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoTOV5X_bg294OAgNBtwExKvzjMzXMrV_FjyQhEKjAqLiPstBT'
      if (foto == false) {
        foto = fotonotfound
      }
      return (
        <ListItem avatar key={index}>
          <Content>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{ uri: foto }} />
                  <Body>
                    <Text> {nama} </Text>
                    <Text note> {kota} </Text>
                  </Body>
                </Left>
                <Right>
                  <Text>Rp {rupiah}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Image source={{ uri: foto }} style={{ height: 200, width: 400, flex: 1 }} />
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Icon active name="pin" />
                  <Text>{alamat}</Text>
                </Left>
              </CardItem>
            </Card>
          </Content>
        </ListItem>
      )
    })

    return (
      <Container>
        <Header searchBar rounded style={{ backgroundColor: 'red' }}>
          <Item>
            <Icon name="search" />
            <Input placeholder="Cari makanan apa ?..." onChangeText={(x) => this.setState({ pencarian: x })} />
          </Item>
          {/* <Text>{this.state.pencarian}</Text> */}
        </Header>
        <Text></Text>

        <Button style={{ backgroundColor: 'red', width: 490, justifyContent: 'center' }}
          onPress={() => { this.cariresto() }}><Text>LIHAT DAFTAR RESTO</Text></Button>
        <Content>
          <ScrollView>
            <List>
              {data}
            </List>
          </ScrollView>
        </Content>
      </Container>
    )
  }
}
