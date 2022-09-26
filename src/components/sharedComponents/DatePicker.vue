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
          :disabled="!isEditing"
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
        :locale="$i18n.locale"
        first-day-of-week="1"
        :active-picker.sync="activePicker"
        :max="new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)"
        min="1930-01-01"
        @change="save"
        color="teal lighten-2"
      ></v-date-picker>
    </v-menu>
  </v-card-text>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class DatePicker extends Vue {
  activePicker: null | Date = null;

  date: string | null | undefined = this.dateBirthDay;

  menu: boolean = false;

  @Prop(String) dateBirthDay?: string | null;

  @Prop(Boolean) isEditing: boolean;

  save(date: string) {
    (this.$refs.menu as any).save(date);
    this.$emit('onChangeDate', date);
  }
}
</script>
