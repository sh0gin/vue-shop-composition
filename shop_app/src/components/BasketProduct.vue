<template>
  <div class="cart-item d-flex" :class="{ 'd-none': active }">
    <img :src="props.product.file_url[0]" class="product-image me-3" alt="Товар" />
    <div class="flex-grow-1">
      <h5 class="mb-1">{{ props.product.product_name }}</h5>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <button
            class="btn btn-sm quantity-btn btn-outline-primary"
            @click="minus(props.product.id)"
          >
            -
          </button>
          <span class="mx-3 fw-bold">{{ props.product.count.toLocaleString() }}</span>
          <button
            class="btn btn-sm quantity-btn btn-outline-primary"
            @click="plus(props.product.id)"
          >
            +
          </button>
        </div>
        <div>
          <span class="fw-bold fs-5"
            >{{ props.product.price_for_this_product.toLocaleString() }} ₽</span
          >
          <small class="text t d-block"
            >{{ props.product.price_for_once.toLocaleString() }} за шт.</small
          >
        </div>
      </div>
    </div>
    <button class="btn btn-link text-danger ms-3" @click="deleteAll(props.product.id)">
      <i class="fas fa-trash"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
const activeToken = inject("activeToken");
const apiUrl = inject("apiUrl");

const props = defineProps({
  product: Object,
});
const emit = defineEmits(["minus", "plus", "error"]);
let active = ref(false);

async function minus(product_id) {
  const response = await fetch(
    `${apiUrl.value}api/product/del-one-product/${product_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeToken.value}`,
      },
    }
  );
  if (response.ok) {
    props.product.count -= 1;
    if (props.product.count == 0) {
      active.value = true;
    }
    props.product.price_for_this_product -= props.product.price_for_once;
    emit("minus", props.product.price_for_once);
  }
}
async function plus(product_id) {
  const response = await fetch(
    `${apiUrl.value}api/product/add-one-product/${product_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeToken.value}`,
      },
    }
  );
  if (response.ok) {
    props.product.count += 1;

    props.product.price_for_this_product += props.product.price_for_once;
    emit("plus", props.product.price_for_once);
  } else {
    emit("error");
  }
}

async function deleteAll(product_id) {
  const response = await fetch(
    `${apiUrl.value}api/product/del-all-products/${product_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeToken.value}`,
      },
    }
  );
  active.value = true;
  if (response.ok) {
    emit("delete", props.product.price_for_this_product, props.product.count);
  }
}
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
