import React, {useEffect, useState} from 'react';
import {Button, Image, View, Platform, StyleSheet, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useFocusEffect} from '@react-navigation/native';

export const PhotoPicker = ({onPick}) => {
   const [image, setImage] = useState(null)
   useFocusEffect(
       React.useCallback(() => {
          return () => {setImage(null)};
       }, [])
   );
   useEffect(() => {
      (async () => {
         if (Platform.OS !== 'web') {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
               Alert.alert('Нет доступа к камере..');
               return false
            }
         }
      })()
   }, [])

   const takePhoto = async () => {
      let result = await ImagePicker.launchCameraAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images, // только фото , без видео
         allowsEditing: false,  // возможность редактировать фото
         aspect: [16, 9], // соотношение сторон
         quality: 0.7, // качество фотографии
      });
      setImage(result.uri);
      onPick(result.uri)
   }


   return (
       <View style={styles.wrap}>
          {image && <Image style={styles.img} source={{uri: image}}/>}
          <Button title="Сделать фото" onPress={takePhoto}/>
       </View>
   );
}

const styles = StyleSheet.create({
   wrap: {
      marginBottom: 10
   },
   img: {
      width: '100%',
      height: 200,
      marginTop: 10
   },
   btn:{
      marginTop: 20
   }
})
