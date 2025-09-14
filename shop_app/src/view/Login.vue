<template>
  <div id="app">
    <div class="login-container">
      <div class="login-card card">
        <div class="card-body p-5">
          <div class="text-center mb-4">
            <h2 class="card-title fw-bold">Добро пожаловать</h2>
            <div class="header-divider"></div>
            <p class="text-muted">Введите свои данные для входа в систему</p>
          </div>

          <!-- Общие ошибки -->
          <div
            v-if="general_error"
            class="alert alert-error alert-dismissible fade show mb-4"
            role="alert"
          >
            {{ general_error }}
            <button
              type="button"
              class="btn-close"
              @click="general_error = null"
            ></button>
          </div>

          <form @submit.prevent="login">
            <div class="form-group" :class="{ 'has-error': errors.email_error }">
              <div class="position-relative">
                <div class="input-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <input
                  type="email"
                  class="form-control ps-5"
                  placeholder="Email"
                  v-model="email"
                />
              </div>
              <div v-if="errors.email_error" class="error-message mt-2">
                <small class="red">{{ errors.email_error }}</small>
              </div>
            </div>

            <div class="form-group" :class="{ 'has-error': errors.password_error }">
              <div class="position-relative">
                <div class="input-icon">
                  <i class="fas fa-lock"></i>
                </div>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control ps-5"
                  placeholder="Пароль"
                  v-model="password"
                />
                <span class="password-toggle" @click="showPassword = !showPassword">
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </span>
              </div>
              <div v-if="errors.password_error" class="error-message mt-2">
                <small class="red">{{ errors.password_error }}</small>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-login w-100 py-2 mb-3"
              :disabled="loading"
              @click.prevent="login"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              {{ loading ? "Вход..." : "Войти" }}
            </button>

            <div class="register-link text-center">
              Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, reactive } from "vue";
import { useRouter } from "vue-router";

let email = ref("admin@mail.ru");
let password = ref("Password1");
let errors = reactive({
  email_error: ref(null),
  password_error: ref(null),
});
// let email_error = ref(null);
// let password_error = ref(null);
let showPassword = ref(true);
const setActiveToken = inject("setActiveToken");
const setUserStatus = inject("setUserStatus");
const apiUrl = inject("apiUrl");
const router = useRouter();

async function login() {
  errors.password_error = null;
  errors.email_error = null;

  const raw = JSON.stringify({
    email: email.value,
    password: password.value,
  });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let response = await fetch(`${apiUrl.value}api/login`, requestOptions);

  let result = await response.json();
  if (result?.data?.code == 200) {
    errors.email_error = "";
    errors.password_error = "";
    localStorage.setItem("token", result.data.token);
    setActiveToken(result.data.token);
    setUserStatus(result.data.user.role);
    router.push("/products");
  } else {
    if ("error" in result) {
      Object.keys(result.error.error).forEach(
        // переделит в целом под composition
        (key_word) => (errors[`${key_word}_error`] = result.error.error[key_word][0])
      );
    } else {
      password_error = "Ошибка в логине или пароле";
    }
  }
}

// return {
//   email,
//   password,
//   email_error,
//   password_error,
//   showPassword,
//   login,
// };
</script>

<style>
body {
  background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.red {
  color: red;
}

.login-container {
  max-width: 500px;
  width: 100%;
}

.login-card {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.header-divider {
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, #43cea2, #185a9d);
  border-radius: 2px;
  margin: 15px auto;
}

.form-control:focus {
  border-color: #43cea2;
  box-shadow: 0 0 0 0.25rem rgba(67, 206, 162, 0.25);
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #43cea2;
  z-index: 5;
}

.btn-login {
  background: linear-gradient(to right, #43cea2, #185a9d);
  border: none;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s;
  padding: 12px;
}

.btn-login:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to right, #36b592, #134b80);
}

.register-link a {
  color: #43cea2;
  font-weight: 600;
  text-decoration: none;
}

.register-link a:hover {
  color: #185a9d;
  text-decoration: underline;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6c757d;
  z-index: 5;
}

.alert-error {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.form-group.has-error .form-control {
  border-color: #dc3545;
}
</style>
