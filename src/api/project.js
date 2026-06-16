import request from './request';

const API_BASE = '/api/projects';

/**
 * 创建项目
 */
export const createProject = (data) => {
  return request({
    url: API_BASE,
    method: 'POST',
    data
  });
};

/**
 * 获取所有项目
 */
export const getAllProjects = (params = {}) => {
  return request({
    url: API_BASE,
    method: 'GET',
    params
  });
};

/**
 * 获取项目详情
 */
export const getProjectById = (id) => {
  return request({
    url: `${API_BASE}/${id}`,
    method: 'GET'
  });
};

/**
 * 更新项目
 */
export const updateProject = (id, data) => {
  return request({
    url: `${API_BASE}/${id}`,
    method: 'PUT',
    data
  });
};

/**
 * 删除项目
 */
export const deleteProject = (id) => {
  return request({
    url: `${API_BASE}/${id}`,
    method: 'DELETE'
  });
};

/**
 * 按状态查询项目
 */
export const getProjectsByStatus = (status) => {
  return request({
    url: `${API_BASE}/status/${status}`,
    method: 'GET'
  });
};
