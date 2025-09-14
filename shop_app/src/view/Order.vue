<template>
  <div class="orders-container my-comp" v-if="this.$config.activeToken">
    <div class="row">
      <!-- Левая колонка - Меню истории заказов -->
      <div class="col-lg-3">
        <div class="orders-menu">
          <div class="menu-header">
            <h4><i class="fas fa-history me-2"></i>История заказов</h4>
          </div>

          <div class="menu-stats" v-if="status">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-shopping-cart"></i>
              </div>
              <div class="stat-info">
                <span class="stat-label">Всего заказов</span>
                <span class="stat-value">{{ status.total }}</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="stat-info">
                <span class="stat-label">Завершённые</span>
                <span class="stat-value">{{ status.approved }}</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="stat-info">
                <span class="stat-label">Отменённые</span>
                <span class="stat-value">{{ status.denied }}</span>
              </div>
            </div>
          </div>
          <div class="loading-container" v-else>
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Загрузка...</span>
              </div>
              <p class="mt-2">Загрузка данных...</p>
            </div>
          </div>

          <div class="menu-filters">
            <h6>Фильтры:</h6>
            <div class="filter-option" :class="{ active: active == 4 }" @click="load(4)">
              <i class="fas fa-list me-2"></i>Все заказы
            </div>

            <div class="filter-option" :class="{ active: active == 2 }" @click="load(2)">
              <i class="fas fa-truck me-2"></i>Доставленные
            </div>
            <div class="filter-option" :class="{ active: active == 1 }" @click="load(1)">
              <i class="fas fa-truck me-2"></i>В обработке
            </div>
            <div class="filter-option" :class="{ active: active == 3 }" @click="load(3)">
              <i class="fas fa-times me-2"></i>Отменённые
            </div>
          </div>
        </div>
      </div>

      <!-- Правая колонка - Список заказов -->
      <div class="col-lg-9">
        <div class="orders-content">
          <!-- Заголовок -->
          <div class="content-header mb-4">
            <h1 class="orders-title">
              <i class="fas fa-shopping-bag me-3"></i>Мои заказы
            </h1>
            <p class="orders-subtitle">История всех ваших покупок</p>
          </div>

          <!-- Список заказов -->
          <div class="orders-list" v-if="order && !loader" v-for="orders in order">
            <cart-orders
              :code="orders.track_code"
              :id="orders.id"
              :products_in_order="orders.products"
              :general_price="orders.general_price"
              :status="orders.status"
              :data="orders.data_of_creation"
              :image="orders.image"
            ></cart-orders>
          </div>

          <div class="empty-orders orders-list" v-else-if="!order">
            <h3 class="not-order">У вас пока нет заказов</h3>
            <p class="empty-text not-order">
              Совершите первую покупку и она появится здесь
            </p>
            <button class="btn btn-primary btn-lg">
              <i class="fas fa-shopping-cart me-2"></i>Перейти к покупкам
            </button>
          </div>
          <div class="loading-container" v-else>
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Загрузка...</span>
              </div>
              <p class="mt-2">Загрузка данных...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="unauth-container" v-else-if="!this.$config.activeToken">
    <div class="unauth-header">
      <div class="icon-wrapper">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <h3>Требуется авторизация</h3>
      <p>Чтобы получить доступ к корзине, пожалуйста, войдите в систему</p>
    </div>

    <div class="unauth-body">
      <div class="text-center mb-4">
        <h4>Вы не авторизованы</h4>
        <p class="text-muted">
          Авторизуйтесь, чтобы получить доступ ко всем возможностям
        </p>
      </div>

      <div class="benefits-list">
        <h5 class="mb-3">Преимущества авторизации:</h5>
        <div class="benefit-item">
          <i class="fas fa-shopping-cart"></i>
          <span>Сохранение товаров в корзине</span>
        </div>
        <div class="benefit-item">
          <i class="fas fa-truck"></i>
          <span>Быстрое оформление заказов</span>
        </div>
        <div class="benefit-item">
          <i class="fas fa-percent"></i>
          <span>Персональные скидки и акции</span>
        </div>
      </div>

      <div class="text-center">
        <div class="d-flex justify-content-center mb-3">
          <button class="btn btn-login" @click="goToLogin">
            <router-link class="fas fa-sign-in-alt me-2" to="/login">Войти</router-link>
          </button>

          <button class="btn btn-login" @click="goToRegister">
            <router-link class="fas fa-sign-in-alt me-2" to="/register"
              >Регистрация</router-link
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartOrders from "@/components/CartOrders.vue";

