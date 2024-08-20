import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const NotFoundPage = () => {
    useEffect(() => {
        MySwal.fire({
            title: '404 - Page Not Found',
            text: "The page you're looking for doesn't exist.",
            icon: 'error',
            confirmButtonText: 'Go to Home'
        }).then(() => {
            // Optionally navigate to home after closing the alert
            window.location.href = '/';
        });
    }, []);

    return (
        <div className="not-found-page">
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default NotFoundPage;
