import { Nav } from '../';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export function HomePage() {
    return <div className={styles['background']}>
        <Nav />
        <div className={styles['home-div']}>
            <Link to='/signup'>
                <button>Sign Up</button>
            </Link>
            <Link to='/login'>
                <button className={styles['buttonLogin']}>Login</button>
            </Link>
        </div>
    </div>
}
