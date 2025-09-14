<template>
  <div class="container mb-5">
    <!-- Заголовок страницы -->
    <div class="text-center mb-4" style="margin-top: 67px">
      <h1 class="page-title"><i class="fas fa-shopping-cart me-2"></i>Моя корзина</h1>
      <error v-if="title" :title="title" :type="type" @dismiss="title = false"></error>
    </div>

    <div class="row" v-if="activeToken && userInfo && !loader">
      <!-- Левая колонка - Данные пользователя -->
      <div class="col-lg-4 mb-4">
        <div class="user-section p-4">
          <div class="text-center mb-4">
            <h4>{{ userInfo.first_name }} {{ userInfo.last_name }}</h4>
          </div>

          <div class="user-info">
            <div class="d-flex justify-content-between mb-2">
              <span>Email:</span>
              <strong>{{ userInfo.email }}</strong>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Баланс:</span>
              <strong>{{ userInfo.balance.toLocaleString() }}</strong>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Роль:</span>
              <strong>{{ userInfo.role }}</strong>
            </div>

            <hr class="my-3 bg-light" />
          </div>

          <div class="mt-4">
            <a href="#" class="btn btn-outline-light w-100">
              <i class="fas fa-history me-2"></i>История заказов
            </a>
          </div>
        </div>
      </div>

      <!-- Правая колонка - Корзина -->
      <div class="col-lg-8 product">
        <div class="cart-container p-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="mb-0">Товары в корзине</h3>
            <span v-if="products.value" class="badge bg-primary"
              >{{ products.data.totalCount }} товара</span
            >
          </div>

          <!-- Элементы корзины -->
          <div v-if="products">
            <div class="cart-items" v-for="item in products.data.basket">
              <basket-product
                :product="item"
                @minus="minus"
                @plus="plus"
                @delete="deleteAll"
                @error="amount_error"
              ></basket-product>
            </div>
            <!-- Итоги корзины -->
            <div class="summary-card p-4 mt-4">
              <h5 class="text-white mb-4">Итог заказа</h5>
              <div class="d-flex justify-content-between mb-2">
                <span>Товары ({{ products.data.totalCount.toLocaleString() }}):</span>
                <strong>{{ products.data.totalSum.toLocaleString() }} ₽</strong>
              </div>
              <!-- <div class="d-flex justify-content-between mb-2">
                <span>Скидка:</span>
                <strong class="text-warning">-5 000 ₽</strong>
              </div> -->
              <div class="d-flex justify-content-between mb-2">
                <span>Доставка:</span>
                <strong class="text-success">Бесплатно</strong>
              </div>
              <hr class="bg-light" />
              <div class="d-flex justify-content-between mb-3">
                <span class="fs-5">Итого:</span>
                <strong class="fs-4"
                  >{{ products.data.totalSum.toLocaleString() }} ₽</strong
                >
              </div>
              <button class="btn btn-checkout w-100 text-white" @click="order">
                <i class="fas fa-lock me-2 conf-my"></i>Оформить заказ
              </button>
            </div>
          </div>

          <div v-else>
            <h1>
              <router-link to="/products">Товаров нет, добавьте же их!</router-link>
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="unauth-container" v-else-if="!activeToken">
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

<script setup>
import BasketProduct from "../components/BasketProduct.vue";
import Error from "../components/Error.vue";
import { ref, onMounted, inject } from "vue";

let userInfo = ref(null);
let products = ref(null);
let loader = ref(true);
let activeError = ref(false);
let activeSuccess = ref(false);
const activeToken = inject("activeToken");
const apiUrl = inject("apiUrl");
let title = ref("");
let type = ref("error");

async function order() {
  const response = await fetch(`${apiUrl.value}api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${activeToken.value}`,
    },
  });

  if (response.ok) {
    title = "Заказ создан";
    type = "success";
    userInfo.balance -= products.value.data.totalSum;
    products.value = null;
  } else if (response.status === 403) {
    title = "Чтобы оформить заказ, в корзине должны быть товары";
    type = "error";
  } else if (response.status === 402) {
    title = "Недостаточно средств";
    type = "error";
  }
}
function amount_error() {
  title = "Товара больше нет в наличии";
  type = "error";
}
function minus(price_for_once_product) {
  products.value.data.totalSum -= price_for_once_product;
  products.value.data.totalCount -= 1;
  title = false;
}
function deleteAll(price_for_this_product, count) {
  products.value.data.totalSum -= price_for_this_product;
  products.value.data.totalCount -= count;
  title = false;
}
function plus(price_for_once_product) {
  products.value.data.totalSum += price_for_once_product;
  products.value.data.totalCount += 1;
  title = false;
}
async function load() {
  const response = await fetch(`${apiUrl.value}api/get-user-info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${activeToken.value}`,
    },
  });
  userInfo.value = await response.json();
  userInfo.value = userInfo.value.data.user;

  const product = await fetch(`${apiUrl.value}api/basket`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${activeToken.value}`,
    },
  });
  products.value = await product.json();
  loader.value = false;
}

onMounted(async () => {
  await load();
});
</script>

<style>
.conf-my {
  color: white;
}

.fa-sign-in-alt {
  color: white;
}

.mt-2 {
  color: white;
}

body {
  background-color: #f8f9fa;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
}

.user-section {
  background: linear-gradient(135deg, #d1d1d1 0%, #224abe 100%);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.cart-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.cart-item {
  border-bottom: 1px solid #e3e6f0;
  padding: 1.5rem 0;
  transition: background-color 0.3s;
}

.cart-item:hover {
  background-color: #f8f9fc;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.quantity-btn {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.summary-card {
  background: linear-gradient(135deg, #36b9cc 0%, #1cc88a 100%);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-checkout {
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  border: none;
  padding: 12px 30px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-checkout:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(78, 115, 223, 0.4);
}

.page-title {
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 2rem;
}

.unauth-container {
  max-width: 600px;
  margin: 2rem auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.unauth-header {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.unauth-body {
  padding: 2rem;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.5rem;
}

.btn-auth {
  padding: 12px 30px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s;
  margin: 0 10px;
}

.btn-login {
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  border: none;
  color: white;
}

.btn-register {
  background: white;
  border: 2px solid #4e73df;
  color: #ffffff;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(78, 115, 223, 0.4);
}

.btn-register:hover {
  background: #f8f9ff;
  transform: translateY(-2px);
}

.benefits-list {
  background: #f8f9fc;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.benefit-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.benefit-item i {
  color: #4e73df;
  font-size: 1.2rem;
  margin-right: 1rem;
  width: 24px;
}
</style>
