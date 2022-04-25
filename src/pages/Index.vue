<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";

const context = ref("");
const result = ref("");
const isTranslating = ref(false);

function translateContext(event: Event) {
  if (context.value.length > 10000) {
    result.value = "字数超出限制";
  } else {
    const api = import.meta.env.PROD
      ? "https://webapi.onrender.com/translate"
      : "http://localhost:3001/translate";
    isTranslating.value = true;
    result.value = "";
    axios
      .post(api, { context: context.value })
      .then(
        (res) => {
          result.value = res.data;
        },
        (reason) => {
          result.value = reason;
        }
      )
      .finally(() => (isTranslating.value = false));
  }

  event.preventDefault();
}

function reset() {
  context.value = "";
  result.value = "";
}
</script>

<template>
  <header class="text-center bg-light shadow-sm">
    <div class="container pt-4 pb-2">
      <h1 class="text-primary">Bunga</h1>
      <p class="lead text-secondary">使文本变得无厘头</p>
    </div>
  </header>
  <form class="container py-4" @submit="translateContext">
    <label class="form-label fs-3 text-secondary">原文:</label>
    <textarea
      v-model="context"
      class="form-control text-muted fs-4"
      rows="8"
      placeholder="输入中文文本"
    ></textarea>
    <div class="container mt-3">
      <div class="row">
        <button
          type="submit"
          class="btn btn-primary col me-3"
          :disabled="isTranslating"
        >
          提交
        </button>
        <button @click="reset" type="button" class="btn btn-secondary col">
          重置
        </button>
      </div>
    </div>
  </form>
  <div class="container">
    <label class="form-label fs-3 text-secondary">结果:</label>
    <textarea
      v-model="result"
      class="form-control text-muted fs-4"
      rows="8"
      :placeholder="isTranslating ? '正在翻译...' : '翻译'"
      readonly
    ></textarea>
  </div>
  <footer class="text-center text-muted py-3">
    <p class="mb-0">GPL-3.0 Licensed | Made by Zhou Haixian</p>
    <a href="https://github.com/zhouhaixian/Bunga">Github</a>
  </footer>
</template>
