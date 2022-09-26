<template>
  <v-card width="60%" class="my-5">
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
                  <v-list-item-content class="d-flex justify-center"
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
      <v-list-item v-for="admin in adminsList" :key="admin.id">
        <v-list-item-avatar>
          <v-img v-if="admin.avatar" :src="admin.avatar" alt="avatar" />
          <v-img v-else src="../../public/images/avatar.png" alt="avatar" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ admin.first }} {{ admin.last }}</v-list-item-title>
        </v-list-item-content>
        <v-icon :disabled="admin.email === getUser.email" @click="deleteAdmin(admin.id)"
          >mdi-delete</v-icon
        >
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import route from '@/constants/routes';
import HttpService from '@/services/HttpService';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AdminsList',

  data() {
    return {
      newAdminId: '',
      allUserId: null,
      adminsList: '',
      users: [],
      isLoading: false,
    };
  },

  methods: {
    ...mapActions(['addAdminsToState']),

    async getUsers() {
      const { data } = await HttpService.get(`${route.users}`);

      const allUsers = data;

      const adminsId = this.adminsList.map(admin => admin.id);

      this.users = allUsers.filter(user => {
        if (adminsId.indexOf(user.id) === -1) {
          return user;
        }
        return false;
      });
    },

    getAdmins() {
      this.adminsList = this.admins;
    },

    async addNewAdmin() {
      try {
        this.isLoading = true;
        const input = document.querySelector('input');
        input.setAttribute('type', 'hidden');

        const newAdmin = this.users.find(user => user.id === this.newAdminId);
        await HttpService.post(`${route.admins}`, newAdmin);

        await this.setAdminsToState();

        this.getAdmins();

        await this.getUsers();
      } catch (e) {
        console.log(e);
      } finally {
        const input = document.querySelector('input');
        input.removeAttribute('type', 'hidden');
        this.isLoading = false;
      }
    },

    async setAdminsToState() {
      const { data } = await HttpService.get(route.admins);
      this.addAdminsToState(data);
    },

    async deleteAdmin(adminId) {
      await HttpService.delete(`${route.admins}/${adminId}`);

      await this.setAdminsToState();

      this.getAdmins();

      await this.getUsers();

      this.newAdminId = '';
    },
  },

  computed: {
    ...mapGetters(['admins', 'getUser']),
  },

  async mounted() {
    await this.setAdminsToState();

    this.getAdmins();

    await this.getUsers();
  },
};
</script>
