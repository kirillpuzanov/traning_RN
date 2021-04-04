import {DATA} from '../data';

const initialState = {
   allPosts: [],
   bookedPosts: [],
}

export const blogReducer = (state = initialState, action) => {

   switch (action.type) {
      case('POSTS/SET_POSTS'):
         return {
            ...state,
            allPosts: action.payload,
            bookedPosts: action.payload.filter(el => el.booked)
         }
      case('POSTS/TOGGLE-BOOKED'):{
         const allPosts = state.allPosts.map(el => el.id === action.payload ? {...el, booked: !el.booked} : el)
         return {
            ...state,
            allPosts,
            bookedPosts: allPosts.filter(el => el.booked)
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
   })

}
