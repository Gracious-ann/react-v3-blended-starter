import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditPost, Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";

interface PostList {
  post: Post[];
  toggleModal: () => void;
  toggleEditPost: (post: EditPost) => void;
}

export default function PostList({ post, toggleEditPost, toggleModal }: PostList) {
  const queryClient = useQueryClient();

  const mutationDeletePost = useMutation({
    mutationFn: async (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <ul className={css.list}>
      {post.map((post) => (
        <li key={post.id} className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button
              onClick={() => {
                toggleModal();
                toggleEditPost({ id: post.id, title: post.title, body: post.body });
              }}
              className={css.edit}
            >
              Edit
            </button>
            <button onClick={() => mutationDeletePost.mutate(post.id)} className={css.delete}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
