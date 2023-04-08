import { Nav } from '../';
import { Button } from '../';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export function HomePage() {
    return <div className={styles['background']}>
        <Nav />
        <div className={styles['home-div']}>
            <Link to='/signup'>
                <Button variant="withMargin">Sign Up</Button>
            </Link>
            <Link to='/login'>
                <Button variant="smallWidthWithMargin">Login</Button>
            </Link>
        </div>
    </div>
}
