import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { findNodeHandle, Linking, StyleSheet, Text, View, Dimensions, FlatList, Animated, Image, TouchableOpacity } from 'react-native'
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
  ref: React.createRef()
}));

const Tab = React.forwardRef(({ item,onItemPress }, ref) => {
  return <TouchableOpacity onPress={onItemPress}>
  <View ref={ref}>
    <Text style={{ color: 'rgb(50,50,50)', textTransform: 'capitalize', fontSize: 84 / data.length, fontWeight: 'bold' }}>{item.title}</Text>
  </View>
  </TouchableOpacity>
})

const Indicator = ({measures,scrollX}) => {

  const inputRange = data.map((_, i)=>i*width);
  const IndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange:measures.map(measure=>measure.width+15)
  })
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange:measures.map(measure=>measure.x)
  })

  return <Animated.View
    style={{
      position: 'absolute',
      height: 4,
      width: IndicatorWidth,
      left:0,
      backgroundColor: 'blue',
      bottom: -10,
      transform:[{
        translateX
      }]
    }}
  />
}

const Tabs = ({ data, scrollX,onItemPress}) => {

  const [measures, setMeasures] = React.useState([])

  const containerRef = React.useRef()

  React.useEffect(() => {
    let m = []
    data.forEach(item => {
      item.ref.current.measureLayout(containerRef.current, (x, y, width, height) => {
        m.push({ x, y, width, height });
        if(m.length === data.length){
          setMeasures(m)
        }
      })
    })
  },[])



  return <View style={{ position: 'absolute', top: 15, width }}>
    <View
      ref={containerRef}
      style={{ justifyContent: "space-evenly", flex: 1, flexDirection: 'row' }}>
      {
        data.map((item,index )=> {
          return <Tab key={item.key} item={item} ref={item.ref} onItemPress={()=>onItemPress(index)} />
        })
      }
    </View>
  {measures.length > 0 &&  <Indicator measures={measures} scrollX={scrollX} />}
  </View>
}


const { width, height } = Dimensions.get('screen')


export default function Screen({ route, navigation }) {

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onItemPress = React.useCallback(itemIndex => {
      ref?.current?.scrollToOffset({
        offset:itemIndex*width
      })
  })

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

        <Animated.FlatList
          style={{ marginTop: 40 }}
          ref={ref}
          data={data}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          showsHorizontalScrollIndicator={true}
          renderItem={({ item }) => {
            return <View style={{ width: width - 20, height: height - 280 }}>
              <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)' }]} />
              <Image source={{ uri: item.image }} style={{ flex: 1, resizeMode: 'cover' }} />
            </View>
          }}
        />
        <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress}/>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 0,
  },
});






