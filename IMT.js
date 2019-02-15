import React, { Component } from 'react'
import { Alert, View, ScrollView, TextInput } from 'react-native'
import { Header, Form, Item, Content, Container, Text, Input, List, ListItem, Thumbnail, Body, Left, Right, Label, Footer, Button } from 'native-base'


class App extends Component {
  constructor() {
    super()
    this.state = {
      massa: 0,
      tinggi: 0,
      imt: 0,
      result: '',
      res: '',
      submit: false
    }
  }
  render() {
    let tap = () => {
      let masa = this.state.massa;
      let tinggi = this.state.tinggi / 100;
      this.setState({
        tinggi: tinggi
      });
      let hasil = masa / (tinggi * tinggi);
      this.setState({
        imt: hasil
      });
      if (hasil < 18.5) {
        this.setState({
          result: Alert.alert('BB Anda Kurang !'),
          res: 'BB Anda Kurang !'
        })
      } else if (hasil >= 18.5 && hasil <= 24.9) {
        this.setState({
          result: Alert.alert('BB Anda Ideal !'),
          res: 'BB Anda Ideal !'
        })
      } else if (hasil >= 25.0 && hasil <= 29.9) {
        this.setState({
          result: Alert.alert('BB Anda Berlebih !'),
          res: 'BB Anda Berlebih !'
        })
      } else if (hasil >= 30.0 && hasil <= 39.9) {
        this.setState({
          result: Alert.alert('BB Anda Sangat Berlebih !'),
          res: 'BB Anda Sangat Berlebih !'
        })
      } else if (hasil > 39.9) {
        this.setState({
          result: Alert.alert(' Obesitas !! '),
          res: ' Obesitas !! '
        })
      }
      this.setState({
        submit: true
      })
    }

    return (
      <Container style={{ backgroundColor: 'lightblue', width: '100%' }}>
        <Header style={{ backgroundColor: 'blue' }}>
          <Text style={{ color: 'white', }}>INDEKS MASSA TUBUH</Text>
        </Header>
        <Content>
          <Form>
            <View style={{ flex: 1, flexDirection: 'row', }}>
              <Item floatingLabel style={{ width: 200 }}>
                <Label> Massa (Kg) </Label>
                <Input keyboardType="numeric" onChangeText={(x) => { this.setState({ massa: x }) }} />
              </Item>
              <Item floatingLabel style={{ width: 160 }}>
                <Label> Tinggi (cm) </Label>
                <Input keyboardType="numeric" onChangeText={(x) => { this.setState({ tinggi: x }) }} />
              </Item>
            </View>
          </Form>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Button block primary onPress={tap}><Text>HITUNG IMT</Text></Button>
          {this.state.submit &&
            <Body>
              <Text> Massa Tubuh: </Text>
              <Text style={{ fontWeight: 'bold' }}> {this.state.massa} </Text>
              <Text> Tinggi Badan: </Text>
              <Text style={{ fontWeight: 'bold' }}> {this.state.tinggi} Meter </Text>
              <Text> Indeks Massa Tubuh: </Text>
              <Text style={{ fontWeight: 'bold' }}> {this.state.imt} </Text>
              <Text> Diagnosa: </Text>
              <Text style={{ fontWeight: 'bold' }}> {this.state.res} </Text>
            </Body>
          }
        </Content>
        <Footer style={{ backgroundColor: 'lightblue' }}><Body><Text style={{ color: 'white' }}>Hidayat Turrahman</Text></Body></Footer>
      </Container>
    )
  }
}
export default App;
