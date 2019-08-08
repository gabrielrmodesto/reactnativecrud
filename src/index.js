import React, {Component}from 'react';
import { StyleSheet, View, Button, AsyncStorage, Alert } from 'react-native';
import api from './services/api';

export default class App extends Component{
	state = {
		usuarioLogado: null,
		errorMessage: null,
	};
	signIn = async () => {
		try {
			const response = await api.post('/login',{
				email: 'andre_4gama789@hotmail.com',
				senha: '123',
			});
			const { user,jwt } = response.data;
			await AsyncStorage.multiSet([
				['@CodeApi:token', jwt],
				['@CodeApi:user', JSON.stringify(user)],
			]);	
			this.setState({usuarioLogado: user});
			Alert.alert('Login realizado');
		} catch (response) {
			this.setState({errorMessage: response.data.error});
		}
	};
	render(){
		return (
			<View style={styles.container}>
				{this.setState.errorMessage && <Text>{ this.setState.errorMessage}</Text>}
				<Button onPrees={this.signIn} title="Entrar"/>
			</View>
    	);
	}
}

const styles = StyleSheet.create({
	container: {
    	flex: 1,
    	backgroundColor: '#fff',
    	alignItems: 'center',
    	justifyContent: 'center',
  	},
});
