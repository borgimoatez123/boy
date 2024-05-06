import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import {COLORS, SIZES} from '../constants/theme'
import HomeHeader from '../components/HomeHeader'
import TabViews from '../components/TabViews'
import RegistrationTile from '../components/RegistrationTile'
import { UserType } from '../context/UserType'
import { UserLocationContext } from '../context/UserLocationContext'


const Home = ({navigation}) => {
  const {userType, setUserType} = useContext(UserType)


  return (
      <SafeAreaView>
    <View style={{backgroundColor: COLORS.primary, height: SIZES.height}}>
    <View style={{backgroundColor: COLORS.offwhite, height: SIZES.height-140, borderBottomEndRadius: 30, borderBottomStartRadius: 30}}>
    <HomeHeader />
    
  
    

    <TabViews />
      </View>
    </View>
  </SafeAreaView>
  )
}

export default Home
