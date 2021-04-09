import React from "react";
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Post} from "./Post";
import {useSelector} from "react-redux";


export const PostCollection = ({navigation, main}) => {

   const allPosts = useSelector((state) => state.posts.allPosts)
   const bookedPosts = useSelector((state) => state.posts.bookedPosts)

   const openPostHandler = post => {
      navigation.navigate('PostStackNavigator', {
         screen: 'Post',
         params: {postId: post.id, postDate: post.date, booked: post.booked}
      })
   }

   const data = main ? allPosts : bookedPosts
   if(!data) return<View><Text> Список пуст ... </Text></View>
   return (
       <View style={styles.wrap}>
          <FlatList data={data}
                    keyExtractor={post => post.id.toString()}
                    renderItem={({item}) => <Post post={item} onOpen={openPostHandler}/>}
          />
       </View>
   )
}


const styles = StyleSheet.create({
   wrap: {
      flex: 1,
      padding: 20,
   }
})