export default {
  name: "UserOrders",
  data() {
    return {
      order: false,
      loader: true,
      status: null,
      active: 4,
    };
  },
  methods: {
    async load(status) {
      this.order = [];
      this.active = status;
      const raw = JSON.stringify({
        status_id: status,
      });
      const response = await fetch(`${this.$config.apiUrl}api/orders/get-orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$config.activeToken}`,
        },
        body: raw,
      });

      this.order = await response.json();
      this.status = this.order.totalStatus;
      this.order = this.order.data;
    },
  },
  components: {
    CartOrders,
  },
  async created() {
    await this.load(4);
    this.loader = false;
  },
};
</script>

<style scoped>
.not-order {
  color: white;
}

.orders-container {
  padding: 2rem 0;
  background: none;
  min-height: 100vh;
}

.my-comp {
  margin-top: 65px;
}

/* Левое меню */
.orders-menu {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.menu-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
}

.menu-header h4 {
  color: #2c3e50;
  margin: 0;
}

.menu-stats {
  margin-bottom: 2rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.stat-label {
  display: block;
  color: #6c757d;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
}

.menu-filters {
  margin-bottom: 2rem;
}

.menu-filters h6 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
}

.filter-option {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6c757d;
}

.filter-option:hover {
  background: #f8f9fa;
  color: #4e73df;
}

.filter-option.active {
  background: #4e73df;
  color: white;
}

.menu-recent h6 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
}

.recent-order {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.recent-order:last-child {
  border-bottom: none;
}

.recent-info {
  display: flex;
  flex-direction: column;
}

.recent-number {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
}

.recent-date {
  color: #6c757d;
  font-size: 0.8rem;
}

.recent-amount {
  font-weight: 700;
  color: #4e73df;
}

/* Правая часть с заказами */
.orders-content {
  padding-left: 2rem;
}

.content-header {
  text-align: left;
}

.orders-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.orders-subtitle {
  font-size: 1.2rem;
  color: #ffffff;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
}

.order-number {
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.order-date {
  color: #6c757d;
  font-size: 0.9rem;
}

.order-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.status-processing {
  background: #fff3cd;
  color: #856404;
}

.status-shipped {
  background: #cce7ff;
  color: #004085;
}

.status-delivered {
  background: #d4edda;
  color: #155724;
}

.status-cancelled {
  background: #f8d7da;
  color: #721c24;
}

.order-items {
  margin-bottom: 1.5rem;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.item-info {
  flex: 1;
}

.item-name {
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.item-details {
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0;
}

.item-quantity {
  color: #6c757d;
  font-weight: 600;
}

.item-price {
  color: #2c3e50;
  font-weight: 700;
  min-width: 80px;
  text-align: right;
}

.order-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.summary-row.total {
  border-top: 2px solid #dee2e6;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1.1rem;
}

.total-price {
  color: #4e73df;
  font-size: 1.2rem;
}

.order-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f8f9fa;
}

.btn {
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-outline-primary {
  border-color: #4e73df;
  color: #4e73df;
}

.btn-outline-primary:hover {
  background: #4e73df;
  color: white;
}

.btn-outline-success {
  border-color: #1cc88a;
  color: #1cc88a;
}

.btn-outline-success:hover {
  background: #1cc88a;
  color: white;
}

.btn-outline-danger {
  border-color: #e74a3b;
  color: #e74a3b;
}

.btn-outline-danger:hover {
  background: #e74a3b;
  color: white;
}

@media (max-width: 992px) {
  .orders-content {
    padding-left: 0;
    padding-top: 2rem;
  }

  .orders-menu {
    position: static;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .orders-title {
    font-size: 2rem;
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .order-item {
    flex-wrap: wrap;
  }

  .order-actions {
    flex-wrap: wrap;
  }

  .order-actions .btn {
    flex: 1;
    min-width: 120px;
  }
}
</style>
