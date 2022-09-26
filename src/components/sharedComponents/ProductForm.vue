<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit" data-test="form" class="form">
      <validation-provider v-slot="{ errors }" name="Name" rules="required|max:25">
        <v-text-field
          data-test="nameText"
          v-model="dataProduct.name"
          :counter="25"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="Description" rules="required|max:25">
        <v-text-field
          v-model="dataProduct.description"
          data-test="descriptionText"
          :counter="25"
          :error-messages="errors"
          label="Description"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="Price"
        :rules="{
          required: true,
          regex: '^[0-9]*$',
        }"
      >
        <v-text-field
          v-model="dataProduct.price"
          data-test="price"
          :counter="25"
          :error-messages="errors"
          label="Price"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" rules="required" name="checkbox">
        <v-checkbox
          v-model="checkbox"
          data-test="checkbox"
          :error-messages="errors"
          value="true"
          label="right"
          type="checkbox"
          required
        ></v-checkbox>
      </validation-provider>

      <v-btn class="mr-4" data-test="submit" type="submit" :disabled="invalid">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </validation-observer>
</template>

<script lang="ts">
import { required, max, regex } from 'vee-validate/dist/rules';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import { Vue, Prop, Component } from 'vue-property-decorator';
import { IDataProduct } from '../interfaces/interfaces';

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
});

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
});

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} must be only numbers',
});

const defaultProduct = {
  name: '',
  description: '',
  price: '',
};

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class FormProduct extends Vue {
  dataProduct = {
    ...defaultProduct,
  } as IDataProduct;

  checkbox: null | string = null;

  @Prop(Object) product: IDataProduct;

  changeStatus() {
    this.$emit('onChangeStatus');
  }

  submit() {
    (this.$refs.observer as any).validate();
    const fixDataProduct = { ...this.dataProduct, price: Number(this.dataProduct.price) };
    this.$emit('onSubmit', fixDataProduct);
  }

  clear() {
    this.dataProduct = { ...this.product, ...defaultProduct };
    this.checkbox = null;
    (this.$refs.observer as any).reset();
  }

  created() {
    this.dataProduct = { ...this.product };
  }
}
</script>

<style scoped>
.form {
  width: 20rem;
}
</style>
