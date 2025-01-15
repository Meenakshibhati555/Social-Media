import { useCallback } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";

export const PostList = createContext({
    postList: [],  
    fetching: false,           //array form
    addPost: () => {},          // Method
    deletePost: () => {},       // Method
});



//Create Reducer function  
const postListReducer = (currPostList, action) => {
    let newPostList = currPostList;
    if (action.type === 'DELETE_POST') {
        newPostList = currPostList.filter(post => post.id !== action.payload.postId);
    } 
    else if (action.type === 'ADD_INITIAL_POSTS') {
        newPostList = action.payload.posts;
    } 
    else if (action.type === 'ADD_POST') {
        newPostList = [action.payload, ...currPostList]
    }
    return newPostList;
    // return currPostList;
};



//Yhe react k ek component banaya h is k ander jo bhi pass kare gy yhe us ko wrap karega  <PostList.Provider> m aur <PostList.Provider> m wrap kar k render kar deta h .
const PostListprovider = ({children}) => {
    
    //Now I want a post list using useReducer
    //useReducer m hum 2 parameter pass karte h 1) reducer function 2) default value
    const [postList, dispatchPostList] = useReducer(postListReducer, []);
    const [fetching, setFetching] = useState(false);


    // ADD , Delete And Add InitailPost Method
    const addPost = (post) => {
        //console.log(`${userId} ${postTitle} ${postBody} ${reactions} ${tags}`);
        dispatchPostList({
            type: 'ADD_POST',
            payload: post,
        })
    };


    const addInitialPosts = (posts) => {
        dispatchPostList({
            type: 'ADD_INITIAL_POSTS',
            payload: {
                posts,
            },
        });
    };
    
    
    // here use callback hook
    const deletePost = useCallback((postId) => {
        //console.log(`Delete post called for: ${postId}`);
        dispatchPostList({
            type: 'DELETE_POST',
            payload : {postId},
        });
    }, [dispatchPostList]);
  

    // Data fetching from server
    useEffect(() => {
        setFetching(true);
        const controller = new AbortController();
        const signal = controller.signal;
        
        fetch("https://dummyjson.com/posts", {signal})
        .then((res) => res.json())
        .then(data => {
            addInitialPosts(data.posts);
            setFetching(false);
            
        });
        return () => {
            controller.abort();
        }
    }, []);
    
    return (
        <PostList.Provider value={{ postList, fetching, addPost, deletePost }}>   
            {children}
        </PostList.Provider>

        // yaha value = {} m vo value aye gy jo upper createContext m pass kari h
    );
};




export default PostListprovider;
