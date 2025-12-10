import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";

import css from "./CreatePostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";
import { NewPost } from "../../types/post";

interface PostFormProps {
  onCancel: () => void;
}

interface InitialValuesForm {
  title: string;
  body: string;
}

const initialValues: InitialValuesForm = {
  title: "",
  body: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Content is required"),
});

export default function PostForm({ onCancel }: PostFormProps) {
  // const handleSubmit = (values: InitialValuesForm, actions: FormikHelpers<InitialValuesForm>) => {
  //   console.log("Form submitted:", values);
  //   actions.resetForm();
  const queryClient = useQueryClient();

  const mutationAdd = useMutation({
    mutationFn: (values: NewPost) => createPost(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onCancel();
    },
  });

  const handleCreatePost = async (values: NewPost, actions: FormikHelpers<InitialValuesForm>) => {
    try {
      await mutationAdd.mutateAsync(values);
      actions.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCreatePost}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="body">Content</label>
            <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
            <ErrorMessage name="body" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button onClick={onCancel} type="button" className={css.cancelButton}>
              Cancel
            </button>

            <button type="submit" className={css.submitButton} disabled={isSubmitting || !isValid}>
              Create post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
