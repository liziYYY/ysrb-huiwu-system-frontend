<template>
  <view class="container">
    <view v-if="loading" class="loading-state">
      <text>加载中...</text>
    </view>
    <view v-else-if="project">
      <view class="project-detail-header">
        <view class="detail-item">
          <text class="label">项目名称</text>
          <text class="value">{{ project.projectName }}</text>
        </view>
        <view class="detail-item">
          <text class="label">客户名称</text>
          <text class="value">{{ project.customerName }}</text>
        </view>
        <view class="detail-item">
          <text class="label">项目日期</text>
          <text class="value">{{ formatDate(project.projectDate) }}</text>
        </view>
        <view class="detail-item">
          <text class="label">项目预算</text>
          <text class="value">{{ formatCurrency(project.budget) }}</text>
        </view>
        <view class="detail-item">
          <text class="label">项目状态</text>
          <text class="value" :class="`status-${project.status}`">{{ project.status }}</text>
        </view>
      </view>

      <view class="action-buttons">
        <button class="btn-info" @click="navigateToEdit">编辑</button>
        <button class="btn-danger" @click="deleteProject">删除</button>
      </view>
    </view>
    <view v-else class="error-state">
      <text>项目不存在</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProjectById, deleteProject as deleteProjectAPI } from '@/src/api/project';
import { formatDate, formatCurrency } from '@/src/utils/common';

const route = useRoute();
const project = ref(null);
const loading = ref(false);

const loadProject = async () => {
  try {
    loading.value = true;
    const id = route.query.id;
    const response = await getProjectById(id);
    project.value = response;
  } catch (error) {
    console.error('Failed to load project:', error);
  } finally {
    loading.value = false;
  }
};

const navigateToEdit = () => {
  uni.navigateTo({
    url: `/pages/project/edit?id=${project.value.id}`
  });
};

const deleteProject = async () => {
  uni.showModal({
    title: '提示',
    content: '确认删除该项目吗？',
    success: async (res) => {
      if (res.confirm) {
        try {
          await deleteProjectAPI(project.value.id);
          uni.showToast({
            title: '项目删除成功',
            icon: 'success'
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } catch (error) {
          console.error('Failed to delete project:', error);
          uni.showToast({
            title: '项目删除失败',
            icon: 'none'
          });
        }
      }
    }
  });
};

onMounted(() => {
  loadProject();
});
</script>

<style scoped>
.container {
  padding: 16px;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 100px 0;
  color: #999;
}

.project-detail-header {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.detail-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: #666;
}

.value {
  color: #333;
  text-align: right;
  flex: 1;
  margin-left: 12px;
}

.status-报价中 {
  color: #ff9500;
}

.status-已确认 {
  color: #007aff;
}

.status-执行中 {
  color: #50bfff;
}

.status-已完成 {
  color: #6cc51f;
}

.status-已结算 {
  color: #999;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.btn-info,
.btn-danger {
  flex: 1;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  color: white;
}

.btn-info {
  background-color: #007aff;
}

.btn-danger {
  background-color: #ff3b30;
}
</style>
