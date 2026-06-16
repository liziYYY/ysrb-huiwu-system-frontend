import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';

export const useProjectStore = defineStore('project', () => {
  // 状态
  const state = reactive({
    projects: [],
    currentProject: null,
    loading: false,
    error: null
  });

  // 计算属性
  const projectCount = computed(() => state.projects.length);

  // 方法
  const setProjects = (projects) => {
    state.projects = projects;
  };

  const setCurrentProject = (project) => {
    state.currentProject = project;
  };

  const addProject = (project) => {
    state.projects.push(project);
  };

  const updateProject = (id, updatedProject) => {
    const index = state.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      state.projects[index] = { ...state.projects[index], ...updatedProject };
    }
  };

  const deleteProject = (id) => {
    state.projects = state.projects.filter(p => p.id !== id);
  };

  const setLoading = (loading) => {
    state.loading = loading;
  };

  const setError = (error) => {
    state.error = error;
  };

  return {
    state,
    projectCount,
    setProjects,
    setCurrentProject,
    addProject,
    updateProject,
    deleteProject,
    setLoading,
    setError
  };
});
