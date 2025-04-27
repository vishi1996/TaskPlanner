import React, { useEffect, useState } from 'react';
import './TaskForm.css';
import { useLocation, useNavigate } from 'react-router-dom';

function TaskForm() {
    const location = useLocation();
    const formMode = location.state?.formMode || 'Add';
    const editingTask = location.state?.task;

    const [task, setTask] = useState(
        editingTask || {
            id: Date.now(),
            title: '',
            description: '',
            status: 'In Progress',
            priority: '',
            dueDate: new Date().toISOString().split('T')[0]
        });

    const navigate = useNavigate();

    useEffect(() => {
        // If formMode is Edit but no editingTask, redirect to Dashboard
        if (formMode === 'Edit' && !editingTask) {
            alert('No task selected for editing!');
            navigate('/dashboard', { replace: true }); // Send back to dashboard
        }
    }, [formMode, editingTask, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard', { state: { task, formMode } });
    };

    return (
        <div className="task-form-container">
            <h2>{formMode} Task</h2>

            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Priority:</label>
                    <select name="priority" value={task.priority} onChange={handleChange}>
                        <option value="">Select priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Due Date:</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-button">
                    {formMode === 'Add' ? 'Create Task' : 'Update Task'}
                </button>
            </form>
        </div>
    );
}

export default TaskForm;
