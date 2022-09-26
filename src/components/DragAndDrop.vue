<template>
  <div>
    <div class="row">
      <div class="col form-inline">
        <v-text-field v-model="newTask" placeholder="Enter Task" @keyup.enter="add"></v-text-field>
        <button @click="add" variant="primary" class="ml-3">Add</button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-3">
        <div class="p-2 alert alert-secondary">
          <h3>Back Log</h3>
          <draggable class="list-group kanban-column" :list="backLog" group="tasks">
            <v-card class="list-group-item" v-for="element in backLog" :key="element.name">
              {{ element.name }}
            </v-card>
          </draggable>
        </div>
      </div>
      <div class="col-3">
        <div class="p-2 alert alert-primary">
          <h3>In Progress</h3>
          <draggable class="list-group kanban-column" :list="inProgress" group="tasks">
            <v-card class="list-group-item" v-for="element in inProgress" :key="element.name">
              {{ element.name }}
            </v-card>
          </draggable>
        </div>
      </div>
      <div class="col-3">
        <div class="p-2 alert alert-warning">
          <h3>Testing</h3>
          <draggable class="list-group kanban-column" :list="tested" group="tasks">
            <v-card class="list-group-item" v-for="element in tested" :key="element.name">
              {{ element.name }}
            </v-card>
          </draggable>
        </div>
      </div>
      <div class="col-3">
        <div class="p-2 alert alert-success">
          <h3>Done</h3>
          <draggable class="list-group kanban-column" :list="done" group="tasks">
            <v-card class="list-group-item" v-for="element in done" :key="element.name">
              {{ element.name }}
            </v-card>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import draggable from 'vuedraggable';

@Component({
  components: {
    draggable,
  },
})
export default class DragAndDrop extends Vue {
  newTask = '';

  backLog = [
    { name: 'Code Sign Up Page' },
    { name: 'Test Dashboard' },
    { name: 'Style Registration' },
    { name: 'Help with Designs' },
  ];

  inProgress = [];

  tested = [];

  done = [];

  add() {
    if (this.newTask) {
      this.backLog.push({ name: this.newTask });
      this.newTask = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.kanban-column {
  min-height: 300px;
  min-width: 150px;
}
</style>
