import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";


export function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };
}
export const PostContext = createContext();


export const PostContextProvider = ({ children }) => {

    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
    );
    const [searchQuery, setSearchQuery] = useState("");


    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }

    return <PostContext.Provider value={{
        posts,
        searchQuery,
        handleAddPost,
        handleClearPosts,
        setSearchQuery
    }}>
        {children}
    </PostContext.Provider>
}

export const usePost = () => {
    const context = useContext(PostContext);

    if (context === undefined) { throw new Error("context was used outside of the provider") }

    return context
}