import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { Constants } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container} >
          <ComponentFilms />
        </View>
      </ScrollView>
    );
  }
}

class ComponentFilms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shows: [], text: '' }
  }

  componentDidMount() {
    axios.get('http://api.tvmaze.com/search/shows?q=')
      .then((res) => {
        console.log(res.data)
        this.setState({ shows: res.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  search (input) {
    this.setState({text: input})
    axios.get(`http://api.tvmaze.com/search/shows?q=${input}`)
    .then((res) => {
      console.log(`${this.state.text} --- ${res.data}`)
      this.setState({ shows: res.data })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

          <TextInput
            style={{height: 40, width: 240, borderColor: 'black', borderWidth: 1, marginTop: 15, borderRadius: 5, textAlign: "center", alignSelf: "center"}}
            onChangeText={(text) => {
              this.search(text)
            }}
            value={this.state.text}
          />

        {
          this.state.shows.map(titre => {
            return (
              <View style={ styles.bloc } key={titre.show.id}>
                <Text style={{ fontWeight: 'bold'}}>{titre.show.name}</Text>
                <Text>{`score: ${titre.score}`}</Text>
                <Text>
                  {
                    titre.show.genres.map(genre => {
                      return genre+'  '
                    })
                  }
                </Text>
                { titre.show.image && titre.show.image.medium ? <Image source={{ uri: titre.show.image.medium}} style={{width: 50, height: 80}}/> : null }
              </View>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight
  },
  bloc: {
    margin: 10, 
    padding: 10, 
    backgroundColor: 'lightgray', 
    borderRadius: 5,
    alignItems: "center",
    flex: 1
  }
});
