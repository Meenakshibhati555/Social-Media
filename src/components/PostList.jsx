import Post from "../components/Post";
import { PostList as PostListData } from "../store/post-list-store";
import { useContext } from "react";
import WelcomeMessage from "./WelcomeMessage";
import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";


const PostList = () => {
    const { postList, fetching} = useContext(PostListData);
    

    return (
        <>
            {fetching && <LoadingSpinner></LoadingSpinner>}
            {!fetching && postList.length === 0 && (
                <WelcomeMessage></WelcomeMessage>
            )}
            {!fetching && postList.map((post) => (
                <Post key={post.id} post={post}></Post>
            ))}
        </>
    );
};
export default PostList;
