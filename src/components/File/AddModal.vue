<template>
    <div v-if="modalType === 1" class="add-modal">
        <div class="modal-dialog">
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
                        initialValues="{{modalType}}"
                        @submit="submitItem"
                        :validation-schema="itemFormSchema"
                    >
                        <div class="form-group">
                            <label for="name">Name</label>
                            <Field
                                name="name"
                                type="text"
                                class="form-control"
                                v-model="itemLocal.name"
                            />
                            <ErrorMessage name="name" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="content">Content</label>
                            <Field
                                name="content"
                                type="text"
                                class="form-control"
                                v-model="itemLocal.username"
                            />
                            <ErrorMessage
                                name="username"
                                class="error-feedback"
                            />
                        </div>
                        <div class="form-group">
                            <label for="passwd">Password</label>
                            <Field
                                name="passwd"
                                type="password"
                                class="form-control"
                                v-model="itemLocal.passwd"
                            />
                            <ErrorMessage
                                name="passwd"
                                class="error-feedback"
                            />
                        </div>
                        <div class="form-group">
                            <label for="passwordConfirmation"
                                >Comfirm Password</label
                            >
                            <Field
                                name="passwordConfirmation"
                                type="password"
                                class="form-control"
                            />
                            <ErrorMessage
                                name="passwordConfirmation"
                                class="error-feedback"
                            />
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary">Create</button>
                            <button
                                v-if="itemLocal.id"
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
    emits: ["close:modalType", "delete:user"],
    props: {
        user: { type: Object, required: true },
        modalType: { type: String, required: true },
    },
    data() {
        const itemFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Name must have value.")
                .min(2, "Name must have at least 2 characters.")
                .max(50, "Name must have less than 50 characters."),
            modalType: yup.number(),
            public: yup.boolean(),
            url: yup
                .matches(
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    "Enter correct url!"
                )
                .required("Please enter valid url"),
            passwd: yup
                .string()
                .min(4, "This password must have at least 4 characters.")
                .max(20, "This password must have less than 20 characters."),
            passwordConfirmation: yup
                .string()
                .oneOf([yup.ref("passwd"), null], "Passwords must match"),
            color: yup
                .string()
                .test("len", "Must choose color", (val) => val.length === 6),
            content: yup.string().required(),
        });
        return {
            itemLocal: {
                ...this.user,
            },

            itemFormSchema,
        };
    },
    methods: {
        closeModal() {
            this.$emit("close:modalType", 0);
        },
        deleteUser() {
            this.$emit("delete:user", this.itemLocal.id);
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
</style>
