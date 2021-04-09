import React, {useRef, useState} from 'react';
import {
   StyleSheet,
   Text,
   View,
   TextInput,
   Button,
   ScrollView,
   TouchableWithoutFeedback,
   Keyboard
} from 'react-native';
import {THEME} from '../theme';
import {useDispatch} from 'react-redux';
import {blogActions} from '../bll/blogReducer';
import {PhotoPicker} from '../components/PhotoPicker';


export const CreateScreen = ({navigation}) => {
   const [text, setText] = useState('')
   const dispatch = useDispatch()
   const photoRef = useRef(null)
   const onCreatePost = () => {
      const post = {
         text: text,
         date: new Date().toJSON(),
         img: photoRef.current,
         booked: false
      }
      dispatch(blogActions.addPost(post))
      navigation.navigate('Main')
      setText('')
   }
   const photoPickHandler = (uri) => photoRef.current = uri

   return (
       <ScrollView>
          {/*Закрыть клавиатуру при клике вне ее*/}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
             <View style={styles.container}>
                <Text> Создать новый пост </Text>
                <TextInput style={styles.textArea}
                           placeholder={'Введите текс поста...'}
                           value={text} onChangeText={setText}
                           multiline={true} // вводить в несеолько строк
                />
                {/*<Image source={{uri: fakePhoto}} style={{width: '100%', height: 200, marginBottom: 20}}/>*/}
                <PhotoPicker onPick={photoPickHandler}/>
                <Button title={'Создать пост'}
                        color={THEME.MAIN_COLOR} onPress={onCreatePost}
                        disabled={!text || !photoRef}/>
             </View>
          </TouchableWithoutFeedback>
       </ScrollView>
   )
}

const styles = StyleSheet.create({
   container: {
      padding: 10
   },
   title: {
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 20,
      fontFamily: 'OpenSansRegular'
   },
   textArea: {
      padding: 10,
      marginBottom: 10
   }
})
