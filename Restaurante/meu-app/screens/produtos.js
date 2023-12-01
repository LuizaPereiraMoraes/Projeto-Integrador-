import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'

const Produtos = ({ navigation, route }) => {
    const [produtos, setProdutos] = useState([])
    const [ParamsToken, setParamsToken] = useState('')

    useEffect(() => {
        buscarDadosProdutos()
    }, [])

    const buscarDadosProdutos = () => {
        axios.get(`http://192.168.42.232:8000/loja/produtos/`)
            .then((response) => {
                setProdutos(response.data)
            })
    }

    return (
        <>
            <View style={{ backgroundColor: '#ffffff', flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 70 }}>
                    <View>
                        <Text style={{ fontWeight: "500", fontSize: 35, display: "flex", marginBottom: 40, alignItems: "center", justifyContent: "center" }}>Produtos</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Carrinho', { token: ParamsToken })}>
                        <View style={{ bottom: 18, left: 50, marginTop: 30 }}>
                            <AntDesign name="shoppingcart" size={30} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {produtos.map((item) => {
                        return (
                            <>
                                <View key={item.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 200, height: 270, borderRadius: 50, marginBottom: 20, shadowColor: '#171717', shadowOffset: { width: 4, height: 10 }, shadowOpacity: 0.2, elevation: 7, backgroundColor: '#fff' }}>
                                    <TouchableOpacity onPress={() => { navigation.navigate('Detalhes', { id: item.id }), { token: ParamsToken } }}>
                                        <Image key={'f' + item.id} source={{ uri: item.foto }} style={{ width: 150, height: 150 }} />
                                        <Text style={{ fontWeight: "500", textAlign: "center", fontSize: 30 }} key={'n' + item.id}>{item.nome}</Text>
                                        <Text style={{ color: "#FF460A", fontWeight: "500", textAlign: "center", fontSize: 20 }} key={'p' + item.id}>R$: {item.preco}</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )
                    })}
                </ScrollView>
            </View>
        </>
    )
}

export default Produtos; 