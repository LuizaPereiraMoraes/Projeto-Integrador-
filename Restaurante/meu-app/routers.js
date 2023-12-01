import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons"

import Login from './screens/login';
import Cadastro from "./screens/cadastro";
import Produtos from "./screens/produtos";
import Detalhes from "./screens/produtosdetalhe";
import Carrinho from "./screens/carrinho";
import Pedidos from "./screens/pedido";

const Pilha = createStackNavigator()
const Nav = createBottomTabNavigator()

function NavBar(){
    return(
        <Nav.Navigator
            screenOptions={{
                tabBarStyle:{
                    backgroundColor: '#000',
                    borderTopColor: 'transparent',
                    paddingBottom: 1,
                    paddingTop: 1,
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#555',
            }}
        >

            <Nav.Screen name="Login" component={Login}
            options={{
                tabBarStyle: {display: 'none'},
                headerShown: false,
                tabBarIcon: ({size, color})=>(
                    <Feather name='user' size={size} color={color}/>
                )
            }}
            />           

            <Nav.Screen name="Cadastro" component={Cadastro}
            options={{
                tabBarStyle: {display: 'none'},
                headerShown: false,
                tabBarIcon: ({size, color})=>(
                    <Feather name='user-plus' size={size} color={color}/>
                )
            }}
            />

            <Nav.Screen name="Produtos" component={Produtos}
            options={{
                tabBarStyle: {display: 'none'},
                headerShown: false,
                tabBarIcon: ({size, color})=>(
                    <Feather name='home' size={size} color={color}/>
                )
            }}            
            />

            <Nav.Screen name="Detalhes" component={Detalhes}
            options={{
                tabBarStyle: {display: 'none'},
                headerShown: false,
                tabBarIcon: ({size, color})=>(
                    <Feather name='archive' size={size} color={color}/>
                )
            }}
            />
            
            <Nav.Screen name="Carrinho" component={Carrinho}
            options={{
                tabBarStyle: {display: 'none'},
                headerShown: false,
                tabBarIcon: ({size, color})=>(
                    <Feather name='shopping-cart' size={size} color={color}/>
                )
            }}            
            />
         
        </Nav.Navigator>
    )
}

export default function Routers() {
    return (
        <NavigationContainer>
            <Pilha.Navigator>    
                <Pilha.Screen
                    name="Navigation"
                    component={NavBar}
                    options={{ title: false, headerShown: false }}
                />
                
                <Pilha.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: true }}
                />

                <Pilha.Screen
                    name="Cadastro"
                    component={Cadastro}
                    options={{ headerShown: true }}
                />

                <Pilha.Screen
                    name="Produtos"
                    component={Produtos}
                    options={{ headerShown: false }}
                />

                <Pilha.Screen
                    name="Detalhes"
                    component={Detalhes}
                    options={{ headerShown: false }}
                />

                <Pilha.Screen
                    name="Carrinho"
                    component={Carrinho}
                    options={{ headerShown: false }}
                />

                <Pilha.Screen
                    name="Pedidos"
                    component={Pedidos}
                    options={{ headerShown: false }}
                />

                
                
               
            </Pilha.Navigator>
        </NavigationContainer>
    )
}