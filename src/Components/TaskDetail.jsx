import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TaskForm.css';
import { editTask } from '../Services/TaskService';

function TaskDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const task = location.state?.task;

    const [comment, setComment] = useState('');
    const [attachment, setAttachment] = useState(null);

    useEffect(() => {
        if (task?.comment) {
            setComment(task.comment);
        }
    }, [task]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSaveComment = async (taskId) => {
        try {
            const editBody = {
                comment, ...(attachment && { attachment })
            };

            await editTask(taskId, editBody);
            navigate('/dashboard', { state: { reload: true } });
        } catch (err) {
            console.error('Error saving task updates:', err);
            alert('Failed to update the task.');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setAttachment(file.name);
        }
    };

    if (!task) return <p>No Task Found</p>;

    return (
        <div className="task-form-container">
            <h2>Task Detail View</h2>

            <div className="task-detail">
                <div className="detail-group">
                    <label>Title:</label>
                    <div className="detail-value">{task.title}</div>
                </div>

                <div className="detail-group">
                    <label>Description:</label>
                    <div className="detail-value">{task.description}</div>
                </div>

                <div className="detail-group">
                    <label>Priority:</label>
                    <div className="detail-value">{task.priority}</div>
                </div>

                <div className="detail-group">
                    <label>Due Date:</label>
                    <div className="detail-value">{task.dueDate ? task.dueDate.slice(0, 10) : ''}</div>
                </div>

                <div className="detail-group">
                    <label>Status:</label>
                    <div className="detail-value">{task.status}</div>
                </div>

                <div className="task-form">
                    <div className="form-group">
                        <label>Comment:</label>
                        <textarea
                            value={comment}
                            onChange={handleCommentChange}
                        />
                        <label style={{ marginTop: '12px' }}>Attach File:</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*,application/pdf"
                        />
                    </div>
                </div>

                <button className="submit-button" onClick={() => handleSaveComment(task._id)}>
                    Save Comment
                </button>
            </div>
        </div>
    );
}

export default TaskDetail;
