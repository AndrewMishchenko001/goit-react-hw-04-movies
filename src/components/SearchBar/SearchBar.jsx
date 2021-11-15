import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './SearchBar.module.css';

export default function SearchBar({ onHandleSubmit }) {
  const [query, setQuery] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error('Введите название фильма');
    }
    onHandleSubmit(query);
    setQuery('');
  };

  return (
    <section className={s.SearchBar}>
      <form className={s.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          onChange={({ target }) => setQuery(target.value)}
          placeholder="Just type"
        />
      </form>
    </section>
  );
}
