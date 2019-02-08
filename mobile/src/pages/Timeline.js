
import React, { Component } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client'

export default class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Início',
    headerRight: (
      <TouchableOpacity onPress={() => {navigation.navigate('New')}}>
        <Icon style={{ marginRight: 20 }} name="add-circle-outline" size={24} color="#4BB0EE" />
      </TouchableOpacity>
    ),
  })

  state = {
    tweets: []
  }

  subscribeToEvents = () => {
    const io = socket('https://gotwapi.herokuapp.com/')
    io.on('tweet', data => {
        this.setState({ tweets: [data, ...this.state.tweets] })
    })
    io.on('like', data => {
        this.setState({ tweets: this.state.tweets.map(tweet => 
            tweet._id === data._id ? data : tweet
            ) })
    })
}

  async componentDidMount(){
    this.subscribeToEvents()
    const response = await api.get('tweets')
    this.setState({ tweets: response.data })
  }

  render() {
    return (
      <View style={styles.container}>
          <FlatList data={this.state.tweets} keyExtractor={(item, index) => item._id} renderItem={({item}) => <Tweet tweet={item}></Tweet>} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
