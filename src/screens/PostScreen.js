import React from "react";
import {Alert, Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {DATA} from "../data";
import {THEME} from "../theme";


export const PostScreen = ({ route}) => {

   const postId = route.params.postId
   const post = DATA.find(el => el.id === postId)

   const onRemoveHandler = () =>
       Alert.alert(
           "Удаление поста",
           "Вы точно хотите удалить пост?",
           [
              {
                 text: "Отменить",
                 onPress: () => console.log("Отменить"),
                 style: "default"
              },
              {
                 text: "Удалить",
                 onPress: () => console.log("Удалить"),
                 style: 'destructive'
              }
           ]
       );


   return (
       <ScrollView>
          <Image style={styles.img} source={{uri: post.img}}/>
          <View style={styles.wrap}>
             <Text style={styles.title}>{post.text}</Text>
          </View>
          <Button title={'Удалить'} onPress={onRemoveHandler} color={THEME.DANGER_COLOR}/>
       </ScrollView>
   )
}

const styles = StyleSheet.create({
   img: {
      width: '100%',
      height: 200
   },
   wrap: {
      padding: 10
   },
   title: {
      fontFamily: 'OpenSansRegular'
   }

})
