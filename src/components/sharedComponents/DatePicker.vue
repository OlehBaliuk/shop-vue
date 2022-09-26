<template>
  <v-card-text>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :disabled="!isDisable"
          v-model="date"
          label="Birthday date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          color="teal lighten-2"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="activePicker"
        :max="
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
        "
        min="1930-01-01"
        @change="save"
        color="teal lighten-2"
      ></v-date-picker>
    </v-menu>
  </v-card-text>
</template>

<script>
export default {
  name: 'DatePicker',

  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
    isDisable: false,
  }),

  props: ['dateBirthDay', 'isEditing'],

  methods: {
    save(date) {
      this.$refs.menu.save(date);
      this.$emit('onChangeDate', date);
    },
  },

  watch: {
    dateBirthDay() {
      if (!this.dateBirthDay) return;
      this.date = new Date(this.dateBirthDay).toISOString().substr(0, 10);
    },
    isEditing() {
      this.isDisable = this.isEditing;
    },
  },
};
</script>
