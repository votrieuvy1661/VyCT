<template>
    <div class="page row">
        <div class="mt-3 col-md-12">
            <h4>Storage</h4>
            <ContactList
                v-if="filteredContactsCount > 0"
                :contacts="filteredContacts"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="addModal = true">
                    <i class="fas fa-plus"></i> Add new
                </button>
                <button class="btn btn-sm btn-danger" @click="onDeleteContacts">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
    </div>
    <div class="mt-3 col-md-6">
        <div v-if="activeContact">
            <h4>
                Chi tiết Liên hệ
                <i class="fas fa-address-card" />
            </h4>
            <ContactCard :contact="activeContact" />
            <router-link
                :to="{
                    name: 'contact.edit',
                    params: { id: activeContact.id },
                }"
            >
                <span class="mt-2 badge badge-warning">
                    <i class="fas fa-edit" /> Hiệu chỉnh</span
                >
            </router-link>
        </div>
    </div>
    <div v-if="addModal" class="add-modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add</h5>
                    <button
                        type="button"
                        class="close"
                        @click="addModal = false"
                    >
                        <span class="text-danger">&times;</span>
                    </button>
                </div>
                <div class="modal-body d-flex justify-content-around w-full">
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="(modelType = 1), (addModal = false)"
                    >
                        <i class="fas fa-plus"></i> New folder
                    </button>
                    <button
                        type="button"
                        class="btn btn-success"
                        @click="(modelType = 2), (addModal = false)"
                    >
                        <i class="fas fa-plus"></i> New image
                    </button>
                    <button
                        type="button"
                        class="btn btn-info"
                        @click="(modelType = 3), (addModal = false)"
                    >
                        <i class="fas fa-plus"></i> New link
                    </button>
                    <button
                        type="button"
                        class="btn btn-warning"
                        @click="(modelType = 4), (addModal = false)"
                    >
                        <i class="fas fa-plus"></i> New note
                    </button>
                </div>
            </div>
        </div>
    </div>
    <AddModal :modalType="modelType" @close:modalType="closeSubModel" />
</template>
<script>
import ContactList from "@/components/User/UserList.vue";
import { userService } from "@/services/user.service";
import AddModal from "@/components/File/AddModal.vue";
export default {
    components: {
        ContactList,
        AddModal,
    },
    // The full code will be presented below
    data() {
        return {
            contacts: [],
            activeIndex: -1,
            searchText: "",
            modelType: 1, // 1 = folder, 2 = image, 3 = link, 4 = note
            addModal: false,
        };
    },

    watch: {
        // Monitor changes on searchText.
        // Release the currently selected contact.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Map contacts to strings for searching.
        contactsAsStrings() {
            return this.contacts.map((contact) => {
                const { name, email, address, phone } = contact;
                return [name, email, address, phone].join("");
            });
        },
        // Return contacts filtered by the search box.
        filteredContacts() {
            if (!this.searchText) return this.contacts;
            return this.contacts.filter((contact, index) =>
                this.contactsAsStrings[index].includes(this.searchText)
            );
        },
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.filteredContacts[this.activeIndex];
        },
        filteredContactsCount() {
            return this.filteredContacts.length;
        },
    },
    methods: {
        async retrieveContacts() {
            try {
                const contactsList = await userService.getMany();
                this.contacts = contactsList.sort((current, next) =>
                    current.name.localeCompare(next.name)
                );
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
        },
        async onDeleteContacts() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await userService.deleteMany();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddUser() {
            this.$router.push({ name: "user.add" });
        },
        closeSubModel(modelType) {
            this.modelType = modelType;
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
.add-modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}
</style>
