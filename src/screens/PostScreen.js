import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {THEME} from '../theme';
import {useDispatch, useSelector} from 'react-redux';
import {blogActions} from '../bll/blogReducer';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {HeaderIcon} from '../components/HeaderIcon';


export const PostScreen = ({navigation, route}) => {

   const dispatch = useDispatch()
   const postId = route.params.postId
   const post = useSelector(s => s.posts.allPosts.find(el => el.id === postId))
   const booked = useSelector(s => s.posts.bookedPosts.some(el => el.id === postId))
   const [editMode, setEditMode] = useState(false)
   const [newText, setNewText] = useState('')

   const saveNewPostText = () => {
      dispatch(blogActions.updatePostText(newText, postId))
      setEditMode(false)
   }

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
                <Item title="Take Photo"
                      iconName={booked ? 'ios-star' : 'ios-star-outline'}
                      onPress={toggleBooked}/>
             </HeaderButtons>
         )
      })
   }, [toggleBooked, booked])

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
                onPress: () => {
                   navigation.navigate('Main')
                   dispatch(blogActions.removePost(postId))
                },
                style: 'destructive'
             }
          ],
          {cancelable: false}
      )
   }
   if (!post) return null
   return (
       <ScrollView>
          <Image style={styles.img} source={{uri: post.img}}/>
          {editMode
              ? <View style={styles.wrap}>
                 <TextInput style={styles.title} selectable={true}
                            placeholder={'Введите новые текст поста...'}
                            onChangeText={setNewText}
                            onBlur={saveNewPostText}/>
              </View>

              : <View style={styles.wrap}>
                 <Text style={styles.title} selectable={true}
                       onLongPress={() => setEditMode(true)}>{post.text}</Text>
              </View>
          }

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
      margin: 20
   },
   title: {
      fontFamily: 'OpenSansRegular'
   }
})
