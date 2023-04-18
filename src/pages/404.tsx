import styles from './404.module.css';

function NotFound() {
  return (
    <h1 className={`text text_type_main-large ${styles.title}`}>Ничего не найдено</h1>
  );
}

export default NotFound;