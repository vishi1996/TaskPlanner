import React, { useEffect, useState } from 'react';
import { FaBars, FaCalendarDay, FaCheckCircle, FaClipboardList, FaEdit, FaExclamationCircle, FaPlus, FaTimesCircle, FaTrash, FaUser } from 'react-icons/fa';
import './Dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Dashboard() {

    const [searchKey, setSearchKey] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const navigate = useNavigate();
    const location = useLocation();

    const newTask = location.state?.task;
    const formMode = location.state?.formMode;

    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

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

    const safeLower = (text) => (text || '').toLowerCase();

    const isCompleted = (task) => safeLower(task.status) === 'completed';
    const isIncomplete = (task) => safeLower(task.status) !== 'completed';
    const isDueToday = (task) => task.dueDate === today;
    const isOverdue = (task) => task.dueDate < today && isIncomplete(task);

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

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchKey.toLowerCase()) ||
                               task.description.toLowerCase().includes(searchKey.toLowerCase());
    
        let matchesFilter = true;
    
        if (filterStatus === 'Completed') {
            matchesFilter = isCompleted(task);
        } else if (filterStatus === 'Incomplete') {
            matchesFilter = isIncomplete(task);
        } else if (filterStatus === 'Due Today') {
            matchesFilter = isDueToday(task);
        } else if (filterStatus === 'Overdue') {
            matchesFilter = isOverdue(task);
        }
    
        return matchesSearch && matchesFilter;
    });

    const getCounts = (tasks) => {
        const all = tasks.length;
        const completed = tasks.filter(isCompleted).length;
        const incomplete = tasks.filter(isIncomplete).length;
        const dueToday = tasks.filter(isDueToday).length;
        const overdue = tasks.filter(isOverdue).length;
    
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

    const handleMarkComplete = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task => task.id === taskId ? { ...task, status: 'Completed' } : task)
        );
    }

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
                <div className="stat-card" style={{ backgroundColor: '#007bff', cursor: 'pointer' }}
                    onClick={() => setFilterStatus('All')}>
                    <div className="icon-circle">
                        <FaClipboardList />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">{all}</div>
                        <div className="stat-label">All Tasks</div>
                    </div>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#ffc107', cursor: 'pointer' }}
                    onClick={() => setFilterStatus('Incomplete')}>
                    <div className="icon-circle">
                        <FaTimesCircle />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">{incomplete}</div>
                        <div className="stat-label">Incomplete</div>
                    </div>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#dc3545', cursor: 'pointer' }}
                    onClick={() => setFilterStatus('Overdue')}>
                    <div className="icon-circle">
                        <FaExclamationCircle />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">{overdue}</div>
                        <div className="stat-label">Overdue</div>
                    </div>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#17a2b8', cursor: 'pointer' }}
                    onClick={() => setFilterStatus('Due Today')}>
                    <div className="icon-circle">
                        <FaCalendarDay />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">{dueToday}</div>
                        <div className="stat-label">Due Today</div>
                    </div>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#28a745', cursor: 'pointer' }}
                    onClick={() => setFilterStatus('Completed')}>
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
                                    {task.status !== 'Completed' && (
                                        <button className="icon-button" onClick={() => handleMarkComplete(task.id)}>
                                            <FaCheckCircle />
                                        </button>
                                    )}
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
