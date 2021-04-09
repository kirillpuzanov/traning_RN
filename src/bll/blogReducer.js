import {DATA} from '../data';

const initialState = {
   allPosts: [],
   bookedPosts: [],
}

export const blogReducer = (state = initialState, action) => {

   switch (action.type) {
      case'POSTS/SET_POSTS':
         return {
            ...state,
            allPosts: action.payload,
            bookedPosts: action.payload.filter(el => el.booked)
         }
      case'POSTS/TOGGLE-BOOKED': {
         const allPosts = state.allPosts.map(el => el.id === action.payload ? {...el, booked: !el.booked} : el)
         return {
            ...state,
            allPosts,
            bookedPosts: allPosts.filter(el => el.booked)
         }
      }
      case 'POSTS/REMOVE-POST' : {
         return {
            ...state,
            allPosts: state.allPosts.filter(el => el.id !== action.payload),
            bookedPosts: state.bookedPosts.filter(el => el.id !== action.payload)
         }
      }
      case 'POSTS/ADD_POST' : {
         return {
            ...state,
            allPosts: [{...action.payload}, ...state.allPosts]
         }
      }
      case 'POSTS/UPDATE-POST-TEXT': {
         return {
            ...state,
            allPosts: state.allPosts.map(el => el.id === action.payload.postId ? {...el, text: action.payload.newText} : el),
            bookedPosts: state.bookedPosts.map(el => el.id === action.payload.postId ? {...el, text: action.payload.newText} : el)
         }
      }
      default:
         return state
   }
}

export const blogActions = {
   loadPosts: () => ({
      type: 'POSTS/SET_POSTS', payload: DATA
   }),
   toggleBooked: (id) => ({
      type: 'POSTS/TOGGLE-BOOKED', payload: id
   }),
   removePost: (id) => ({
      type: 'POSTS/REMOVE-POST', payload: id
   }),
   addPost: (post) => {
      post.id = Date.now().toString()
      return {
         type: 'POSTS/ADD_POST',
         payload: post
      }
   },
   updatePostText: (newText,postId) => ({
      type: 'POSTS/UPDATE-POST-TEXT', payload: {newText, postId}
   })
}


