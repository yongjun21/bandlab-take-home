<template>
  <div class="loading-state">
    <div class="spinner"></div>
  </div>
</template>

<style>
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
