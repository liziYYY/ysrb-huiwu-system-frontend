<template>
  <view class="container">
    <form @submit.prevent="submitForm">
      <view class="form-group">
        <label class="form-label">项目名称 *</label>
        <input v-model="form.projectName" type="text" class="form-input" placeholder="请输入项目名称" />
      </view>

      <view class="form-group">
        <label class="form-label">客户名称 *</label>
        <input v-model="form.customerName" type="text" class="form-input" placeholder="请输入客户名称" />
      </view>

      <view class="form-group">
        <label class="form-label">联系人</label>
        <input v-model="form.contactPerson" type="text" class="form-input" placeholder="请输入联系人" />
      </view>

      <view class="form-group">
        <label class="form-label">联系电话</label>
        <input v-model="form.contactPhone" type="tel" class="form-input" placeholder="请输入联系电话" />
      </view>

      <view class="form-group">
        <label class="form-label">项目日期 *</label>
        <picker mode="date" :value="form.projectDate" @change="onDateChange">
          <input type="text" class="form-input" :value="form.projectDate" disabled />
        </picker>
      </view>

      <view class="form-group">
        <label class="form-label">项目预算</label>
        <input v-model="form.budget" type="number" class="form-input" placeholder="请输入项目预算" />
      </view>

      <view class="form-group">
        <label class="form-label">项目状态</label>
        <picker :range="statusOptions" @change="onStatusChange">
          <input type="text" class="form-input" :value="form.status" disabled />
        </picker>
      </view>

      <view class="form-group">
        <label class="form-label">备注</label>
        <textarea v-model="form.remark" class="form-textarea" placeholder="请输入备注" />
      </view>

      <view class="button-group">
        <button class="btn-cancel" @click="goBack">取消</button>
        <button class="btn-submit" @click="submitForm" :loading="loading">提交</button>
      </view>
    </form>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { createProject } from '@/src/api/project';

const form = ref({
  projectName: '',
  customerName: '',
  contactPerson: '',
  contactPhone: '',
  projectDate: '',
  budget: '',
  status: '报价中',
  remark: ''
});

const statusOptions = ['报价中', '已确认', '执行中', '已完成', '已结算'];
const loading = ref(false);

const onDateChange = (e) => {
  form.value.projectDate = e.detail.value;
};

const onStatusChange = (e) => {
  form.value.status = statusOptions[e.detail.value];
};

const submitForm = async () => {
  if (!form.value.projectName || !form.value.customerName) {
    uni.showToast({
      title: '请填写必填项',
      icon: 'none'
    });
    return;
  }

  try {
    loading.value = true;
    await createProject(form.value);
    uni.showToast({
      title: '项目创建成功',
      icon: 'success'
    });
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);
  } catch (error) {
    console.error('Failed to create project:', error);
    uni.showToast({
      title: '项目创建失败',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  uni.navigateBack();
};
</script>

<style scoped>
.container {
  padding: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn-cancel,
.btn-submit {
  flex: 1;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.btn-cancel {
  background-color: #ddd;
  color: #333;
}

.btn-submit {
  background-color: #007aff;
  color: white;
}
</style>
