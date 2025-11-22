import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

import style from './Form.module.css';

interface FormProps {
  onSubmit: (userValue: string) => void;
}

export default function Form({ onSubmit }: FormProps) {
  function zborDanyh(formData: FormData) {
    const userValue = (formData.get('search') as string).trim();
    if (userValue === '') {
      toast.error('Error');
    } else {
      onSubmit(userValue);
    }
  }

  return (
    <form
      className={style.form}
      action={zborDanyh}
    >
      <input
        className={style.input}
        placeholder='What do you want to write?'
        name='search'
        autoFocus
      />
      <button
        className={style.button}
        type='submit'
      >
        <FiSearch size='16px' />
      </button>
    </form>
  );
}
