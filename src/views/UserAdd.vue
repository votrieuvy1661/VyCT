<template>
    <div v-if="user" class="page">
        <h4>Create user</h4>
        <UserForm
            :user="user"
            @submit:user="onCreateUser"
            @delete:user="onDeleteUser"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import UserForm from "@/components/UserForm.vue";
import { userService } from "@/services/user.service";
export default {
    components: {
        UserForm,
    },
    data() {
        return {
            message: "",
            user: {
                name: "",
                username: "",
                passwd: "",
            },
        };
    },
    methods: {
        async onCreateUser(user) {
            try {
                this.user = await userService.create(user);
                this.message = "User account has been added successfully.";
            } catch (error) {
                console.log(error);
            }
        },
        async onDeleteUser() {
            if (confirm("Do you want to delete this user?")) {
                try {
                    await userService.delete(this.id);
                    this.$router.push({ name: "userbook" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.message = "";
    },
};
</script>
