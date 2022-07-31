<template>
  <div id="div1" class="mb-4">
    <div id="div2">
      <span id="span1">
        {{ text.toUpperCase() }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
  }
}
</script>

<style scoped>
  #div1 {
    height: 16px;
  }
  #div2 {
    width: 100%;
    height: 8px;
    border-bottom: 1px solid var(--secondary);
    text-align: center;
  }
  #span1 {
    line-height: 16px;
    font-size: 16px;
    background-color: var(--dark);
    color: var(--secondary);
    padding-left: 8px;
    padding-right: 8px;
    border: 1px solid var(--secondary);
    border-radius: 8px;
  }
</style>
