import React, { useEffect, useState } from 'react';
import { FaBars, FaCalendarDay, FaCheckCircle, FaClipboardList, FaEdit, FaExclamationCircle, FaPlus, FaTimesCircle, FaTrash, FaUser } from 'react-icons/fa';
import './Dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Dashboard() {

    const [searchKey, setSearchKey] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const newTask = location.state?.task;
    const formMode = location.state?.formMode;

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: 'Design Login Page',
            description: 'Create responsive UI for login',
            status: 'In Progress',
            priority: 'High',
            dueDate: '2024-04-02'
        },
        {
            id: 2,
            title: 'Setup Backend API',
            description: 'Initialize Express and connect to MongoDB',
            status: 'Completed',
            priority: 'Medium',
            dueDate: '2024-03-28'
        },
    ]);

    useEffect(() => {
        if (newTask && formMode === 'Add') {
            // Add a new task
            setTasks(prevTasks => {
                const exists = prevTasks.some(task => task.id === newTask.id);
                if (!exists) {
                    return [...prevTasks, newTask];
                }
                return prevTasks;
            });
        } else if (newTask && formMode === 'Edit') {
            // Update an existing task
            setTasks(prevTasks =>
                prevTasks.map(task => task.id === newTask.id ? newTask : task)
            );
        }
    }, [newTask, formMode]);

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

    const handleAddNewTask = () => {
        navigate('/taskForm', { state: { formMode: 'Add' } });
    }

    const handleEditTask = (task) => {
        navigate('/taskForm', { state: { formMode: 'Edit', task } });
    }

    const handleDeleteTask = (taskId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        }
    };

    return (
        <div>
            {/* Tool bar */}
            <div className="toolbar">
                <button className="hamburger-button">
                    <FaBars />
                </button>
                <button className="create-task-button" onClick={handleAddNewTask}>
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
                                    <button className="icon-button" onClick={() => handleEditTask(task)}>
                                        <FaEdit />
                                    </button>
                                    <button className="icon-button" onClick={() => handleDeleteTask(task.id)}>
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
