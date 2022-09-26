<template>
  <v-card class="mx-4 my-4" width="300">
    <v-img
      class="main-image white--text align-end"
      object-fit="cover"
      height="200"
      :src="require('/public/images/' + getProductImage())"
    >
      <v-btn
        v-if="isAdmin"
        :id="'btn-edit' + product.id"
        router-link
        :to="{ name: 'edit-product', params: { locale: $i18n.locale, id: product.id } }"
        class="icon-edit"
        ><v-icon color="black">mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn
        v-if="isAdmin"
        @click="deleteProductFromDB(product.id)"
        :id="'btn-delete' + product.id"
        class="icon-delete"
      >
        <v-icon color="black">mdi-delete-forever</v-icon>
      </v-btn>

      <v-card-title class="black--text">{{ product.name }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0"> price:{{ product.price }} </v-card-subtitle>
    <v-card-actions class="d-flex justify-center">
      <v-btn
        :disabled="isDisable"
        @click="$store.dispatch('addProductToStateCart', product)"
        color="teal lighten-1"
        text
        >{{ changeTitleButton }}
      </v-btn>
      <v-btn
        :id="'btn-about' + product.id"
        color="teal lighten-1"
        text
        router-link
        :to="{ name: 'about-product', params: { locale: $i18n.locale, id: product.id } }"
        >{{ $t('product.aboutProduct') }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Product extends Vue {
  @Prop(Object) product: any;

  getProductImage() {
    return this.product.image === '' ? '1.jpg' : this.product.image;
  }

  async deleteProductFromDB() {
    this.$emit('onDelete', this.product.id);
  }

  get isDisable(): boolean {
    return Object.keys(this.$store.getters.getCart).includes(String(this.product.id));
  }

  get changeTitleButton(): any {
    if (Object.keys(this.$store.getters.getCart).includes(String(this.product.id))) {
      return this.$t('product.inACart');
    }
    return this.$t('product.addToCart');
  }

  get isAdmin() {
    const isVisible = this.$store.getters.admins.some(
      (admin: any) => admin.email === this.$store.getters.getUser.email,
    );
    return isVisible;
  }
}
</script>

<style scoped lang="scss">
.icon-edit,
.icon-delete {
  display: none;
  position: absolute;
  top: 0;
}

.main-image:hover {
  .icon-edit {
    display: flex;
    background-color: rgba(192, 188, 188, 0.5);
  }
  .icon-delete {
    display: flex;
    background-color: rgba(192, 188, 188, 0.5);
    right: 0;
  }
}
</style>
