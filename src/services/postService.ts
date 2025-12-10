import axios from "axios";
import { EditPost, NewPost, Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (
  searchText: string,
  page: number
): Promise<{ items: Post[]; total: number }> => {
  const data = await axios.get<Post[]>(`/posts`, {
    params: { q: searchText, _page: page },
  });

  const total = Number(data.headers["x-total-count"]);
  console.log(data);
  return {
    items: data.data,
    total,
  };
};

export const createPost = async (newPost: NewPost): Promise<Post> => {
  const newNote = await axios.post<Post>(`/posts`, {
    params: {
      newPost,
    },
  });
  return newNote.data;
};

export const editPost = async (newDataPost: EditPost): Promise<Post> => {
  const editNote = await axios.patch<Post>(`/posts/:${newDataPost.id}`, {
    params: {
      newDataPost,
    },
  });
  return editNote.data;
};

export const deletePost = async (postId: number): Promise<Post> => {
  const deleteNote = await axios.delete<Post>(`/posts/'${postId}`);
  return deleteNote.data;
};
