import React from "react";
import {FlatList, StyleSheet, View} from 'react-native';
import {DATA} from "../data";
import {Post} from "../components/Post";


export const MainScreen = ({navigation}) => {

   const openPostHandler = post => {
      navigation.navigate('PostStackNavigator', {screen:'Post', params: {postId: post.id, postDate: post.date, booked: post.booked}})
   }

   return (
       <View style={styles.wrap}>
          <FlatList data={DATA}
                    keyExtractor={post => post.id.toString()}
                    renderItem={({item}) => <Post post={item} onOpen={openPostHandler}/>}/>
       </View>
   )
}


const styles = StyleSheet.create({
   wrap: {
      flex: 1,
      padding: 20,
   }
})
