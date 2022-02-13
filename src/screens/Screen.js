import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Linking, StyleSheet, Text, View,Dimensions,FlatList,Animated } from 'react-native'
import Styles from '../common/Styles';
import Colors from '../constants/Colors';
import MyHeader from '../components/MyHeader';
import { Button } from 'react-native-paper';


const images = {
  man:
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids:
    'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
}));

const {width, height} = Dimensions.get('screen')


export default function Screen({ route, navigation }) {
  return (
    <View style={Styles.container} >
      <MyHeader
        style={{ marginLeft: -20 }}
        //back
        onPressBack={() => navigation.goBack()}
        title='Sport App'
        right="more-vertical"
        onRightPress={() => console.log('right')}
      />
      <View style={styles.container}>
       
     
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10
  },
});




