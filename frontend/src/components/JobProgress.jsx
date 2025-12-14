export default function JobProgress({ job }) {
    if (!job) return null;

    return (
        <div className="mt-4 p-3">
            <p>Status: {job.status}</p>
            <p>Success: {job.success || 0}</p>
            <p>Failed: {job.failed || 0}</p>
        </div>
    );
}
