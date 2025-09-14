<template>
  <div class="error-container" :class="[type, { dismissible }]">
    <div class="error-content">
      <div class="error-icon">
        <slot name="icon">
          <span v-html="iconSvg"></span>
        </slot>
      </div>

      <div class="error-details">
        <h3 v-if="title" class="error-title">{{ title }}</h3>
        <p class="error-message">{{ message }}</p>

        <div v-if="$slots.default" class="error-actions">
          <slot></slot>
        </div>
      </div>

      <button
        v-if="dismissible"
        @click="$emit('dismiss')"
        class="error-close"
        aria-label="Закрыть"
      >
        <span v-html="closeSvg"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorDisplay",
  props: {
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "error",
      validator: (value) => ["error", "warning", "info", "success"].includes(value),
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    iconSvg() {
      const icons = {
        error: "❌",
        warning: "⚠️",
        info: "ℹ️",
        success: "✅",
      };
      return icons[this.type] || icons.error;
    },
    closeSvg() {
      return "×";
    },
  },
  emits: ["dismiss"],
};
</script>

<style scoped>
.error-container {
  border: 1px solid;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.error-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  position: relative;
}

.error-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.error-details {
  flex: 1;
}

.error-title {
  margin: 0 0 8px 0;
  font-weight: 600;
  font-size: 16px;
}

.error-message {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #666;
}

.error-actions {
  margin-top: 12px;
}

.error-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  flex-shrink: 0;
}

.error-close:hover {
  color: #666;
}

/* Типы ошибок */
.error-container.error {
  border-color: #f44336;
  background-color: #ffebee;
}

.error-container.warning {
  border-color: #ff9800;
  background-color: #fff3e0;
}

.error-container.info {
  border-color: #2196f3;
  background-color: #e3f2fd;
}

.error-container.success {
  border-color: #4caf50;
  background-color: #e8f5e8;
}

/* Анимация */
.error-container {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .error-content {
    flex-direction: column;
    gap: 8px;
  }

  .error-close {
    position: absolute;
    top: 8px;
    right: 8px;
  }
}
</style>
