import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { CheckBox } from "react-native-elements";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRoute } from "@react-navigation/native";

const Carrinho = ({ navigation }) => {
    var vt = 0.00
    const router = useRoute();
    const [globalChecked, setGlobalChecked] = useState(false);
    const [endereco, setEndereco] = useState("");
    const [user, setUser] = useState("");
    const [numero, setNumero] = useState([]);
    const [token, setToken] = useState("");
    const [carrinho, setCarrinho] = useState([]);
   
    useEffect(() => {
        const obterCarrinho = async () => {
            try {
                const dados = await AsyncStorage.getItem("carrinho");
               
                if (dados != null) {
                    const listaAuxiliar = JSON.parse(dados);
                    setCarrinho(listaAuxiliar);
                }
            }
            catch (error) {
                console.log("deu ruim");
                console.log(error);
            }
        }
 
        obterCarrinho();
    }, []);
 
    useEffect(() => {
        console.log("aqui é o carrinho");
        console.log(carrinho);
    }, [carrinho])

    const removerProduto = (nomeProduto) => {
        listaAuxiliar = []
        carrinho.forEach(item =>{
            if (nomeProduto != item.nome){
                listaAuxiliar.push(item)
            }
            })
        setCarrinho(listaAuxiliar);
        salvarCarrinho(listaAuxiliar);
    }

    const salvarCarrinho = (novoCarrinho) => {
        AsyncStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    }

    const handleGlobalCheck = () => {
        setGlobalChecked(!globalChecked);
    }

    useEffect(() => {
        AsyncStorage.getItem("access").then((resposta) => setToken(resposta));
        AsyncStorage.getItem("carrinho").then(resposta => setCarrinho(JSON.parse(resposta)))
    }, [router]);

    useEffect(() => {
        buscarDados();
    }, [token]);

    const buscarDadosEndereco = (id) => {
        axios.get(`http://192.168.42.232:8000/loja/enderecos/${id}`, {
            headers: {
                Authorization: 'JWT ' + token
            }
        }).then((response) => {
            setEndereco(response.data.logradouro + ', ' + response.data.bairro);
            setNumero(response.data.numero);
        }).catch((res) => {
            alert(JSON.stringify(res.response.data));
        });
    }

    const buscarDados = () => {
        axios.get('http://192.168.42.232:8000/auth/users/me/', {
            headers: {
                Authorization: 'JWT ' + token
            }
        }).then((response) => {
            buscarDadosEndereco(response.data.id);
            setUser(response.data.id)
        });
    }

    const comprar = () =>{
        Alert.alert(
            'Compra realizada com sucesso',
            'Obrigado por sua compra!',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );

        axios.post(`http://192.168.42.232:8000/loja/pedidos/`, {
            carrinho: JSON.stringify(carrinho),
            user: user,
            endereco: endereco,
            numero: numero,
            valorTotal: vt,
        })
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
    
        AsyncStorage.setItem("carrinho", "[]")
        navigation.navigate('Pedidos')
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: 150 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: -100 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Produtos')}>
                    <View style={{ right: 60, marginTop: 8 }}>
                        <AntDesign name="close" size={35} color="black" />
                    </View>
                </TouchableOpacity>
                <Text style={{ fontWeight: "500", fontSize: 35, display: "flex", marginBottom: 40, alignItems: "center", justifyContent: "center" }}>Carrinho</Text>

                <View style={{ bottom: 18, left: 50, marginTop: 30 }}>
                    <AntDesign name="shoppingcart" size={30} color="black" />
                </View>
            </View>

            <View>
            <ScrollView>
            {carrinho.map((item, index) => {
                vt = parseFloat(vt) + parseFloat(item.preco)
           return(
                <View key={'f' + item.id}>
                    <View style={{display: "flex", flexDirection: "row"}}>
                        <Image source={{ uri: item.foto }} style={{ width: 50, height: 50, marginTop: 18, marginRight: 10 }} />
                        <Text style={{ fontWeight: "500", textAlign: "center", fontSize: 18, marginTop: 30 }}>{item.nome}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    
                        <Text style={{ color: "#c8c8c8", fontWeight: "900", textAlign: "center" }}>R$ {item.preco}</Text>

                        <TouchableOpacity key={index} onPress={() => removerProduto(item.nome)} style={{ backgroundColor: "#F9F8F6", width: 30, height: 30, borderRadius: 15, justifyContent: "center", alignItems: "center", marginHorizontal: 10 }}>
                            <Text style={{ color: "#FF460A", fontSize: 18, fontWeight: '500' }}>X</Text>
                        </TouchableOpacity>


                    </View>
                </View>
             )})}
            </ScrollView>
            
                <Text style={{ color: '#FF460A', fontWeight: '500', fontSize: 20, marginTop: 30 }}>
                    Valor Total: R$ {parseFloat(vt+10).toFixed(2)}
                </Text>

                <View>
                    <Text style={{ color: "#FF460A", fontWeight: "500", fontSize: 20, marginTop: 30 }}>Formas de Entrega</Text>
                    <Text style={{ fontWeight: "500", fontSize: 14, marginTop: 30 }}>Prestamos serviços apenas por entrega.</Text>
                    <Text style={{ fontWeight: "500", fontSize: 14, marginTop: 30 }}>Com um frete fixo de R$ 10,00</Text>
                </View>

                <View>
                    <Text style={{ color: "#FF460A", fontWeight: "500", fontSize: 20, marginTop: 30 }}>Endereço de Entrega</Text>
                    <Text style={{ fontWeight: "400", fontSize: 18 }}>{endereco}, Nº - {numero}</Text>
                </View>

                <View>
                    <Text style={{ color: "#FF460A", fontWeight: "500", fontSize: 20, marginTop: 30 }}>Pagamento</Text>
                    <CheckBox
                        title="Cartão de Crédito"
                        checked={globalChecked}
                        onPress={handleGlobalCheck}
                    />
                    <View style={{ display: "flex", alignContent: "center", alignItems: "center" }}>
                        <TouchableOpacity style={{ shadowColor: '#171717', shadowColor: "#000", backgroundColor: "#fff", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4, height: 40, width: 220, borderRadius: 30, alignItems: "center", justifyContent: "center", marginTop: 10 }} onPress={() => comprar()}>
                            <Text style={{ color: "#FF460A", fontSize: 18, fontWeight: '500' }}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Carrinho;