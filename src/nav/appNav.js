import React from 'react';
import {RootStackScreen} from "./RootStackScreen";
import AppLoading from "expo-app-loading";
import {useFonts} from "expo-font";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";


export const AppNavigation = () => {

   let [fontsLoaded] = useFonts({
      OpenSansBold: require('../../assets/fonts/OpenSans-Bold.ttf'),
      OpenSansRegular: require('../../assets/fonts/OpenSans-Regular.ttf')
   })

   if (!fontsLoaded) {
      return <AppLoading/>
   } else {
      return (
          <NavigationContainer theme={{...DefaultTheme, dark: false}}>
             <RootStackScreen/>
          </NavigationContainer>
      )
   }
}

