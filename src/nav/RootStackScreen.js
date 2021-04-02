import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {MainScreen} from "../screens/MainScreen";
import {PostScreen} from "../screens/PostScreen";
import {Platform} from "react-native";
import {THEME} from "../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {HeaderIcon} from "../components/HeaderIcon";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {BookedScreen} from "../screens/BookedScreen";
import {Ionicons} from "@expo/vector-icons";


const Main = createStackNavigator()
const BottomTab = createBottomTabNavigator()
const Booked = createStackNavigator()
const Root = createStackNavigator()
const Post = createStackNavigator()


export const RootStackScreen = () => {

   const rootNavOptions = {
      headerStyle: {backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'},
      headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
   }

   const mainScreenOptions = {
      headerTitle: 'My blog',
      headerTitleStyle: {fontSize: 25},
      // иклнки в правой части header
      headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderIcon}>
             <Item title='Take Photo' iconName='ios-camera' onPress={() => console.log(' photo')}/>
          </HeaderButtons>
      ),
      headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderIcon}>
             <Item title='Toggle Drawer' iconName='ios-menu' onPress={() => console.log('Toggle Drawer')}/>
          </HeaderButtons>
      )
   }

   const MainStackNavigator = () => (
       <Main.Navigator screenOptions={rootNavOptions}>
          <Main.Screen name={'Main'} component={MainScreen} options={mainScreenOptions}/>
       </Main.Navigator>
   )
   const BookedStackNavigator = () => (
       <Booked.Navigator screenOptions={rootNavOptions}>
          <Booked.Screen name={'Booked'} component={BookedScreen} />
       </Booked.Navigator>
   )

   const postOptions = ({route}) => ({
      // динамически подставляем title в header/ iconName,
      // доставая его из route.params, не забыть передавать его в params!!!!
      title: 'Пост от ' + new Date(route.params.postDate).toLocaleDateString(),
      headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderIcon}>
             <Item title='Take Photo'
                   iconName={route.params.booked ? 'ios-star' : 'ios-star-outline'}
                   onPress={() => console.log(' photo')}/>
          </HeaderButtons>
      ),

   })
   const PostStackNavigator = () => (
       <Post.Navigator screenOptions={rootNavOptions}>
          <Post.Screen name={'Post'} component={PostScreen} options={postOptions} />
       </Post.Navigator>
   )
   const BottomTabNavigator = () => (
       <BottomTab.Navigator tabBarOptions={{activeTintColor:THEME.MAIN_COLOR}}>
          <BottomTab.Screen name={'MainStackNavigator'} component={MainStackNavigator}
                            options={{tabBarIcon:(info)=> <Ionicons name={'ios-albums'} size={25} color={info.color}/>}}/>
          <BottomTab.Screen name={'BookedStackNavigator'} component={BookedStackNavigator}
                            options={{tabBarIcon:(info)=> <Ionicons name={'ios-star'} size={25} color={info.color}/>}}/>
       </BottomTab.Navigator>
   )


   return (
      <Root.Navigator>
         <Root.Screen name={'BottomTabNavigator'} component={BottomTabNavigator} options={{headerShown: false}}/>
         <Root.Screen name={'PostStackNavigator'} component={PostStackNavigator} options={{headerShown: false}}/>
      </Root.Navigator>
   )
}
