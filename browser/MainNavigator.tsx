import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IngresarPuntajeScreen from "../Screens/IngresarPuntajeScreen";
import ConsultarPuntajeScreen from "../Screens/ConsultarPuntajeScreen";
import LoginScreen from "../Screens/LoginScreen";
import VerPuntajeScreen from "../Screens/VerPuntajeScreen";


const Stack = createStackNavigator();
const Top = createMaterialTopTabNavigator();

function MyStack(){
    return <Stack.Navigator
    screenOptions={{
        animation: "scale_from_center",
        headerStyle: { backgroundColor: 'rgb(255, 71, 71)' },
        headerTintColor: 'white', 
        headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
        headerShown: true, 
    }}>
        <Stack.Screen name= "Home" component={HomeScreen}/>
        <Stack.Screen name= "Login" component={LoginScreen}/>
        <Stack.Screen name= "Top" component={MyTop}/>
    </Stack.Navigator>
}

function MyTop(){
    return <Top.Navigator
    screenOptions={{
        tabBarStyle: { backgroundColor: 'black' },  
        tabBarIndicatorStyle: { backgroundColor: 'red', height: 4 }, 
        tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: 'gray',
      }}>
        
        <Top.Screen name= "Ingresar" component={IngresarPuntajeScreen}/>
        <Top.Screen name= "Consultar" component={ConsultarPuntajeScreen}/>
        <Top.Screen name= "ListaVideoGames" component={VerPuntajeScreen}/>
    </Top.Navigator>
}

export default function MainNavigator(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}