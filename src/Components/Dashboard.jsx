import React, { useEffect, useState } from 'react';
import { FaBars, FaCalendarDay, FaCheckCircle, FaClipboardList, FaEdit, FaExclamationCircle, FaPlus, FaTimesCircle, FaTrash, FaUser } from 'react-icons/fa';
import './Dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTasks, deleteTask, editTask } from '../Services/TaskService'

function Dashboard() {

    const [searchKey, setSearchKey] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    const [tasks, setTasks] = useState([]);

    const safeLower = (text) => (text || '').toLowerCase();

    const isCompleted = (task) => safeLower(task.status) === 'completed';
    const isIncomplete = (task) => safeLower(task.status) !== 'completed';
    const isDueToday = (task) => task.dueDate === today;
    const isOverdue = (task) => task.dueDate < today && isIncomplete(task);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [location.state]);

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

    const handleDeleteTask = async (taskId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            try {
                await deleteTask(taskId);
                setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
            } catch (err) {
                console.error('Error deleting the task:', err);
            }
        }
    };

    const handleMarkComplete = async (taskId) => {
        try {
            await editTask(taskId, { status: 'Completed' });
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === taskId ? { ...task, status: 'Completed' } : task
                )
            );
        } catch (err) {
            console.error('Error marking task as completed:', err);
            alert('Failed to mark task as completed.');
        }
    };

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>{error}</p>;

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
                            <tr key={task._id}>
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
                                <td>{task.dueDate ? task.dueDate.slice(0, 10) : ''}</td>
                                <td>
                                    <span className={`badge priority-${task.priority.toLowerCase()}`}>
                                        {task.priority}
                                    </span>
                                </td>
                                <td>
                                    <button className="icon-button" onClick={() => handleEditTask(task)}>
                                        <FaEdit />
                                    </button>
                                    <button className="icon-button" onClick={() => handleDeleteTask(task._id)}>
                                        <FaTrash />
                                    </button>
                                    {task.status !== 'Completed' && (
                                        <button className="icon-button" onClick={() => handleMarkComplete(task._id)}>
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
