<template>
  <div class="cart-item d-flex" :class="{ 'd-none': active }">
    <img :src="product.file_url[0]" class="product-image me-3" alt="Товар" />
    <div class="flex-grow-1">
      <h5 class="mb-1">{{ product.product_name }}</h5>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <button
            class="btn btn-sm quantity-btn btn-outline-primary"
            @click="minus(product.id)"
          >
            -
          </button>
          <span class="mx-3 fw-bold">{{ product.count }}</span>
          <button
            class="btn btn-sm quantity-btn btn-outline-primary"
            @click="plus(product.id)"
          >
            +
          </button>
        </div>
        <div>
          <span class="fw-bold fs-5">{{ product.price_for_this_product }} ₽</span>
          <small class="text t d-block">{{ product.price_for_once }} за шт.</small>
        </div>
      </div>
    </div>
    <button class="btn btn-link text-danger ms-3" @click="deleteAll(product.id)">
      <i class="fas fa-trash"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      active: false,
    };
  },
  methods: {
    async minus(product_id) {
      const response = await fetch(
        `${this.$config.apiUrl}api/product/del-one-product/${product_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$config.activeToken}`,
          },
        }
      );
      if (response.ok) {
        this.product.count -= 1;
        if (this.product.count == 0) {
          this.active = true;
        }
        this.product.price_for_this_product -= this.product.price_for_once;
        this.$emit("minus", this.product.price_for_once);
      }
    },
    async plus(product_id) {
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
      if (response.ok) {
        this.product.count += 1;

        this.product.price_for_this_product += this.product.price_for_once;
        this.$emit("plus", this.product.price_for_once);
      } else {
        this.$emit("error");
      }
    },
    async deleteAll(product_id) {
      const response = await fetch(
        `${this.$config.apiUrl}api/product/del-all-products/${product_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$config.activeToken}`,
          },
        }
      );
      this.active = true;
      if (response.ok) {
        this.$emit("delete", this.product.price_for_this_product, this.product.count);
      }
    },
  },
};
</script>

<style>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  background-color: #333;
  color: white;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  /* Анимация плавного появления */
  z-index: 1000;
}

.toast.visible {
  opacity: 1;
  /* Показываем, когда видимость true */
}

.toast.default {
  background-color: #333;
}

.toast.success {
  background-color: #4caf50;
}

.toast.error {
  background-color: #f44336;
}

.toast.warning {
  background-color: #ff9800;
}
</style>
