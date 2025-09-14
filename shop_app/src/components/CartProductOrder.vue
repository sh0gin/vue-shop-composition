<template>
  <div class="order-items">
    <div class="order-item">
      <img :src="image[0]" class="item-image" />
      <div class="item-info">
        <h6 class="item-name">{{ name }}</h6>
      </div>
      <div class="item-quantity">×{{ count }}</div>
      <div class="item-price">{{ price }} ₽</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "count", "price", "image"],
};
</script>

<style scoped>
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
  margin-top: 20px;
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
