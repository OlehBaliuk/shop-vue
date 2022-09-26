<template>
  <div class="wrapper">
    <div v-if="loadingPage">loading..</div>
    <v-card v-else width="50%" class="my-5">
      <v-toolbar flat color="teal lighten-2">
        <v-icon>mdi-account-wrench</v-icon>
        <v-toolbar-title class="font-weight-light">Admins List</v-toolbar-title>
      </v-toolbar>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="newAdminId"
                :items="users"
                color="teal lighten-2"
                label="Users"
                :item-text="item => `${item.first} ${item.last}`"
                item-value="id"
                @input="addNewAdmin"
              >
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <v-img v-if="data.item.avatar" :src="data.item.avatar" alt="avatar" />
                      <v-img v-else src="../../public/images/avatar.png" alt="avatar" />
                    </v-list-item-avatar>
                    <v-list-item-content :data-test="`user${data.item.id}`" class="d-flex justify-center"
                      >{{ data.item.first }} {{ data.item.last }}</v-list-item-content
                    >
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-progress-circular v-if="isLoading" indeterminate color="green"></v-progress-circular>
      <v-list v-else>
        <h3 class="text-start px-3">Admins</h3>
        <v-list-item v-for="admin in adminsList" :key="admin.id" :data-test="`admin${admin.id}`">
          <v-list-item-avatar>
            <v-img v-if="admin.avatar" :src="admin.avatar" alt="avatar" />
            <v-img v-else src="../../public/images/avatar.png" alt="avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ admin.first }} {{ admin.last }}</v-list-item-title>
          </v-list-item-content>
          <v-icon
            :data-test="`delete${admin.id}`"
            :disabled="admin.email === $store.getters.getUser.email"
            @click="deleteAdmin(admin.id)"
            >mdi-delete</v-icon
          >
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import HttpService from '@/services/HttpService';
import route from '@/constants/routes';
import { AxiosResponse } from 'axios';
import { IUser } from './interfaces/interfaces';

@Component
export default class AdminsList extends Vue {
  newAdminId: string = '';

  adminsList: Array<IUser> = [];

  users: Array<IUser> = [];

  isLoading = false;

  loadingPage = false;

  isAdmin = null;

  async getUsers() {
    const { data }: AxiosResponse = await HttpService.get(`${route.users}`);

    const allUsers = data;

    const adminsId = this.adminsList.map((admin: IUser) => admin.id);

    this.users = allUsers.filter((user: IUser) => {
      if (adminsId.indexOf(user.id) === -1) {
        return user;
      }
      return false;
    });
  }

  getAdmins() {
    this.adminsList = this.$store.getters.admins;
  }

  async addNewAdmin() {
    try {
      this.isLoading = true;
      const input: any = document.querySelector('input');
      input.setAttribute('type', 'hidden');

      const newAdmin = this.users.find((user: any) => user.id === this.newAdminId);
      await HttpService.post(`${route.admins}`, newAdmin);

      await this.setAdminsToState();

      this.getAdmins();

      await this.getUsers();
    } catch (e) {
      console.log(e);
    } finally {
      const input: any = document.querySelector('input');
      input.removeAttribute('type', 'hidden');
      this.isLoading = false;
    }
  }

  async setAdminsToState() {
    const { data }: AxiosResponse = await HttpService.get(route.admins);
    this.$store.dispatch('addAdminsToState', data);
  }

  async deleteAdmin(adminId: string) {
    await HttpService.delete(`${route.admins}/${adminId}`);

    await this.setAdminsToState();

    this.getAdmins();

    await this.getUsers();

    this.newAdminId = '';
  }

  isAdminCheck() {
    this.isAdmin = this.$store.getters.admins.find((admin: IUser) => admin.email === this.$store.getters.getUser.email);
  }

  @Watch('isAdmin')
  isUserAdmin() {
    if (!this.isAdmin) {
      this.$router.push({ name: 'catalog', params: { locale: this.$i18n.locale } });
    }
  }

  async mounted() {
    this.loadingPage = true;

    await this.setAdminsToState();

    this.getAdmins();

    await this.getUsers();

    this.isAdminCheck();

    this.loadingPage = false;
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
