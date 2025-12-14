import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-slate-800 text-white p-4 flex gap-6">
            <Link to="/">Dashboard</Link>
            <Link to="/upload">Submit Report</Link>
            <Link to="/bulk-upload">Bulk Upload</Link>
        </nav>
    );
};

export default Navbar;
