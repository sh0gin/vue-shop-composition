<template>
  <div id="app">
    <!-- Контейнер с изолированными стилями -->
    <div data-v-404-page>
      <div class="error-container">
        <div class="error-card">
          <div class="error-header">
            <i class="bi bi-exclamation-triangle error-icon"></i>
            <h1 class="display-4">404</h1>
          </div>

          <div class="error-body text-center">
            <h2 class="error-title">Страница не найдена</h2>

            <p class="error-description">
              Извините, но страница, которую вы ищете, не существует. Возможно, она была
              перемещена или удалена.
            </p>

            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
              <router-link class="my-conf" to="products">
                <button class="btn btn-gradient me-md-2">
                  <i class="bi bi-house-door me-2 my-conf"></i>На главную
                </button>
              </router-link>
              <!-- <button class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left me-2"></i>Вернуться назад
              </button> -->
            </div>

            <div class="useful-links">
              <h5 class="mb-3">Полезные ссылки</h5>
              <div class="d-flex flex-wrap justify-content-center">
                <router-link to="/products" class="btn btn-sm btn-outline-primary m-1"
                  >Товары</router-link
                >
                <router-link
                  v-if="this.$config.activeToken"
                  to="/basket"
                  class="btn btn-sm btn-outline-primary m-1"
                  >Корзина</router-link
                >
                <router-link
                  v-if="this.$config.activeToken"
                  to="/order"
                  class="btn btn-sm btn-outline-primary m-1"
                  >Заказы</router-link
                >
                <router-link
                  v-if="this.$config.activeToken"
                  to="/balance"
                  class="btn btn-sm btn-outline-primary m-1"
                  >Баланс</router-link
                >
                <router-link
                  v-if="!this.$config.activeToken"
                  to="/rigester"
                  class="btn btn-sm btn-outline-primary m-1"
                  >Регистрация</router-link
                >
                <router-link
                  v-if="!this.$config.activeToken"
                  to="/login"
                  class="btn btn-sm btn-outline-primary m-1"
                  >Вход</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {},
};
</script>

<style>
/* Изолированные стили для страницы 404 */
.my-conf {
  color: white;
}

div[data-v-404-page] {
  --primary-gradient: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  --secondary-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

div[data-v-404-page] body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f9fa;
  color: #343a40;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

div[data-v-404-page] .error-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

div[data-v-404-page] .error-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  transition: transform 0.3s ease;
}

div[data-v-404-page] .error-card:hover {
  transform: translateY(-5px);
}

div[data-v-404-page] .error-header {
  background: var(--primary-gradient);
  color: white;
  padding: 2rem;
  text-align: center;
}

div[data-v-404-page] .error-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

div[data-v-404-page] .error-body {
  padding: 2rem;
}

div[data-v-404-page] .error-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: var(--secondary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

div[data-v-404-page] .error-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #6c757d;
}

div[data-v-404-page] .btn-gradient {
  background: var(--primary-gradient);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

div[data-v-404-page] .btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  color: white;
}

div[data-v-404-page] .search-box {
  position: relative;
  margin-bottom: 2rem;
}

div[data-v-404-page] .search-box input {
  border-radius: 50px;
  padding-left: 20px;
  padding-right: 50px;
  border: 1px solid #ced4da;
  height: 50px;
}

div[data-v-404-page] .search-box button {
  position: absolute;
  right: 5px;
  top: 5px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: var(--primary-gradient);
  color: white;
  border: none;
}

div[data-v-404-page] .useful-links {
  border-top: 1px solid #e9ecef;
  padding-top: 1.5rem;
  margin-top: 2rem;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  div[data-v-404-page] .error-title {
    font-size: 2.5rem;
  }

  div[data-v-404-page] .error-icon {
    font-size: 4rem;
  }
}
</style>
