import React, {useEffect} from "react";
import {PostCollection} from "../components/PostCollection";
import {blogActions} from "../bll/blogReducer";
import {useDispatch} from "react-redux";


export const MainScreen = ({navigation}) => {

   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(blogActions.loadPosts())
   }, [])

   // влаг main для понимания какую коллекцию отрисовывать в переиспользуемой компоненте PostCollection,
   // main={true} значит для MainScreen (отрисовываем все посты), main={false} - для BookedScreen  отфильров-ые посты
   return <PostCollection navigation={navigation} main={true}/>
}

