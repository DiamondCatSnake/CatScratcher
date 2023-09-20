const BASE_URL = 'http://localhost:3000';

export const api = {
  createCategory: async (categoryData) => {
    const response = await fetch(`${BASE_URL}/route/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    return await response.json();
  },

  removeCategory: async (categoryData) => {
    const response = await fetch(`${BASE_URL}/route/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    return await response.json();
  },

  editCategory: async (categoryData) => {
    const response = await fetch(`${BASE_URL}/route/category`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    return await response.json();
  },

  createUser: async (userData) => {
    const response = await fetch(`${BASE_URL}/route/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  removeUser: async (userData) => {
    const response = await fetch(`${BASE_URL}/route/user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  createTask: async (taskData, categoryId) => {
    const response = await fetch(`${BASE_URL}/route/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskData, categoryId}),
    });
    return await response.json();
  },

  removeTask: async (taskData) => {
    const response = await fetch(`${BASE_URL}/route/task`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  },

  editTask: async (taskData) => {
    const response = await fetch(`${BASE_URL}/route/task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  },
};
