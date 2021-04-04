import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainScreen} from '../screens/MainScreen';
import {PostScreen} from '../screens/PostScreen';
import {Platform} from 'react-native';
import {THEME} from '../theme';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {HeaderIcon} from '../components/HeaderIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BookedScreen} from '../screens/BookedScreen';
import {Ionicons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AboutScreen} from '../screens/AboutScreen';
import {CreateScreen} from '../screens/CreateScreen';


const PLATFORM_ANDROID = Platform.OS === 'android'

// HEADER_LEFT переиспользуется в mainScreenOptions / AboutScreenOptions /CreateScreenOptions
const HEADER_LEFT = (navigation) => (
    <HeaderButtons HeaderButtonComponent={HeaderIcon}>
       <Item title='Toggle Drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()}/>
    </HeaderButtons>
)

const Main = createStackNavigator()
const BottomTab = PLATFORM_ANDROID ? createMaterialBottomTabNavigator() : createBottomTabNavigator()
const Booked = createStackNavigator()
const Root = createStackNavigator()
const Post = createStackNavigator()
const About = createStackNavigator()
const Create = createStackNavigator()
const Drawer = createDrawerNavigator()


export const RootStackScreen = () => {

   const rootNavOptions = {
      headerStyle: {backgroundColor: PLATFORM_ANDROID ? THEME.MAIN_COLOR : '#fff'},
      headerTintColor: PLATFORM_ANDROID ? '#fff' : THEME.MAIN_COLOR,
   }
// mainScreen
   const mainScreenOptions = ({navigation}) => ({
      headerTitle: 'My blog',
      headerTitleStyle: {fontSize: 22},
      // иконки в правой части header
      headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderIcon}>
             <Item title='Take Photo' iconName='create-outline' onPress={() => navigation.navigate('CreateStackNavigator')}/>
          </HeaderButtons>
      ),
      headerLeft: () => HEADER_LEFT(navigation)
   })

   const MainStackNavigator = () => (
       <Main.Navigator screenOptions={rootNavOptions}>
          <Main.Screen name={'Main'} component={MainScreen} options={mainScreenOptions}/>
       </Main.Navigator>
   )
 //BookedScreen
   const BookedStackNavigator = () => (
       <Booked.Navigator screenOptions={rootNavOptions}>
          <Booked.Screen name={'Booked'} component={BookedScreen}/>
       </Booked.Navigator>
   )

   // AboutScreen
   const AboutScreenOptions = ({navigation}) => ({
      title: 'О приложении',
      headerTitleStyle: {fontSize: 22},
      headerLeft: () => HEADER_LEFT(navigation)
   })

   const AboutStackNavigator = () => (
       <About.Navigator screenOptions={rootNavOptions}>
          <About.Screen name={'About'} component={AboutScreen} options={AboutScreenOptions}/>
       </About.Navigator>
   )

   // CreateScreen
   const CreateScreenOptions = ({navigation}) => ({
      title: 'Создать пост',
      headerTitleStyle: {fontSize: 22},
      headerLeft: () => HEADER_LEFT(navigation)
   })
   const CreateStackNavigator = () => (
       <Create.Navigator screenOptions={rootNavOptions}>
          <Create.Screen name={'Create'} component={CreateScreen} options={CreateScreenOptions}/>
       </Create.Navigator>
   )

   //postScreen

   const PostStackNavigator = () => (
       <Post.Navigator screenOptions={rootNavOptions}>
          {/*PostScreen.navigationOptions - возможность описывать options внутри компоненты +
           + передавать актуальные данные из стейта */}
          <Post.Screen name={'Post'} component={PostScreen} options={PostScreen.navigationOptions}/>
       </Post.Navigator>
   )

   // BottomTab
   const BottomTabNavigator = () => (
       <BottomTab.Navigator tabBarOptions={{activeTintColor: THEME.MAIN_COLOR}} shifting={PLATFORM_ANDROID && true}>
          <BottomTab.Screen name={'MainStackNavigator'} component={MainStackNavigator}
                            options={{
                               tabBarLabel: 'Все',
                               tabBarIcon: (info) => <Ionicons name={'ios-albums'} size={25} color={info.color}/>
                            }}/>
          <BottomTab.Screen name={'BookedStackNavigator'} component={BookedStackNavigator}
                            options={{
                               tabBarLabel: 'Избранное',
                               tabBarIcon: (info) => <Ionicons name={'ios-star'} size={25} color={info.color}/>

                            }}/>
       </BottomTab.Navigator>
   )

   // rootNavigator:  Main + BottomTab + Post
   const RootNavigator = () => (
       <Root.Navigator>
          <Root.Screen name={'BottomTabNavigator'} component={BottomTabNavigator} options={{headerShown: false}}/>
          <Root.Screen name={'PostStackNavigator'} component={PostStackNavigator} options={{headerShown: false}}/>
       </Root.Navigator>
   )


   return (
       //скрываем StatusBar при открытии Drawer -  hideStatusBar={true}
       <Drawer.Navigator drawerContentOptions={{activeTintColor:THEME.MAIN_COLOR}}>
          <Drawer.Screen name={'RootNavigator'} component={RootNavigator}  options={{title:'Главная'}}/>
          <Drawer.Screen name={'CreateStackNavigator'} component={CreateStackNavigator} options={{title:'Создать пост'}}/>
          <Drawer.Screen name={'AboutStackNavigator'} component={AboutStackNavigator} options={{title:'О приложении'}}/>
       </Drawer.Navigator>
   )
}
