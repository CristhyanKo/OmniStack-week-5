import React, { Component } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../services/api';


export default class New extends Component {
  static navigationOptions = () => ({
    header: null
  })

  state = {
    newTweet: ''
  }

  tweet = async () => {
    const content = this.state.newTweet
    const author = await AsyncStorage.getItem('@GoTwitter:username')

    await api.post('tweets', {author, content})
    this.props.navigation.pop() 
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
            <Icon name='close' size={24} color="#4BB0EE" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.tweet}>
            <Text style={styles.buttonText}>Tweetar</Text>
          </TouchableOpacity>
        </View>

        <TextInput style={styles.input} multiline placeholder="O que está acontecendo?" placeholderTextColor="#999" value={this.state.newTweet} onChangeText={(value) => this.setState({newTweet: value})} returnKeyType="send" onSubmitEditing={this.tweet} />

      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#4BB0EE",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: "#333"
  }
});
