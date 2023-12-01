import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

export default function Cadastro({ navigation }) {
    const [cpf, setCpf] = useState()
    const [nome, setNome] = useState()
    const [telefone, setTelefone] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [cep, setCep] = useState()
    const [enderecoCompleto, setEnderecoCompleto] = useState({})
    const [endereco, setEndereco] = useState()
    const [numero, setNumero] = useState()
    const [imagem, setImagem] = useState()
    const [preview, setPreview] = useState()
   
    const digitouCEP = (cep) => {
        setCep(cep)
        if (cep.length === 8){
            buscarCep(cep);
        }
    }

    const buscarCep = (cep) => {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => {
            setEndereco(res.data.logradouro + ' - ' +  res.data.localidade)
            setEnderecoCompleto(res.data)
        })
    }

    const limparInputs = () => {
        setCpf('')
        setNome('')
        setTelefone('')
        setEmail('')
        setSenha('')
        setCep('')
        setEnderecoCompleto('')
        setEndereco('')
        setNumero('')
        setImagem('')
        setPreview('')
    }
    
    const galeria= async () =>{
        let result = ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if(!(await result).canceled){
            setPreview((await result).assets[0].uri)
            setImagem(";base64," + await FileSystem.readAsStringAsync((await result).assets[0].uri, { encoding: 'base64' }))
        }
    }
    
    const camera= async () =>{
        let result = ImagePicker.launchCameraAsync({
            allowsEditing: true,
        })

        if(!(await result).canceled){
            setPreview((await result).assets[0].uri)
            setImagem(";base64," + await FileSystem.readAsStringAsync((await result).assets[0].uri, { encoding: 'base64' }))
        }
    }
    
    const escolherFoto = () => {
        Alert.alert(
            'SELECIONAR',
            'Selecione',
            [
                {
                    text: 'Galeria',
                    onPress: () => galeria()
                },
                {
                    text: 'Camera',
                    onPress: () => camera()
                }
            ]
        )
    }

   const criarUsuario = () => {
        axios.post("http://192.168.42.232:8000/auth/users/", {
            email: email,
            password: senha
        }).then(res => {
            console.log(res)
            criarToken()
        }).catch(err => {
            console.log(err)
        })
    }

   const criarToken = () => {
        axios.post("http://192.168.42.232:8000/auth/jwt/create/", {
            email: email,
            password: senha
        }).then(async res => {
            console.log(res.data.access)
            criarCliente(res.data.access)
            criarEndereco(res.data.access)
            limparInputs()
            navigation.navigate('Login')
        }).catch(err => {
            console.log(err)
        })
    }

   const criarCliente = (token) =>{
        axios.post("http://192.168.42.232:8000/loja/clientes/", {
            foto: imagem,
            nome_completo: nome,
            cpf: cpf,
            telefone: telefone
        },{
            headers:{Authorization: "JWT " + token}
        }).then(res => {
            console.log(res)
            alert('Cadastro realizado com sucesso')
        }).catch(err => {
            console.log(err)
        })
    }

   const criarEndereco = (token) =>{
        axios.post('http://192.168.42.232:8000/loja/enderecos/', {
            logradouro: enderecoCompleto.logradouro,
            bairro: enderecoCompleto.bairro,
            cidade: enderecoCompleto.localidade,
            numero: numero,
            uf: enderecoCompleto.uf,
            cep: cep
        },{headers:{Authorization: "JWT " + token}
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
    }
 
    const upload = () => {
        if(!preview) {
            alert("Escolha uma foto")
        } else {
            criarUsuario()
        }
    }

    return (
        <>
            <View style={{ backgroundColor: '#fff', flex: 1, alignItems: "center", justifyContent: "center", marginTop: 0 }}>
                <Image source={require('../images/logo.png')} style={{ width: 450, height: 100 }} />

                <Text style={{ fontWeight: "500", fontSize: 28, alignItems: "flex-start", display: "flex", justifyContent: "flex-start" }}>Crie sua conta</Text>

                <ScrollView style={{ display: 'flex', overflow: 'scroll', maxHeight: '60%', minWidth: '100%' }}>
                    <View style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center', width: '100%', height: '90%' }}>
                        <TouchableOpacity onPress={escolherFoto}>
                            <View style={{ marginTop: 70, marginBottom: 30 }}>
                                <Image src={preview} style={{ width: 150, height: 150, borderRadius: 100, backgroundColor: '#888', alignItems: 'center', justifyContent: 'center' }} />
                            </View>
                        </TouchableOpacity>

                        <View style={{borderRadius: 30, height: 50, marginBottom: 30, alignItems: "center"}}>
                            <TextInput style={{height: 50, flex: 1, padding: 10, shadowColor: "#171717", backgroundColor: "#fff", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, width: 330, borderRadius: 30}} placeholder='Cpf' placeholderTextColor="#C8C8C8" keyboardType={'numeric'} maxLength={11} value={cpf} onChangeText={(e) => { setCpf(e) }} />
                        </View>

                        <View style={{borderRadius: 30, height: 50, marginBottom: 30, alignItems: "center"}}>
                            <TextInput style={{height: 50, flex: 1, padding: 10, shadowColor: "#171717", backgroundColor: "#fff", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, width: 330, borderRadius: 30}} placeholder='Nome Completo' placeholderTextColor="#C8C8C8" value={nome} onChangeText={(e) => { setNome(e) }} />
                        </View>

                        <View style={{borderRadius: 30, height: 50, marginBottom: 30, alignItems: "center"}}>
                            <TextInput style={{height: 50, flex: 1, padding: 10, shadowColor: "#171717", backgroundColor: "#fff", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, width: 330, borderRadius: 30}} placeholder='Celular' placeholderTextColor="#C8C8C8" keyboardType={'numeric'} maxLength={11} value={telefone} onChangeText={(e) => { setTelefone(e) }} />
                        </View>

                        <View style={{borderRadius: 30, height: 50, marginBottom: 30, alignItems: "center"}}>
                            <TextInput style={{height: 50, flex: 1, padding: 10, shadowColor: "#171717", backgroundColor: "#fff", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, width: 330, borderRadius: 30}} placeholder='E-mail' placeholderTextColor="#C8C8C8" value={email} onChangeText={(e) => { setEmail(e) }} />
                        </View>

                        <View style={{borderRadius: 30, height: 50, marginBottom: 30, alignItems: "center"}}>
                            <TextInput style={{height: 50, flex: 1, padding: 10, shadowColor: "#171717", backgroundColor: "#fff", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, width: 330, borderRadius: 30}} secureTextEntry={true} placeholder='Senha' placeholderTextColor="#C8C8C8" value={senha} onChangeText={(e) => { setSenha(e) }} />
                        </View>

                        <View style={{borderRadius: 30, height: 50, marginBottom: 30, alignItems: "center"}}>
                            <TextInput style={{height: 50, flex: 1, padding: 10, shadowColor: "#171717", backgroundColor: "#fff", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, width: 330, borderRadius: 30}} placeholder='Cep' placeholderTextColor="#C8C8C8" keyboardType={'numeric'} maxLength={8} value={cep} onChangeText={(e) => { digitouCEP(e) }} />
                        </View>

                        <View style={{borderRadius: 30, height: 50, marginBottom: 30, alignItems: "center"}}>
                            <TextInput style={{height: 50, flex: 1, padding: 10, shadowColor: "#171717", backgroundColor: "#fff", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, width: 330, borderRadius: 30}} placeholder='Endereço' placeholderTextColor="#C8C8C8" value={endereco} onChangeText={(e) => { setEndereco(e) }} />
                        </View>

                        <View style={{borderRadius: 30, height: 50, marginBottom: 30, alignItems: "center"}}>
                            <TextInput style={{height: 50, flex: 1, padding: 10, shadowColor: "#171717", backgroundColor: "#fff", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, width: 330, borderRadius: 30}} placeholder='Número' placeholderTextColor="#C8C8C8" keyboardType={'numeric'} maxLength={4} value={numero} onChangeText={(e) => { setNumero(e) }} />
                        </View>

                        <Text style={{ fontSize: 12 }}>Ou crie usando suas redes sociais</Text>
                        <TouchableOpacity>
                            <View style={{ display: 'flex', flexDirection: 'row', width: 150, height: 50, justifyContent: 'space-between', marginTop: 10}}>
                                <Image style={{ marginBottom: 40, width: 35, height: 35, }} source={require("../images/facebook.png")} />
                                <Image style={{ marginBottom: 40, width: 35, height: 35 }} source={require("../images/twitter.png")} />
                                <Image style={{ marginBottom: 40, width: 35, height: 35 }} source={require("../images/google.png")} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View>
                    <TouchableOpacity style={{ shadowColor: '#171717', shadowColor: "#000", backgroundColor: "#fff", shadowOffset: {width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, height: 40, width: 220, borderRadius: 30, alignItems: "center", justifyContent: "center" }} onPress={upload}>
                        <Text style={{ color: "#FF460A", fontSize: 18, fontWeight: '500' }}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    )
}