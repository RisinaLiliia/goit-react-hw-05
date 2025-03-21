import { Formik, Form, Field } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import css from './SearchForm.module.css';

const SearchForm = ({ onSubmit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <Formik
      initialValues={{ query }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (!values.query.trim()) {
          toast.error('Please enter a movie name.');
          setSubmitting(false);
          return;
        }
        setSearchParams({ query: values.query });
        onSubmit(values.query);
        toast.success(`Searching for "${values.query}"`);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, isSubmitting }) => (
        <Form className={css.form}>
          <Field
            type="text"
            name="query"
            placeholder="Searching for movies..."
            className={css.input}
            value={values.query}
            onChange={handleChange}
          />
          <button type="submit" className={css.button} disabled={isSubmitting}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
