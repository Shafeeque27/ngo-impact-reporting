import React, { useEffect } from 'react';
import { useState } from 'react';
import { getJobStatus, uploadCSV } from '../api/api';
import JobProgress from '../components/JobProgress';

const BulkUpload = () => {
    const [file, setFile] = useState(null);
    const [jobId, setJobId] = useState(null);
    const [job, setJob] = useState(null);

    const upload = async () => {
        const fd = new FormData();
        fd.append('file', file);
        const res = await uploadCSV(fd);
        setJobId(res.data.job_id);
    };

    useEffect(() => {
        if (!jobId) return;

        const interval = setInterval(async () => {
            const res = await getJobStatus(jobId);
            setJob(res.data);
            if (res.data.status === 'completed') clearInterval(interval);
        }, 2000);
        return () => clearInterval(interval);
    }, [jobId]);

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold">Bulk CSV Upload</h2>
            <input className='cursor-pointer p-2 mt-2 mr-2 bg-gray-100 rounded' type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={upload} className="bg-green-600 text-white px-4 py-2 ml-2 cursor-pointer rounded">
                Upload
            </button>
            <JobProgress job={job} />
        </div>
    );
};

export default BulkUpload;
