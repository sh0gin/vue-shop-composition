<template>
  <div class="admin-orders-container">
    <div class="row" v-if="!loader">
      <!-- Левая колонка - Меню управления -->
      <div class="col-lg-3">
        <div class="admin-menu">
          <div class="menu-header">
            <h4><i class="fas fa-cog me-2"></i>Управление заказами</h4>
          </div>

          <div class="menu-stats">
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
                <span class="stat-label">Обработанные</span>
                <span class="stat-value">{{ status.handled }}</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="stat-info">
                <span class="stat-label">Необработанные</span>
                <span class="stat-value">{{ status.non_handled }}</span>
              </div>
            </div>
          </div>

          <div class="menu-filters">
            <h6>Фильтры:</h6>
            <div
              class="filter-option"
              :class="{ active: active == 0 }"
              @click="loadData(0)"
            >
              <i class="fas fa-list me-2"></i>Все заказы
            </div>
            <div
              class="filter-option"
              :class="{ active: active == 2 }"
              @click="loadData(2)"
            >
              <i class="fas fa-check-circle me-2"></i>Обработанные
            </div>
            <div
              class="filter-option"
              :class="{ active: active == 1 }"
              @click="loadData(1)"
            >
              <i class="fas fa-clock me-2"></i>Необработанные
            </div>
          </div>
        </div>
      </div>

      <!-- Правая колонка - Список заказов -->
      <div class="col-lg-9">
        <div class="admin-content">
          <!-- Заголовок -->
          <div class="content-header mb-4 white">
            <h1 class="admin-title white">
              <i class="fas fa-tasks me-3"></i>Панель администрирования
            </h1>
            <p class="admin-subtitle">Управление статусами заказов</p>
          </div>

          <!-- Список заказов -->
          <div class="orders-list">
            <!-- Необработанные заказы -->
            <div class="orders-group mb-5" v-for="value in orders">
              <cart-admin-order
                :object="value"
                @handler="handler()"
                @back="back()"
              ></cart-admin-order>
            </div>
          </div>
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
  </div>
</template>

<script>
import CartAdminOrder from "@/components/CartAdminOrder.vue";
export default {
  data() {
    return {
      orders: [],
      status: null,
      loader: true,
      active: 0,
    };
  },
  methods: {
    handler() {
      this.status.handled++;
      this.status.non_handled--;
    },
    back() {
      this.status.handled--;
      this.status.non_handled++;
    },
    async loadData(number) {
      this.orders = [];
      this.active = number;
      const response = await fetch(
        `${this.$config.apiUrl}api/order/get-all-order/${number}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$config.activeToken}`,
          },
        }
      );
      this.active = number;
      let result = await response.json();
      this.orders = result.data;
      this.loader = false;
      this.status = result.status;
    },
  },
  async mounted() {
    await this.loadData(0);
  },

  components: { CartAdminOrder },
};
</script>

<style>
/* Изолированные стили для панели администрирования */
.admin-orders-container {
  --primary-gradient: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  --secondary-gradient: linear-gradient(135deg, #1cc88a 0%, #13855c 100%);
  --warning-gradient: linear-gradient(135deg, #f6c23e 0%, #dda20a 100%);
  --danger-gradient: linear-gradient(135deg, #e74a3b 0%, #be2617 100%);
}

.admin-orders-container body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f9fa;
  color: #343a40;
  min-height: 100vh;
  padding: 20px 0;
}

.admin-orders-container {
  padding: 2rem 0;
  background: none;
  min-height: 100vh;
}

.white {
  color: white;
}

/* Левое меню */
.admin-orders-container .admin-menu {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.admin-orders-container .menu-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
}

.admin-orders-container .menu-header h4 {
  color: #2c3e50;
  margin: 0;
}

.admin-orders-container .menu-stats {
  margin-bottom: 2rem;
}

.admin-orders-container .stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.admin-orders-container .stat-item:last-child {
  border-bottom: none;
}

.admin-orders-container .stat-icon {
  width: 40px;
  height: 40px;
  background: var(--primary-gradient);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.admin-orders-container .stat-label {
  display: block;
  color: #6c757d;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.admin-orders-container .stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
}

.admin-orders-container .menu-filters {
  margin-bottom: 2rem;
}

.admin-orders-container .menu-filters h6 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
}

.admin-orders-container .filter-option {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6c757d;
}

.admin-orders-container .filter-option:hover {
  background: #f8f9fa;
  color: #4e73df;
}

.admin-orders-container .filter-option.active {
  background: #4e73df;
  color: white;
}

/* Правая часть с заказами */
.admin-orders-container .admin-content {
  padding-left: 2rem;
}

.admin-orders-container .content-header {
  text-align: left;
}

.admin-orders-container .admin-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  margin-top: 42px;
}

.admin-orders-container .admin-subtitle {
  font-size: 1.2rem;
  color: #6c757d;
}

.admin-orders-container .orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.admin-orders-container .orders-group {
  margin-bottom: 2.5rem;
}

.admin-orders-container .group-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f8f9fa;
}

.admin-orders-container .order-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.admin-orders-container .order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
}

.admin-orders-container .order-number {
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.admin-orders-container .order-date {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.admin-orders-container .order-customer {
  color: #2c3e50;
  font-weight: 500;
  margin: 0;
}

.admin-orders-container .order-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.admin-orders-container .status-pending {
  background: #fff3cd;
  color: #856404;
}

.admin-orders-container .status-ready {
  background: #d4edda;
  color: #155724;
}

.admin-orders-container .status-cancelled {
  background: #f8d7da;
  color: #721c24;
}

.admin-orders-container .order-items {
  margin-bottom: 1.5rem;
}

.admin-orders-container .order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f8f9fa;
}

.admin-orders-container .order-item:last-child {
  border-bottom: none;
}

.admin-orders-container .item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.admin-orders-container .item-info {
  flex: 1;
}

.admin-orders-container .item-name {
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.admin-orders-container .item-details {
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0;
}

.admin-orders-container .item-quantity {
  color: #6c757d;
  font-weight: 600;
}

.admin-orders-container .item-price {
  color: #2c3e50;
  font-weight: 700;
  min-width: 80px;
  text-align: right;
}

.admin-orders-container .order-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
}

.admin-orders-container .summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.admin-orders-container .summary-row.total {
  border-top: 2px solid #dee2e6;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1.1rem;
}

.admin-orders-container .total-price {
  color: #4e73df;
  font-size: 1.2rem;
}

.admin-orders-container .order-actions {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f8f9fa;
}

.admin-orders-container .status-selector {
  flex: 1;
}

.admin-orders-container .form-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.admin-orders-container .form-select {
  border-radius: 8px;
  padding: 0.5rem;
}

.admin-orders-container .btn {
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  height: fit-content;
}

.admin-orders-container .btn:hover {
  transform: translateY(-1px);
}

.admin-orders-container .btn-primary {
  background: var(--primary-gradient);
  border: none;
}

@media (max-width: 992px) {
  .admin-orders-container .admin-content {
    padding-left: 0;
    padding-top: 2rem;
  }

  .admin-orders-container .admin-menu {
    position: static;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .admin-orders-container .admin-title {
    font-size: 2rem;
  }

  .admin-orders-container .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .admin-orders-container .order-item {
    flex-wrap: wrap;
  }

  .admin-orders-container .order-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
