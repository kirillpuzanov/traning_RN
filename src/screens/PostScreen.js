import React, {useCallback, useEffect} from 'react';
import {Alert, Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {THEME} from '../theme';
import {useDispatch, useSelector} from 'react-redux';
import {blogActions} from '../bll/blogReducer';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {HeaderIcon} from '../components/HeaderIcon';


export const PostScreen = ({navigation, route}) => {

   const dispatch = useDispatch()
   const postId = route.params.postId
   const allPost = useSelector(s => s.posts.allPosts)
   const post = allPost.find(el => el.id === postId)

   const toggleBooked = useCallback(() => {
      dispatch(blogActions.toggleBooked(postId))
   }, [postId])

   useEffect(() => {
      // отдаем функцию toggleBooked в параметры навигации, чтобы вызывать её из PostStackNavigator
      // также можно связать параметры стейта с навигацией, например: post.booked
      navigation.setOptions({
         title: 'Пост от ' + new Date(route.params.postDate).toLocaleDateString(),
         headerRight: () => (
             <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                <Item title='Take Photo'
                      iconName={post.booked ? 'ios-star' : 'ios-star-outline'}
                      onPress={toggleBooked}/>
             </HeaderButtons>
         )
      })
   }, [toggleBooked, post.booked])


   const onRemoveHandler = () => {
      return Alert.alert(
          'Удаление поста',
          'Вы точно хотите удалить пост?',
          [
             {
                text: 'Отменить',
                onPress: () => console.log('Отменить'),
                style: 'default'
             },
             {
                text: 'Удалить',
                onPress: () => console.log('Удалить'),
                style: 'destructive'
             }
          ]
      )
   }

   return (

       <ScrollView>
          {console.log('zsdsad')}
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
