import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'

const Pedidos = ({ navigation, route }) => {
    const [pedidos, setPedidos] = useState([])
    const [ParamsToken, setParamsToken] = useState('')

    useEffect(() => {
        buscarDadosPedidos()
    }, [])

    const buscarDadosPedidos = () => {
        axios.get(`http://192.168.42.232:8000/loja/pedidos/`)
            .then((response) => {
                setPedidos(response.data)
            })
    }

    
    return (
        <>
            <View style={{ backgroundColor: '#ffffff', flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: 70 }}>
                    <View>
                        <Text style={{ fontWeight: "500", fontSize: 35, display: "flex", marginBottom: 40, alignItems: "center", justifyContent: "center" }}>Pedidos</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Produtos')}>
                        <View style={{ right: 60, marginTop: 8 }}>
                            <AntDesign name="close" size={35} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {pedidos.map((item) => {
                        return (
                            <>
                                <View key={item.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 300, height: 250, borderRadius: 50, marginBottom: 20, shadowColor: '#171717', shadowOffset: { width: 4, height: 10 }, shadowOpacity: 0.2, elevation: 7, backgroundColor: '#fff' }}>
                                    <TouchableOpacity>
                                        <Text style={{ fontWeight: "500", textAlign: "center", fontSize: 20 }} key={'n' + item.id}>User: {item.user}</Text>
                                        <Text style={{ fontWeight: "500", textAlign: "center", fontSize: 10 }} key={'n' + item.id}>Carrinho {item.carrinho}</Text>
                                        <Text style={{ fontWeight: "500", textAlign: "center", fontSize: 12 }} key={'n' + item.id}>Endereço: {item.endereco}</Text>
                                        <Text style={{ fontWeight: "500", textAlign: "center", fontSize: 12 }} key={'n' + item.id}>Número: {item.numero}</Text>
                                        <Text style={{ color: "#FF460A", fontWeight: "500", textAlign: "center", fontSize: 20 }} key={'p' + item.id}>R$: {item.valorTotal}</Text>
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

export default Pedidos; 