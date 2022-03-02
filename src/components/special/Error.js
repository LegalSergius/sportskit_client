import styles from "../../styles/index.module.css";
import React from 'react';

export function Error(props) {
    return (
        <span className={styles.errorMessage}>
            {props.message}
        </span>
    );
}