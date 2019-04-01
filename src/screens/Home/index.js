import React from 'react';
import { StyleSheet, Platform, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler'; 

export default class ComponentFilms extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shows: [], text: '' }
  }

  componentDidMount() {
    
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
      <ScrollView style={styles.container}>
          <View style={{ flex: 1 }}>
              <TextInput
                style={{height: 40, width: 240, borderColor: 'black', borderWidth: 1, marginTop: 15, borderRadius: 5, textAlign: "center", alignSelf: "center"}}
                onChangeText={(text) => {
                  this.search(text)
                }}
                value={this.state.text}
              />

            {
              this.state.shows.map(value => {
                return (
                  <TouchableOpacity onPress={() => {
                    console.log(this.store)
                    this.props.navigation.navigate('Show', { data: value })
                  }}>
                    <View style={ styles.bloc } key={value.show.id}>
                      <Text style={{ fontWeight: 'bold'}}>{value.show.name}</Text>
                      <Text>{`score: ${value.score}`}</Text>
                      <Text>
                        {
                          value.show.genres.map(genre => {
                            return genre+'  '
                          })
                        }
                      </Text>
                      { value.show.image && value.show.image.medium ? <Image source={{ uri: value.show.image.medium}} style={{width: 50, height: 80}}/> : null }
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
      </ScrollView>
    ) 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Expo.Constants.statusBarHeight
  },
  bloc: {
    paddingTop: Expo.Constants.statusBarHeight,
    margin: 10, 
    padding: 10, 
    backgroundColor: 'lightgray', 
    borderRadius: 5,
    alignItems: "center",
    flex: 1
  }
});