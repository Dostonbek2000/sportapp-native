import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon, { Icons } from '../components/Icons';
import Screen from '../screens/Screen';
import Colors from '../constants/Colors';
import Like from '../screens/Like';

const Tab = createMaterialBottomTabNavigator();


const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: Screen, tabBarColor: Colors.primary },
  { route: 'Search', label: 'Search', type: Icons.Feather, icon: 'search', component: Screen, tabBarColor: Colors.green },
  { route: 'Like', label: 'Like', type: Icons.Feather, icon: 'heart', component: Screen, tabBarColor: Colors.yellow },
  { route: 'Account', label: 'Account', type: Icons.FontAwesome, icon: 'user-circle-o', component: Screen, tabBarColor: Colors.purple },
];

export default function Tab4() {
  return (
    <>

      <Tab.Navigator 
    
      barStyle={{
        backgroundColor:'white'
      }}
     screenOptions={{
       backgroundColor:'red',
       tabBarColor:'red',
      tabBarStyle: { position: 'absolute' ,backgroundColor:'red'},
    }}
      >
        <Tab.Screen name={'Home'} component={Screen}
          options={{
            tabBarColor: 'white',
            tabBarIcon: ({ color, size }) => (
              <Icon name={'home'} type={Icons.Feather} size={size} color={color} />
            )
          }}
        />
        <Tab.Screen name={'Favourite'} component={Like}
          options={{
            tabBarColor: 'white',
            tabBarIcon: ({ color, size }) => (
              <Icon name={'heart'} type={Icons.Feather} size={size} color={color} />
            )
          }}
        />

      </Tab.Navigator>

    </>
  );
}

const styles = StyleSheet.create({})
