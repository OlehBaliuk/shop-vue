<template>
  <v-data-table :headers="headers" calculate-widths :items="products" class="elevation-1 my-5 table">
    <template v-slot:[`body.prepend`]>
      <td class="filter-field">
        <v-text-field color="teal lighten-2" v-model="name" label="name"></v-text-field>
      </td>
      <td class="filter-field">
        <v-text-field
          data-test="idField"
          color="teal lighten-2"
          v-model="id"
          min="1"
          type="number"
          label="id"
        ></v-text-field>
      </td>
      <td class="price-filter">
        <v-text-field
          color="teal lighten-2"
          class="price-filter-input"
          v-model="priceFrom"
          type="number"
          label="from"
          min="1"
        ></v-text-field>
        <v-text-field
          color="teal lighten-2"
          v-model="priceTo"
          class="price-filter-input"
          type="number"
          min="1"
          label="to"
        ></v-text-field>
      </td>
      <td class="filter-field">
        <v-text-field color="teal lighten-2" v-model="rating" type="number" min="1" label="rating"></v-text-field>
      </td>
      <td class="filter-field">
        <v-text-field color="teal lighten-2" v-model="quantity" type="number" min="1" label="qnt"></v-text-field>
      </td>
      <td class="td-clear-filter">
        <v-btn @click="clearFilter" small color="teal lighten-2" class="mb-2 mr-4">clear filter</v-btn>
      </td>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Products</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          data-test="addNewProduct"
          small
          router-link
          :to="{ name: 'add-new-product', params: { locale: $i18n.locale } }"
          color="teal lighten-2"
          class="mb-2"
          >New product</v-btn
        >
        <v-dialog v-model="dialogDelete" persistent max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="teal lighten-2" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="teal lighten-2" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon data-test="editIcon" small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import HttpService from '@/services/HttpService';
import route from '@/constants/routes';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class ProductsTable extends Vue {
  dialogDelete = false;

  deleteProduct: object | null = null;

  products: Array<any> = [];

  id: string = '';

  name: string = '';

  priceFrom: string | number = '';

  priceTo: string | number = '';

  rating: string | number = '';

  quantity: string | number = '';

  @Watch('dialogDelete')
  onDialogDelete(val: boolean) {
    return val || this.closeDelete();
  }

  get headers() {
    return [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'name',
        filter: (value: string) => (this.name ? value.includes(this.name) : true),
      },
      {
        text: 'ID',
        value: 'id',
        align: 'start',
        filter: (value: number) => (this.id ? value === Number(this.id) : true),
      },
      {
        text: 'Price',
        value: 'price',
        align: 'center',

        filter: (value: number) => {
          if (this.priceFrom && this.priceTo) {
            return this.priceFrom <= value && value <= this.priceTo;
          }
          return true;
        },
      },
      {
        text: 'Rating',
        value: 'rating',
        align: 'start',
        filter: (value: number) => (this.rating ? value === Number(this.rating) : true),
      },
      {
        text: 'Qnt',
        value: 'quantity',
        align: 'start',
        filter: (value: number) => (this.quantity ? value === Number(this.quantity) : true),
      },
      { text: 'Actions', value: 'actions', sortable: false, align: 'end' },
    ];
  }

  async initialize() {
    try {
      const { data }: any = await HttpService.get(route.products);

      this.products = data;
    } catch (e) {
      console.log(e);
    }
  }

  editItem(item: any) {
    this.$router.push({ name: 'edit-product', params: { locale: this.$i18n.locale, id: item.id } });
  }

  deleteItem(item: any) {
    this.dialogDelete = true;

    this.deleteProduct = item;
  }

  async deleteItemConfirm() {
    await HttpService.delete(`${route.products}/${(this.deleteProduct as any).id}`);

    this.closeDelete();

    this.products = this.products.filter(product => product.id !== (this.deleteProduct as any).id);
  }

  closeDelete() {
    this.dialogDelete = false;
  }

  clearFilter() {
    this.id = '';
    this.name = '';
    this.priceFrom = '';
    this.priceTo = '';
    this.rating = '';
    this.quantity = '';
  }

  created() {
    this.initialize();
  }
}
</script>

<style lang="scss" scoped>
.filter-field {
  width: 90px;
  padding: 0 16px;
}

.table {
  min-width: 60%;
}

.price-filter {
  display: flex;
  width: 100px;
  margin: 0 auto;
}

.price-filter-input {
  margin: 5px;
}

.td-clear-filter {
  text-align: end;
  width: 50px;
}
</style>
