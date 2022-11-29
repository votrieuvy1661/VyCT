<template>
    <div class="page row">
        <div class="mt-3">
            <div class="d-flex justify-content-between">
                <h2 class="text-primary">Link</h2>
                <div v-if="activeIndex !== -1">
                    <button
                        class="btn btn-sm btn-primary mr-2"
                        @click="refreshList()"
                    >
                        <i class="fas fa-edit"></i> Edit
                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        @click="onDeleteLinks"
                    >
                        <i class="fas fa-trash"></i> Delete
                    </button>
                    <!-- <router-link
                        :to="{
                            name: 'LinkPage',
                            params: { id: activeLink.id },
                        }"
                    >
                        <span class="mt-1 badge badge-warning">
                            <i class="fas fa-edit" /> Hiệu chỉnh</span
                        >
                    </router-link> -->
                </div>
            </div>
            <ItemList
                v-if="filteredItemsCount > 0"
                :items="filteredItems"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>There is no item to show</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-success" @click="addModal = true">
                    <i class="fas fa-plus"></i> Add new
                </button>
                <button class="btn btn-sm btn-danger" @click="onDeleteLinks">
                    <i class="fas fa-trash"></i> Delete all
                </button>
            </div>
        </div>
    </div>
    <div v-if="addModal" class="add-modal">
        <div class="modal-dialog modal-dialog-centered">
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
                        class="btn btn-success"
                        @click="(modalType = 1), (addModal = false)"
                    >
                        <i class="fas fa-plus"></i> New image
                    </button>
                    <button
                        type="button"
                        class="btn btn-info"
                        @click="(modalType = 2), (addModal = false)"
                    >
                        <i class="fas fa-plus"></i> New link
                    </button>
                    <button
                        type="button"
                        class="btn btn-warning"
                        @click="(modalType = 3), (addModal = false)"
                    >
                        <i class="fas fa-plus"></i> New note
                    </button>
                </div>
            </div>
        </div>
    </div>
    <DataModal
        :modalType="modalType"
        :data="formData"
        @close:modalType="closeSubModel"
        @submit:data="submitData"
    />
</template>
<script>
import ItemList from "@/components/ItemList.vue";
import { userService } from "@/services/user.service";
import DataModal from "@/components/DataModal.vue";
import { linkService } from "@/services/link.service";
import { imageService } from "@/services/image.service";
import { noteService } from "@/services/note.service";
export default {
    components: {
        ItemList,
        DataModal,
    },
    data() {
        return {
            ItemList: [],
            activeIndex: -1,
            searchText: "",
            modalType: 0, // 1 = image, 2 = link, 3 = note
            addModal: false,
            formData: {
                color: "#aaaaaa",
            },
        };
    },

    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Map Links to strings for searching.
        ItemsAsStrings() {
            return this.Links.map((Link) => {
                const { name, email, address, phone } = Link;
                return [name, email, address, phone].join("");
            });
        },
        // Return Links filtered by the search box.
        filteredItems() {
            if (!this.searchText) return this.ItemList;
            return this.ItemList.filter((item, index) =>
                this.ItemsAsStrings[index].includes(this.searchText)
            );
        },
        activeLink() {
            if (this.activeIndex < 0) return null;
            return this.filteredItems[this.activeIndex];
        },
        filteredItemsCount() {
            return this.ItemList.length;
        },
    },
    methods: {
        async retrieveLinks() {
            try {
                const LinksList = await linkService.getMany();
                const imagesList = await imageService.getMany();
                const notesList = await noteService.getMany();
                const ItemList = LinksList.concat(imagesList, notesList);
                this.ItemList = ItemList.sort((current, next) =>
                    current.name.localeCompare(next.name)
                );
                console.log(this.ItemList);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveLinks();
            this.activeIndex = -1;
        },
        async onDeleteLinks() {
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
        closeSubModel() {
            this.modalType = 0;
        },
        async submitData(data) {
            data.author = 1;
            try {
                if (this.modalType === 1) {
                    let file = new FormData();
                    file.append("file", data.file);
                    const image = await imageService.create(data);
                    console.log(image);
                }
                if (this.modalType === 2) {
                    const link = await linkService.create(data);
                    console.log(link);
                }
                if (this.modalType === 3) {
                    const note = await noteService.create(data);
                    console.log(note);
                }
                this.closeSubModel();
            } catch (error) {
                console.log(error);
            }
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
