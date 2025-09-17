<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card registration-card">
      <div class="card-body p-4 p-md-5">
        <div class="text-center mb-4">
          <h1 class="card-title fw-bold mb-2">Создать аккаунт</h1>
          <p class="text-muted">Заполните форму для регистрации</p>
        </div>

        <form @submit.prevent="registation">
          <div class="row">
            <div class="col-md-6 mb-3">
              <div class="form-floating" :class="{ has_error: errors.first_name_error }">
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  placeholder="Имя"
                  v-model="firstName"
                />
                <label for="firstName"><i class="fas fa-user me-2"></i>Имя</label>
                <div
                  :class="{ 'has-error error-message': errors.first_name_error }"
                  v-if="errors.first_name_error"
                >
                  <small> {{ errors.first_name_error }} </small>
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <div class="form-floating" :class="{ has_error: errors.last_name_error }">
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  placeholder="Фамилия"
                  v-model="lastName"
                />
                <label for="lastName"><i class="fas fa-user-tag me-2"></i>Фамилия</label>
                <div
                  :class="{ 'has-error error-message': errors.last_name_error }"
                  v-if="errors.last_name_error"
                >
                  <small> {{ errors.last_name_error }} </small>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <div class="form-floating" :class="{ has_error: errors.email_error }">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Email"
                v-model="email"
              />

              <label for="email"><i class="fas fa-envelope me-2"></i>Email</label>
              <div
                :class="{ 'has-error error-message': errors.email_error }"
                v-if="errors.email_error"
              >
                <small> {{ errors.email_error }} </small>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <div class="form-floating" :class="{ has_error: errors.password_error }">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Пароль"
                v-model="password"
              />
              <label for="password"><i class="fas fa-lock me-2"></i>Пароль</label>
              <div
                :class="{ 'has-error error-message': errors.password_error }"
                v-if="errors.password_error"
              >
                <small> {{ errors.password_error }} </small>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100 mb-3 btn-register">
            Зарегистрироваться
          </button>

          <div class="login-link text-center mt-3">
            <p class="text-muted">
              Уже есть аккаунт? <router-link to="/login">Войти</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject, reactive } from "vue";
import { useRouter } from "vue-router";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const errors = reactive({
  first_name_error: ref(""),
  last_name_error: ref(""),
  email_error: ref(""),
  password_error: ref(""),
});
const router = useRouter();

const apiUrl = inject("apiUrl");
const setUserStatus = inject("setUserStatus");

async function registation() {
  Object.keys(errors).forEach((elem) => {
    errors[elem] = "";
  });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: email.value,
    password: password.value,
    first_name: firstName.value,
    last_name: lastName.value,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let result = await fetch(`${apiUrl.value}api/register`, requestOptions);
  result = await result.json();
  if ("data" in result) {
    if (result.data.code == 200) {
      router.push("/login");
    }
  } else {
    if ("error" in result) {
      Object.keys(result.error.error).forEach(
        (key_word) => (errors[`${key_word}_error`] = result.error.error[key_word][0])
      );
    }
  }
}

onMounted(() => {
  setUserStatus(localStorage.getItem("token"));
});
</script>

<style scoped>
.form-floating.has_error .form-control {
  border-color: #dc3545;
}

.min-vh-100 {
  min-height: 100vh;
}

.registration-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-width: 550px;
  width: 100%;
}

.form-control {
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s;
  padding-left: 15px;
}

.form-control:focus {
  border-color: #6a11cb;
  box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.2);
}

.form-floating > label {
  padding-left: 40px;
}

.form-floating > .form-control:focus ~ label,
.form-floating > .form-control:not(:placeholder-shown) ~ label {
  padding-left: 15px;
}

.btn-register {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  border: none;
  padding: 15px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s;
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to right, #5e0fb7, #1f68e6);
}

.login-link a {
  color: #6a11cb;
  font-weight: 600;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.form-check-input:checked {
  background-color: #6a11cb;
  border-color: #6a11cb;
}

.form-text {
  padding-left: 15px;
  margin-top: 5px;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 576px) {
  .registration-card {
    padding: 20px;
  }

  .btn-register {
    padding: 12px;
    font-size: 16px;
  }
}
</style>
