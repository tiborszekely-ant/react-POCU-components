import styles from './Button.module.css';
import clsx from 'clsx';

export function Button({ children, className, variant }) {
    variant = variant && styles[`btn--${variant}`];

    return (
        <button className={clsx(styles.btn, variant, className)}>
            {children}
        </button>
    );
}
