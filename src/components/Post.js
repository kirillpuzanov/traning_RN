import React from "react";
import {View, ImageBackground, StyleSheet, Text, TouchableOpacity} from "react-native";


export const Post = ({post,onOpen}) => {

   return (
       <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
       <View style={styles.wrap}>
          <ImageBackground style={styles.image} source={{uri: post.img}}>
             <View style={styles.textInner}>
                <Text style={styles.title}>{new Date(post.date).toLocaleDateString()}</Text>
             </View>
          </ImageBackground>
       </View>
       </TouchableOpacity>
   )
}


const styles = StyleSheet.create({
   wrap: {
      marginBottom: 15,
      overflow: 'hidden'
   },
   image: {
      width: '100%',
      height: 200,
   },
   textInner: {
      backgroundColor: 'rgba(0,0,0, .5)',
      paddingVertical:5,
      alignItems:'center',
      width: '100%',
   },
   title:{
      color:'#fff',
      fontFamily: 'OpenSansRegular'
   }
})


