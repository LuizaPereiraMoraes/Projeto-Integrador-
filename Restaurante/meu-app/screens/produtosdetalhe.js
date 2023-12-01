import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { AntDesign, Entypo} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Detalhes = ({ navigation, route }) => {
    const [token, setToken] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
 
    const adicionarProduto = (produto)=> {
        const novoCarrinho = [...carrinho, produto];
        Alert.alert(
            'Produto adicionado no carrinho',
            'Obrigado por sua compra!',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
        setCarrinho(novoCarrinho);
        salvarCarrinho(novoCarrinho);
    }
 
    const salvarCarrinho = (novoCarrinho) => {
        AsyncStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    }

    useEffect(() => {
        console.log(carrinho);
    }, [carrinho])
 
    useEffect(() => {
        AsyncStorage.getItem("access").then((resposta) => setToken(resposta));
        AsyncStorage.getItem("carrinho").then(resposta => setCarrinho(JSON.parse(resposta)))
        buscarDadosProdutos();
    }, [route.params])


    const buscarDadosProdutos = () => {
        axios.get(`http://192.168.42.232:8000/loja/produtos/${route.params["id"]}`).then((response) => {
            setProdutos(response.data);
        })
    }

    const mostrarProdutos = () => {
        if (produtos) {
            return (
                <>
                    <View>
                        <View style={{ display: "flex", alignContent: "center", alignItems: "center" }}>
                            <Text style={{ fontWeight: "500", textAlign: "center", fontSize: 30, margin: 2 }} key={'n' + produtos.id}>{produtos.nome}</Text>
                            <Image key={'f' + produtos.id} source={{ uri: produtos.foto }} style={{ width: 250, height: 250, marginTop: 18 }} />
                        </View>
                        <View style={{ display: 'flex' }}>

                            <Text style={{ fontWeight: "600", color: "#5E5B5E", fontSize: 22 }}>Preço</Text>
                            <Text style={{ fontWeight: "500" }} key={'p' + produtos.id}>R$: {produtos.preco}</Text>
                        </View>


                        <View style={{ marginTop: 5 }}>
                            <Text style={{ fontWeight: "600", fontSize: 20 }}>Descrição</Text>
                            <Text style={{ fontWeight: "400", fontSize: 18 }} key={'d' + produtos.id}>{produtos.descricao}</Text>
                        </View>

                        <View style={{ display: "flex", alignContent: "center", alignItems: "center", marginTop: 25 }}>
                            <TouchableOpacity onPress={() => adicionarProduto(produtos)} style={{ shadowColor: '#171717', shadowColor: "#000", backgroundColor: "#fff", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, height: 40, width: 220, borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: "#FF460A", fontSize: 18, fontWeight: '500' }}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            );
        } else {
            return null;
        }
    };
    
    return (
        <>
            <View style={{ backgroundColor: '#ffffff', flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Produtos')}>
                        <View style={{ bottom: 15, right: 40, marginTop: 30 }}>
                            <Entypo name="chevron-thin-left" size={25} color="black" />
                        </View>
                    </TouchableOpacity>

                    <View>
                        <Text style={{ fontWeight: "500", fontSize: 35, display: "flex", marginBottom: 40, alignItems: "center", justifyContent: "center" }}>Detalhes</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
                        <View style={{ bottom: 18, left: 50, marginTop: 30 }}>
                            <AntDesign name="shoppingcart" size={30} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 6 }}>
                    {mostrarProdutos()}
                </View>
            </View>
        </>
    );
};

export default Detalhes;  