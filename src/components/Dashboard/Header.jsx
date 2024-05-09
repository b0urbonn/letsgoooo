import React from 'react';
import Logout from '../Logout';
import styles from './Header.module.css'; // Import the CSS module

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Simple Inventory Management</h1>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => setIsAdding(true)}>
          Add Product
        </button>
        <Logout setIsAuthenticated={setIsAuthenticated} className={styles.logoutButton} />
      </div>
    </header>
  );
};

export default Header;
