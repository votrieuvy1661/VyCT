<script>
export default {
    props: {
        links: { type: Array, default: () => [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        handleDbClick(url) {
            if (url)
                location.href =
                    "https://spzg-my.sharepoint.com/personal/vy_votri_onmicrosoft_com/Documents/IT_CTU/y4s1/web/6.Vue.js.pdf";
        },
    },
};
</script>
<template>
    <ul class="list-group mt-4">
        <button
            class="list-group-item link"
            v-for="(link, index) in links"
            :key="link.id"
            :style="{ background: `#${link.color}` }"
            @click="updateActiveIndex(index)"
            @dblclick="handleDbClick(link.url)"
        >
            {{ link.name }}
        </button>
    </ul>
</template>
<style scoped>
.link {
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
        rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
    cursor: pointer;
    color: #9b9b9b;
    mix-blend-mode: hard-light;
    font-size: 100%;
    height: 44px;
    line-height: 1.15;
    outline: none;
    margin-bottom: 20px;
    overflow: hidden;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
    width: 100%;
}

.link:focus {
    box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
        rgba(50, 50, 93, 0.2) 0 6px 15px 0, rgba(0, 0, 0, 0.1) 0 2px 2px 0,
        rgba(50, 151, 211, 0.3) 0 0 0 4px;
}
</style>
