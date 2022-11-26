<template>
    <div v-if="modalType !== 0" class="add-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5
                        v-if="modalType === 1"
                        class="modal-title"
                        id="exampleModalLabel"
                    >
                        Add folder
                    </h5>
                    <h5
                        v-if="modalType === 2"
                        class="modal-title"
                        id="exampleModalLabel"
                    >
                        Add image
                    </h5>
                    <h5
                        v-if="modalType === 3"
                        class="modal-title"
                        id="exampleModalLabel"
                    >
                        Add link
                    </h5>
                    <button type="button" class="close" @click="closeModal">
                        <span class="text-danger">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <Form
                        @submit="submitItem"
                        :validation-schema="dataFormSchema"
                    >
                        <div v-if="modalType !== 2" class="form-group">
                            <label for="name">Name</label>
                            <Field
                                name="name"
                                type="text"
                                class="form-control"
                                v-model="dataLocal.name"
                            />
                            <ErrorMessage name="name" class="text-danger" />
                        </div>
                        <div v-if="modalType === 4" class="form-group">
                            <label for="content">Content</label>
                            <Field
                                name="content"
                                type="text"
                                class="form-control"
                                v-model="dataLocal.content"
                            />
                            <ErrorMessage name="content" class="text-danger" />
                        </div>
                        <div v-if="modalType === 3">
                            <div class="form-group">
                                <label for="url">URL</label>
                                <Field
                                    name="url"
                                    type="text"
                                    class="form-control"
                                    v-model="dataLocal.url"
                                />
                                <ErrorMessage name="url" class="text-danger" />
                            </div>
                            <div class="form-group form-check">
                                <label class="toggler-wrapper w-full">
                                    <input
                                        name="public"
                                        type="checkbox"
                                        v-model="dataLocal.public"
                                    />
                                    <div class="toggler-slider">
                                        <div class="toggler-knob"></div>
                                    </div>
                                    <span class="text-success">
                                        Public link
                                    </span>
                                </label>
                                <label
                                    for="public"
                                    class="form-check-label text-success"
                                >
                                </label>
                            </div>
                            <div
                                v-if="this.dataLocal.public === true"
                                class="form-group form-check"
                            >
                                <label class="toggler-wrapper w-full">
                                    <input
                                        name="usePassword"
                                        type="checkbox"
                                        v-model="dataLocal.usePassword"
                                    />
                                    <div class="toggler-slider">
                                        <div class="toggler-knob"></div>
                                    </div>
                                    <span class="text-success">
                                        Use Password
                                    </span>
                                </label>
                                <label
                                    for="usePassword"
                                    class="form-check-label text-success"
                                >
                                </label>
                            </div>
                            <div v-if="this.dataLocal.usePassword === true">
                                <div class="form-group">
                                    <label for="passwd">Password</label>
                                    <Field
                                        name="passwd"
                                        type="password"
                                        class="form-control"
                                        v-model="dataLocal.passwd"
                                    />
                                    <ErrorMessage
                                        name="passwd"
                                        class="text-danger"
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="passwordConfirmation">
                                        Comfirm Password
                                    </label>
                                    <Field
                                        name="passwordConfirmation"
                                        type="password"
                                        class="form-control"
                                    />
                                    <ErrorMessage
                                        name="passwordConfirmation"
                                        class="text-danger"
                                    />
                                </div>
                            </div>
                        </div>
                        <div v-if="modalType === 2" class="form-group">
                            <div class="custom-file">
                                <input
                                    type="file"
                                    class="custom-file-input"
                                    @change="addFileName"
                                />
                                <label class="custom-file-label">
                                    Choose file
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <button class="btn btn-primary">Save</button>
                            <button
                                v-if="dataLocal.id"
                                type="button"
                                class="ml-2 btn btn-danger"
                                @click="deleteContact"
                            >
                                Xóa
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["close:modalType", "submit:data"],
    props: {
        data: { type: Object, required: true },
        modalType: { type: Number, required: true },
    },
    data() {
        const dataFormSchema = yup.object().shape({
            modalType: yup.number().required(),
            name: yup.string().when({
                is: () => this.modalType !== 2,
                then: yup
                    .string()
                    .required("Name must have value.")
                    .min(2, "Name must have at least 2 characters.")
                    .max(50, "Name must have less than 50 characters."),
            }),
            url: yup.string().when({
                is: () => this.modalType === 3,
                then: yup.string().required("Must input valid url"),
            }),
            passwd: yup.string().when({
                is: () => this.dataLocal.usePassword,
                then: yup
                    .string()
                    .required("Must input password")
                    .min(4, "This password must have at least 4 characters.")
                    .max(
                        20,
                        "This password must have less than 20 characters."
                    ),
            }),
            passwordConfirmation: yup.string().when({
                is: () => this.dataLocal.usePassword,
                then: yup
                    .string()
                    .required("Must input comfirm password")
                    .oneOf([yup.ref("passwd")], "Passwords must match"),
            }),
            color: yup.string().when("public", {
                is: true,
                then: yup
                    .string()
                    .test(
                        "len",
                        "Must choose color",
                        (val) => val.length === 6
                    ),
            }),
            content: yup.string().when("modalType", {
                is: 4,
                then: yup.string().required("Must input note content"),
            }),
        });
        return {
            dataLocal: {
                ...this.data,
            },

            dataFormSchema,
        };
    },
    methods: {
        closeModal() {
            this.$emit("close:modalType", 0);
        },
        addFileName(e) {
            this.dataLocal.file = e.target.files[0];
            const fileLabel = e.target.nextSibling;
            fileLabel.classList.add("selected");
            fileLabel.innerText = this.dataLocal.file.name;
        },
        submitItem(e) {
            console.log(e);
            this.$emit("submit:data", this.dataLocal);
        },
    },
};
</script>
<style scoped>
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

.toggler-wrapper input[type="checkbox"] {
    width: 40px;
}

.toggler-wrapper input[type="checkbox"]:checked + .toggler-slider {
    background-color: #44cc66;
}

.toggler-wrapper .toggler-slider {
    background-color: #ccc;
    position: absolute;
    border-radius: 100px;
    top: 0;
    left: 0;
    width: 50px;
    height: 26px;
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
}

.toggler-wrapper .toggler-knob {
    position: absolute;
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
}

.toggler-wrapper
    input[type="checkbox"]:checked
    + .toggler-slider
    .toggler-knob {
    left: calc(100% - 23px);
}

.toggler-wrapper .toggler-knob {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    left: 3px;
    top: 3px;
    background-color: #fff;
}
</style>
