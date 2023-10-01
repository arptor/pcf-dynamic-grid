<script lang="ts">
</script>

<div class="wrapper">
    <slot></slot>
</div>

<style>
    div.wrapper{
        display: grid;
        gap: 0.5em;
        grid-template-columns: repeat(var(--columns), minmax(10ch, 1fr)) minmax(2rem, 5rem);
        overflow: auto;
        white-space: initial;
    }
</style>