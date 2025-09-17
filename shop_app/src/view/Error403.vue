<template>
  <div class="error-page">
    <div class="error-header">
      <div class="error-icon">🚫</div>
      <h1 class="error-title">Доступ запрещен</h1>
      <p class="error-code">Ошибка 403</p>
    </div>

    <div class="error-content">
      <p class="error-message">
        У вас нет необходимых прав для доступа к этой странице. Это может произойти по
        нескольким причинам, включая ограничения прав доступа или необходимость
        авторизации.
      </p>

      <div class="error-actions">
        <router-link to="/products" class="btn btn-primary">
          <span>⟵</span> Вернуться на главную
        </router-link>
      </div>

      <div class="error-help">
        <h4>Что можно сделать?</h4>
        <ul>
          <li>Проверьте, правильно ли вы вошли в систему</li>
          <li>Убедитесь, что у вас есть необходимые права доступа</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

body {
  background-color: #f5f5f5;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.error-page {
  max-width: 600px;
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: slideIn 0.5s ease;
}

.error-header {
  background: #ff5252;
  color: white;
  padding: 24px;
  text-align: center;
}

.error-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.error-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.error-code {
  font-size: 18px;
  opacity: 0.9;
}

.error-content {
  padding: 32px;
}

.error-message {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 24px;
  color: #666;
}

.error-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.btn {
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: #ff5252;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #e04545;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: #666;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background: #f9f9f9;
  transform: translateY(-2px);
}

.error-help {
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
}

.error-help h4 {
  margin-bottom: 8px;
  color: #444;
}

.error-help ul {
  padding-left: 20px;
  line-height: 1.6;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .error-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
