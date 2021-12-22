import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className="d-flex align-items-center justify-content-center mt-lg-11">
            <span
                className="mx-4 spinner-grow text-success"
                role="status"
                aria-hidden="true"
            />
        </div>
    );
}

export default Loading
