<template>
  <div class="order-card mt-4">
    <div class="order-header">
      <div class="order-info">
        <h5 class="order-number">Заказ #{{ object.track_code }}</h5>
        <p class="order-date">{{ object.data_of_creation }}</p>
      </div>
      <div class="order-status" :class="status_active">
        <i class="fas fa-clock me-1"></i>{{ object.status }}
      </div>
    </div>

    <div v-for="product in object.products">
      <CartProductForAdmin :product="product"></CartProductForAdmin>
    </div>

    <div class="order-summary">
      <div class="summary-row">
        <!-- <span>Стоимость товаров:</span>
        <span>{{ object.general_price }}</span> -->
      </div>
      <!-- <div class="summary-row">
        <span>Доставка:</span>
        <span>Бесплатно</span>
      </div> -->
      <div class="summary-row total">
        <span>Итого:</span>
        <span class="total-price">{{ object.general_price }} ₽</span>
      </div>
    </div>

    <div class="order-actions">
      <div class="status-selector">
        <label class="form-label">Изменить статус:</label>
        <select class="form-select" v-model="choise">
          <option value="processing">Заказ в обработке</option>
          <option value="cancelled">Отменён</option>
          <option value="ready">Готов к получению</option>
        </select>
        <input
          v-if="choise === 'cancelled'"
          type="text"
          class="form-control mt-2"
          placeholder="Укажите причину отмены"
          v-model="message"
        />
      </div>
      <button class="btn btn-primary" @click="change_status(object.id)">
        <i class="fas fa-save me-1"></i>Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import CartProductForAdmin from "@/components/CartProductForAdmin.vue";

export default {
  data() {
    return {
      status_active: "status-cancelled",
      choise: "ready",
      message: "",
    };
  },
  props: ["object"],
  methods: {
    async change_status(id) {
      const raw = JSON.stringify({
        action: this.choise,
        text: this.message,
      });

      const response = await fetch(`${this.$config.apiUrl}api/change-status/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$config.activeToken}`,
        },
        body: raw,
      });
      if (response.ok) {
        if (this.choise == "ready") {
          this.object.status = "Готов к получению";
          this.status_active = "status-delivered";
          this.$emit("handler");
        } else if (this.choise == "cancelled") {
          this.object.status = "Отменён";
          this.status_active = "status-cancelled";
          this.$emit("handler");
        } else {
          this.object.status = "Заказ в обработке";
          this.status_active = "status-processing";
          this.$emit("back");
        }
      }
    },
  },
  mounted() {
    if (this.object.status == "Отмена") {
      this.status_active = "status-cancelled";
    } else if (this.object.status == "Заказ в обработке") {
      this.status_active = "status-processing";
    } else if (this.object.status == "Готов к получению") {
      this.status_active = "status-delivered";
    }
    // console.log(this.object.status);
  },
  components: { CartProductForAdmin },
};
</script>

<style>
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
