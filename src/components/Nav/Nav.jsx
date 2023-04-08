import { NavLink } from 'react-router-dom';
import { BsPencil, BsBoxArrowInRight, BsPersonCircle } from 'react-icons/bs';
import styles from './Nav.module.css';

export function Nav() {
  return (
    <nav className={styles['main-menu']}>
      <menu>
        <NavLink className={styles['logo']} to="/">
          SociaL in
        </NavLink>
        <menu className={styles['right-side-links']}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/posts"
            >
              <p><BsPencil size="1rem"/>Posts</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/login"
            >
              <p><BsBoxArrowInRight size="1rem"/>Log in</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to="/signup"
            >
              <p><BsPersonCircle size="1rem"/>Sign up</p>
            </NavLink>
          </li>
        </menu>
      </menu>
    </nav>
  );
}
