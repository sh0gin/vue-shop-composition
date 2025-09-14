<template>
  <div class="product-card card h-100">
    <img :src="product.file_url[0]" :alt="product.name" class="product-image" />

    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="product-category"> {{ product.category }} </span>
        <span class="product-quantity" :class="getQuantityClass(product.quantity)">
          {{ product.quantity }} в наличии
        </span>
      </div>

      <h5 class="card-title">{{ product.name }}</h5>

      <div class="d-flex justify-content-between align-items-center mt-3">
        <span class="product-price">{{ product.price.toLocaleString() }} ₽</span>
        <button
          class="btn btn-add-to-cart"
          :disabled="product.quantity == 0"
          @click="ProductInBasket(product.id)"
        >
          <i class="fas fa-shopping-cart me-2"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { RouterLink } from "vue-router";

export default {
  methods: {
    getQuantityClass(quantity) {
      if (quantity > 100) return "quantity-high";
      if (quantity > 10) return "quantity-medium";
      return "quantity-low";
    },
    async ProductInBasket(product_id) {
      if (this.$config.activeToken) {
        const response = await fetch(
          `${this.$config.apiUrl}api/product/add-one-product/${product_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$config.activeToken}`,
            },
          }
        );
        let result = await response.json();
        this.product.quantity -= 1;
      } else {
        this.$router.push("/login"); // и должно быть предуреждение о том, что пользователь незарегистророван
      }
    },
  },
  props: ["product"],
};
</script>

<style>
:root {
  --primary-color: #43cea2;
  --secondary-color: #185a9d;
  --text-color: #333;
  --light-bg: #f8f9fa;
}

.products-wrapper {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  min-height: 100vh;
  padding: 85px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.products-header {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.product-image {
  height: 200px;
  object-fit: cover;
  width: 100%;
}

.product-category {
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.product-price {
  color: var(--secondary-color);
  font-weight: 700;
  font-size: 1.4rem;
}

.product-quantity {
  font-size: 0.9rem;
}

.quantity-high {
  color: #28a745;
}

.quantity-medium {
  color: #ffc107;
}

.quantity-low {
  color: #dc3545;
}

.btn-add-to-cart {
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  border: none;
  border-radius: 25px;
  padding: 10px 25px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-add-to-cart:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.search-box {
  border-radius: 25px;
  border: 2px solid var(--primary-color);
  padding: 10px 20px;
}

.filter-buttons .btn {
  border-radius: 20px;
  margin: 0 5px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 15px;
}
</style>
