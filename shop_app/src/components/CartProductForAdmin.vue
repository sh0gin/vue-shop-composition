<template>
  <div class="order-items">
    <div class="order-item">
      <div class="item-image">
        <img :src="product.image" />
      </div>
      <div class="item-info">
        <h6 class="item-name">{{ product.product }}</h6>
      </div>
      <div class="item-quantity">x{{ product.count }}</div>
      <div class="item-price">{{ product.totalPrice.toLocaleString() }} ₽</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  //   mounted() {
  //   },
};
</script>

<style>
/* Изолированные стили для панели администрирования */
.item-image img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
