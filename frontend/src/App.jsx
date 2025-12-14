import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SubmitReport from './pages/SubmitReport';
import BulkUpload from './pages/BulkUpload';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/upload" element={<SubmitReport />} />
                <Route path="/bulk-upload" element={<BulkUpload />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
