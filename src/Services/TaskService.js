const API_URL = 'http://localhost:5000/api/task';

export const addTask = async (taskData) => {
    const response = await fetch(`${API_URL}/addTask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        throw new Error('Failed to add task');
    }

    return response.json();
};

export const editTask = async (id, taskData) => {
    const response = await fetch(`${API_URL}/editTask/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        throw new Error('Failed to edit task');
    }

    return response.json();
};

export const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/deleteTask/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }

    return response.json();
};

export const getTasks = async () => {
    const response = await fetch(`${API_URL}/getTasks`);

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    return response.json();
};
