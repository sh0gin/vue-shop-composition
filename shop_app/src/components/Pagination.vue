<template>
  <div class="row mt-5">
    <div class="col-12">
      <div class="d-flex justify-content-between align-items-center">
        <!-- Информация о странице -->
        <div class="text-muted"></div>

        <!-- Кнопки пагинации -->
        <nav aria-label="Page navigation">
          <ul class="pagination mb-0">
            <!-- Кнопка "Назад" -->
            <li class="page-item" :class="backward_button ? 'disabled' : ''">
              <button
                class="page-link"
                aria-label="Previous"
                :disabled="backward_button"
                @click="backward"
              >
                <i class="fas fa-chevron-left"></i>
              </button>
            </li>

            <li class="page-item" v-for="value in count">
              <button
                class="page-link"
                :class="{ active: active == value }"
                @click="page(value)"
              >
                {{ value }}
              </button>
            </li>

            <!-- Кнопка "Вперед" -->
            <li class="page-item" :class="forward_button ? 'disabled' : ''">
              <button
                class="page-link"
                aria-label="Next"
                :disabled="forward_button"
                @click="forward"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>

        <!-- Выбор количества товаров на странице -->
        <!-- <div class="d-flex align-items-center">
                <span class="me-2 text-muted">Показывать по:</span>
                <select class="form-select form-select-sm" style="width: 80px;">
                    <option value="6">6</option>
                    <option value="12" selected>12</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                </select>
            </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  count: 1,
});

const emit = defineEmits(["active_page"]);

let active = ref(1);

function page(active_page) {
  active.value = active_page;
  emit("active_page", active.value);
}
function forward() {
  active.value += 1;
  emit("active_page", active.value);
}
function backward() {
  active.value -= 1;
  emit("active_page", active.value);
}

const forward_button = computed(() => {
  if (active.value == props.count) {
    return true;
  }
  return false;
});

const backward_button = computed(() => {
  if (active.value == 1) {
    return true;
  }
  return false;
});

// export default {
//     data() {
//         return {
//             active_page: 1,
//         }
//     },
//     props: [
//         'count'
//     ],
//     methods: {
//         page(active_page) {
//             this.active_page = active_page
//             this.$emit('active_page', active_page)
//         },
//         forward() {
//             this.active_page += 1
//             this.$emit('active_page', this.active_page)
//         },
//         backward() {
//             this.active_page -= 1
//             this.$emit('active_page', this.active_page)
//         }
//     },
//     emits: [
//         'active_page'
//     ],
//     computed: {
//         forward_button() { // не получилось computed сразу вставить в disabled\
//             if (this.active_page == this.count) {
//                 return true
//             }
//             return false;
//         },
//         backward_button() {
//             if (this.active_page == 1) {
//                 return true;
//             }
//             return false;
//         }
//      }

// }
</script>
