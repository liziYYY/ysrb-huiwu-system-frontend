<template>
  <view class="container">
    <view class="header">
      <view class="title">项目列表</view>
      <view class="action-btn">
        <button class="btn-primary" @click="navigateToCreate">+ 新建项目</button>
      </view>
    </view>

    <view class="project-list">
      <view v-if="projects.length === 0" class="empty-state">
        <text>暂无项目</text>
      </view>
      <view v-for="project in projects" :key="project.id" class="project-card" @click="navigateToDetail(project.id)">
        <view class="project-header">
          <view class="project-name">{{ project.projectName }}</view>
          <view class="project-status" :class="`status-${project.status}`">{{ project.status }}</view>
        </view>
        <view class="project-info">
          <view class="info-item">
            <text class="label">客户：</text>
            <text class="value">{{ project.customerName }}</text>
          </view>
          <view class="info-item">
            <text class="label">日期：</text>
            <text class="value">{{ formatDate(project.projectDate) }}</text>
          </view>
          <view class="info-item">
            <text class="label">预算：</text>
            <text class="value">{{ formatCurrency(project.budget) }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllProjects } from '@/src/api/project';
import { formatDate, formatCurrency } from '@/src/utils/common';

const projects = ref([]);
const loading = ref(false);

const loadProjects = async () => {
  try {
    loading.value = true;
    const response = await getAllProjects();
    projects.value = response;
  } catch (error) {
    console.error('Failed to load projects:', error);
    uni.showToast({
      title: '加载项目失败',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
};

const navigateToCreate = () => {
  uni.navigateTo({
    url: '/pages/project/create'
  });
};

const navigateToDetail = (projectId) => {
  uni.navigateTo({
    url: `/pages/project/detail?id=${projectId}`
  });
};

onMounted(() => {
  loadProjects();
});
</script>

<style scoped>
.container {
  padding: 0;
}

.header {
  background-color: #007aff;
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.action-btn {
  display: flex;
  gap: 8px;
}

.btn-primary {
  background-color: white;
  color: #007aff;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
}

.project-list {
  padding: 16px;
}

.empty-state {
  text-align: center;
  padding: 100px 0;
  color: #999;
}

.project-card {
  background-color: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.project-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  flex: 1;
}

.project-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
}

.status-报价中 {
  background-color: #ff9500;
}

.status-已确认 {
  background-color: #007aff;
}

.status-执行中 {
  background-color: #50bfff;
}

.status-已完成 {
  background-color: #6cc51f;
}

.status-已结算 {
  background-color: #999;
}

.project-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-item {
  display: flex;
  font-size: 13px;
  color: #666;
}

.label {
  font-weight: bold;
  margin-right: 4px;
}

.value {
  color: #333;
}
</style>
