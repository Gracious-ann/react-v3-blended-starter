import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { EditPost } from "../../types/post";
import { fetchPosts } from "../../services/postService";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreatePost, setIsCreatePost] = useState<boolean>(false);

  const [isEditPost, setIsEditPost] = useState<boolean>(false);

  const [editedPost, setEditedPost] = useState<EditPost | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", currentPage, searchQuery],
    queryFn: () => fetchPosts(searchQuery, currentPage),
    enabled: true,
    placeholderData: keepPreviousData,
  });
  const posts = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / 12);

  const closeCreate = () => {
    setIsModalOpen(false);
    setIsCreatePost(false);
  };
  const openCreate = () => {
    setIsModalOpen(true);
    setIsCreatePost(true);
  };

  const closeEdit = () => {
    setIsModalOpen(false);
    setIsEditPost(false);
  };
  const openEdit = () => {
    setIsModalOpen(true);
    setIsEditPost(true);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          onChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
        />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <button onClick={openCreate} className={css.button}>
          Create post
        </button>
      </header>

      {isModalOpen && (
        <Modal onClose={closeCreate}>
          {isCreatePost && isLoading && <CreatePostForm onCancel={closeCreate} />}

          {isEditPost && editedPost && (
            <EditPostForm onCancel={closeEdit} valuesEdit={editedPost} />
          )}
        </Modal>
      )}

      {posts && posts.length > 0 && (
        <PostList post={posts} toggleEditPost={setEditedPost} toggleModal={openEdit} />
      )}
    </div>
  );
}
