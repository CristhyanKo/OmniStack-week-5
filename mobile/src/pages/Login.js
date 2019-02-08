import React, { Component } from 'react';
import { KeyboardAvoidingView, TextInput, TouchableOpacity, View, StyleSheet, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Login extends Component {
    state = {
        username: ''
    }

    login = async () => {
        const { username } = this.state

        if (!username.length) return
        await AsyncStorage.setItem('@GoTwitter:username', username)

        this.props.navigation.navigate('Timeline')
    }

    async componentDidMount() {
        const username = await AsyncStorage.getItem('@GoTwitter:username')
        if (username.length) {
            this.props.navigation.navigate('Timeline')
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.content}>
                    <Icon name="twitter" size={64} color="#4BB0EE" />

                    <TextInput value={this.state.username} onChangeText={(value) => { this.setState({ username: value }) }} style={styles.input} placeholder="Nome de usuário" returnKeyType="send" onSubmitEditing={this.login} />
                    <TouchableOpacity onPress={this.login} style={styles.button}>
                        <Text style={styles.buttonText} >Entrar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30
    },

    input: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        height: 44,
        paddingHorizontal: 15,
        alignSelf: "stretch",
        marginTop: 30
    },

    button: {
        height: 44,
        alignSelf: "stretch",
        marginTop: 10,
        backgroundColor: "#4BB0EE",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    }
});