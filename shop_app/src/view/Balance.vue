<template>
  <div class="topup-container my-comp" v-if="balance !== null">
    <!-- Заголовок -->
    <div class="text-center mb-5">
      <h1 class="topup-title"><i class="fas fa-coins me-3"></i>Пополнение баланса</h1>
      <p class="topup-subtitle">Быстрое и безопасное пополнение счёта</p>
      <error
        v-if="message"
        type="success"
        :title="message"
        @dismiss="this.message = ''"
      ></error>
    </div>
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-10">
        <!-- Основная карточка -->
        <div class="topup-card">
          <!-- Текущий баланс -->
          <div class="balance-display">
            <div class="balance-icon">
              <i class="fas fa-wallet"></i>
            </div>
            <div class="balance-info">
              <span class="balance-label">Текущий баланс</span>
              <span class="balance-amount">{{ balance.toLocaleString() }} ₽</span>
            </div>
          </div>

          <div class="row">
            <!-- Левая часть - форма -->
            <div class="col-lg-6">
              <div class="form-section">
                <h4 class="form-title">
                  <i class="fas fa-credit-card me-2"></i>Сумма пополнения
                </h4>

                <form @submit.prevent="handleSubmit">
                  <!-- Поле суммы -->
                  <div class="amount-input-group">
                    <label class="input-label">Введите сумму</label>
                    <div class="input-with-icon">
                      <i class="fas fa-ruble-sign"></i>
                      <input
                        type="number"
                        class="amount-input"
                        placeholder="0"
                        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                        v-model="amount"
                        required
                      />
                    </div>
                    <div class="amount-hint">Минимальная сумма: 0 ₽</div>
                  </div>

                  <!-- Кнопка отправки -->
                  <button type="submit" class="submit-btn">
                    <i class="fas fa-check-circle me-2"></i>
                    Пополнить на {{ amount ? amount + " ₽" : "счёт" }}
                  </button>
                </form>
              </div>
            </div>

            <!-- Правая часть - карта -->
            <div class="col-lg-6">
              <div class="card-section">
                <h4 class="card-title"><i class="fas fa-lock me-2"></i>Данные карты</h4>

                <!-- Стилизованная карта -->
                <div class="credit-card">
                  <div class="card-chip">
                    <i class="fas fa-microchip"></i>
                  </div>
                  <div class="card-number">•••• •••• ••••</div>
                  <div class="card-details">
                    <div class="card-holder">IVAN PETROV</div>
                    <div class="card-expiry">12/25</div>
                  </div>
                  <div class="card-logo">
                    <i class="fab fa-cc-visa"></i>
                  </div>
                </div>
              </div>
            </div>
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
</template>

<script>
import Error from "../components/Error.vue";

export default {
  name: "BalanceTopUp",
  data() {
    return {
      balance: null,
      amount: 0,
      message: "",
    };
  },
  methods: {
    async handleSubmit() {
      const raw = JSON.stringify({
        balance: this.amount,
      });

      const response = await fetch(`${this.$config.apiUrl}api/put-balance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$config.activeToken}`,
        },
        body: raw,
      });
      if (response.ok) {
        this.message = `На ваш счёт поступило ${this.amount}`;
        this.balance += this.amount;
        this.amount = 0;
      }
    },
    async loadBalance() {
      const response = await fetch(`${this.$config.apiUrl}api/balance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$config.activeToken}`,
        },
      });
      this.balance = await response.json();
      this.balance = this.balance.data.balance;
    },
  },
  async created() {
    await this.loadBalance();
  },
  components: { Error },
};
</script>

<style scoped>
.topup-container {
  padding: 2rem 0;
  background: none;
  min-height: 100vh;
}

.my-comp {
  margin-top: 65px;
}

.topup-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.topup-subtitle {
  font-size: 1.2rem;
  color: #ffffff;
}

.topup-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.balance-display {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 2.5rem;
}

.balance-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.balance-label {
  display: block;
  font-size: 0.9rem;
  opacity: 0.9;
}

.balance-amount {
  font-size: 1.8rem;
  font-weight: 700;
}

.form-section,
.card-section {
  padding: 1rem;
}

.form-title,
.card-title {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.amount-input-group {
  margin-bottom: 2rem;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #6c757d;
  font-weight: 500;
}

.input-with-icon {
  position: relative;
}

.input-with-icon i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  font-size: 1.2rem;
}

.amount-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1.5rem;
  font-weight: 600;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.amount-input:focus {
  border-color: #4e73df;
  box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
}

.amount-hint {
  font-size: 0.9rem;
  color: #6c757d;
  margin-top: 0.5rem;
}

.quick-amounts {
  margin-bottom: 2rem;
}

.quick-title {
  color: #6c757d;
  margin-bottom: 1rem;
  font-weight: 500;
}

.amount-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.amount-btn {
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background: white;
  color: #6c757d;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.amount-btn:hover,
.amount-btn.active {
  border-color: #4e73df;
  background: #4e73df;
  color: white;
  transform: translateY(-2px);
}

.submit-btn {
  width: 100%;
  padding: 1.25rem;
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(78, 115, 223, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.credit-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  position: relative;
  height: 180px;
}

.card-chip {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.card-number {
  font-size: 1.3rem;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.card-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-holder {
  font-size: 0.9rem;
  opacity: 0.9;
}

.card-expiry {
  font-size: 0.9rem;
  opacity: 0.9;
}

.card-logo {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  font-size: 2rem;
}

.card-details-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  color: #6c757d;
  font-size: 0.9rem;
}

.detail-value {
  font-weight: 600;
  color: #2c3e50;
}

.security-info {
  display: grid;
  gap: 0.75rem;
}

.security-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.additional-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.info-item i {
  font-size: 1.5rem;
  margin-top: 0.25rem;
}

.info-item h6 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.info-item p {
  color: #6c757d;
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .topup-title {
    font-size: 2rem;
  }

  .topup-card {
    padding: 1.5rem;
  }

  .amount-buttons {
    grid-template-columns: repeat(2, 1fr);
  }

  .additional-info {
    grid-template-columns: 1fr;
  }
}
</style>
