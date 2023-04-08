import { NavLink, useNavigate } from 'react-router-dom';
import { BsPencil, BsBoxArrowInRight, BsPersonCircle } from 'react-icons/bs';
import { useAuth } from '../../features';
import styles from './Nav.module.css';

export function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate('/');
  }

  return (
    <nav className={styles['main-menu']}>
      <menu>
        <NavLink className={styles.logo} to="/">
          SociaL in
        </NavLink>
        <menu className={styles['right-side-links']}>
          {user && (
            <>
              <li>
                <p className={styles.welcome}>Welcome {user.name}!</p>
              </li>
              <li>
                <a href="/" onClick={handleLogout} className={styles.logout}>
                  Logout
                </a>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <NavLink className={({ isActive }) => (isActive ? styles.active : '')}
                  to="/posts"
                >
                  <p><BsPencil size="1rem"/>Posts</p>
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => (isActive ? styles.active : '')}
                  to="/login"
                >
                  <p><BsBoxArrowInRight size="1rem"/>Log in</p>
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => (isActive ? styles.active : '')}
                  to="/signup"
                >
                  <p><BsPersonCircle size="1rem"/>Sign up</p>
                </NavLink>
              </li>
            </>
          )}
        </menu>
      </menu>
    </nav>
  );
}
