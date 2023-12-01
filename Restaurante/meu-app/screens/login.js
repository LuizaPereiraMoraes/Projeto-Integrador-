import React, { useState } from 'react'
import {View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({ navigation }){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    
    const btLogin = () => {
        axios.post('http://192.168.42.232:8000/auth/jwt/create', {
            email: email,
            password: senha
        }).then((response) => {
            console.log(response)
            AsyncStorage.setItem("refresh", response.data.refresh)
            AsyncStorage.setItem("access", response.data.access)
            limparInputs()
            navigation.navigate('Produtos')
            Alert.alert('Login Realizado',
            'Seu login foi realizado com sucesso!',)
        }).catch((error) => { 
            console.log(error)
            limparInputs()
            Alert.alert('Erro',
            'Email ou senha incorretos')
        })  
    }

    const limparInputs = () => {
        setEmail('')
        setSenha('')
    }

    return(
        <>
        <View style={{backgroundColor: '#fff', flex: 1, alignItems: "center", justifyContent: "center", marginTop: 20}}>
            <Image source= {require('../images/logo.png')} style={{width: 450, height: 100}}/>
            
            <Text style={{fontWeight: "500", fontSize: 28, alignItems: "flex-start", display: "flex", justifyContent: "flex-start", marginTop: 20}}>Olá, faça login na sua conta</Text>

            <View style={{display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center', width: '100%', height: '70%'}}>

                <View style={{borderRadius: 30, height: 50, marginBottom: 30, alignItems: "center"}}>
                    <TextInput style={{height: 50, flex: 1, padding: 10, shadowColor: "#000", backgroundColor: "#fff", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, width: 350, borderRadius: 30}} placeholder='E-mail' placeholderTextColor="#C8C8C8" value={email} onChangeText={(e)=>setEmail(e)}></TextInput>
                </View>

                <View style={{borderRadius: 30, height: 50, marginBottom: 50, alignItems: "center"}}>
                    <TextInput secureTextEntry={true} style={{height: 50, flex: 1, padding: 10, shadowColor: "#000", backgroundColor: "#fff", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, width: 350, borderRadius: 30}} placeholder='Senha' placeholderTextColor="#C8C8C8" value={senha} onChangeText={(p)=>setSenha(p)}></TextInput>
                </View>

                <View>
                    <TouchableOpacity style={{ shadowColor: '#171717', shadowColor: "#000", backgroundColor: "#fff", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, height: 40, width: 220, borderRadius: 30, alignItems: "center", justifyContent: "center" }} onPress={()=>btLogin(email, senha)}>
                        <Text style={{ color: "#FF460A", fontSize: 18, fontWeight: '500' }}>Logar</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={{fontSize: 16, width: 250, height: 30, margin: 8}}>Não tem uma conta? <Text style={{fontWeight: 'bold'}}>Cadastre-se</Text></Text>
                    </TouchableOpacity>              
                </View>

            </View>
        </View>
        </>
    )
}