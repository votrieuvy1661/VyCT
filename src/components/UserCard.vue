<script>
export default {
    props: {
        user: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Name:</strong>
            {{ user.name }}
        </div>
        <div class="p-1">
            <strong>Username:</strong>
            {{ user.username }}
        </div>
    </div>
</template>
