import React, { useState } from 'react';
import { FaBars, FaCalendarDay, FaCheckCircle, FaClipboardList, FaExclamationCircle, FaPlus, FaSearch, FaTimesCircle, FaUser } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {

    const [searchKey, setSearchKey] = useState('');

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
                    placeholder="Enter your search key"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    className="input-field"
                />
                <button className="search-button">
                    <FaSearch />
                </button>
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
                        <div className="stat-count">24</div>
                        <div className="stat-label">All Tasks</div>
                    </div>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#ffc107' }}>
                    <div className="icon-circle">
                        <FaTimesCircle />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">24</div>
                        <div className="stat-label">Incomplete</div>
                    </div>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#dc3545' }}>
                    <div className="icon-circle">
                        <FaExclamationCircle />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">24</div>
                        <div className="stat-label">Overdue</div>
                    </div>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#17a2b8' }}>
                    <div className="icon-circle">
                        <FaCalendarDay />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">24</div>
                        <div className="stat-label">Due Today</div>
                    </div>
                </div>
                <div className="stat-card" style={{ backgroundColor: '#28a745' }}>
                    <div className="icon-circle">
                        <FaCheckCircle />
                    </div>
                    <div className="stat-info">
                        <div className="stat-count">24</div>
                        <div className="stat-label">Completed</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
