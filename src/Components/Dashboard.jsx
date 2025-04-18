import React, { useState } from 'react';
import { FaBars, FaCalendarDay, FaCheckCircle, FaClipboardList, FaEdit, FaExclamationCircle, FaPlus, FaSearch, FaTimesCircle, FaTrash, FaUser } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {

    const [searchKey, setSearchKey] = useState('');
    const tasks = [
        {
            id: 1,
            title: 'Design Login Page',
            description: 'Create responsive UI for login',
            status: 'In Progress',
            dueDate: '2024-04-02',
            priority: 'High',
        },
        {
            id: 2,
            title: 'Setup Backend API',
            description: 'Initialize Express and connect to MongoDB',
            status: 'Completed',
            dueDate: '2024-03-28',
            priority: 'Medium',
        },
    ];

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchKey.toLowerCase()) ||
        task.description.toLowerCase().includes(searchKey.toLowerCase())
    );

    const getCounts = (tasks) => {
        const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

        const all = tasks.length;
        const completed = tasks.filter(task => task.status.toLowerCase() === 'completed').length;
        const incomplete = tasks.filter(task => task.status.toLowerCase() !== 'completed').length;
        const dueToday = tasks.filter(task => task.dueDate === today).length;
        const overdue = tasks.filter(task => task.dueDate < today && task.status.toLowerCase() !== 'completed').length;

        return { all, completed, incomplete, dueToday, overdue };
    };

    const { all, completed, incomplete, dueToday, overdue } = getCounts(tasks);

    return (
        <div>
            {/* Tool bar */}
            <div className="toolbar">
                <button className="hamburger-button">
                    <FaBars />
                </button>
                <button className="create-task-button">
                    <FaPlus style={{ marginRight: '8px' }} />
                    New Task
                </button>
                <input
                    type="text"
                    placeholder="Search by task title or description"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    className="input-field"
                />
                <button className="user-button">
                    <FaUser />
                </button>
            </div>

            {/* Stats bar */}
            <div className="stats-bar">
                <div className="stat-card" style={{ backgroundColor: '#007bff' }}>
                    <div className="icon-circle">
                        <FaClipboardList />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">{all}</div>
                        <div className="stat-label">All Tasks</div>
                    </div>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#ffc107' }}>
                    <div className="icon-circle">
                        <FaTimesCircle />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">{incomplete}</div>
                        <div className="stat-label">Incomplete</div>
                    </div>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#dc3545' }}>
                    <div className="icon-circle">
                        <FaExclamationCircle />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">{overdue}</div>
                        <div className="stat-label">Overdue</div>
                    </div>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#17a2b8' }}>
                    <div className="icon-circle">
                        <FaCalendarDay />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">{dueToday}</div>
                        <div className="stat-label">Due Today</div>
                    </div>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#28a745' }}>
                    <div className="icon-circle">
                        <FaCheckCircle />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">{completed}</div>
                        <div className="stat-label">Completed</div>
                    </div>
                </div>
            </div>

            {/* Task List */}
            <div className="tasklist">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task Title</th>
                            <th>Task Description</th>
                            <th>Task Status</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task, index) => (
                            <tr key={task.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <span className="truncate" title={task.title}>
                                        {task.title}
                                    </span>
                                </td>
                                <td>
                                    <span className="truncate" title={task.description}>
                                        {task.description}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge status-${task.status.toLowerCase().replace(/\s/g, '')}`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td>{task.dueDate}</td>
                                <td>
                                    <span className={`badge priority-${task.priority.toLowerCase()}`}>
                                        {task.priority}
                                    </span>
                                </td>
                                <td>
                                    <button className="icon-button">
                                        <FaEdit />
                                    </button>
                                    <button className="icon-button">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
