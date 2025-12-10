import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import css from "./EditPostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "../../services/postService";
import { EditPost } from "../../types/post";

interface EditPostFormProps {
  onCancel: () => void;
  valuesEdit: EditPost;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Content is required"),
});

export default function EditPostForm({ onCancel, valuesEdit }: EditPostFormProps) {
  // const handleEditSubmit = (values: EditInitialValuesForm) => {
  //   console.log("Edited values:", values);
  // };

  const queryClient = useQueryClient();

  const mutationEdit = useMutation({
    mutationFn: (values: EditPost) => editPost(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleEditSubmit = async (values: EditPost, actions: FormikHelpers<EditPost>) => {
    try {
      await mutationEdit.mutateAsync(values);
      actions.resetForm();
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={valuesEdit}
      onSubmit={handleEditSubmit}
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
              Edit post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
