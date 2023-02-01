<template>
  <div v-if="loaded">
    <div class="row">
      <div class="col form-inline">
        <v-text-field v-model="name" placeholder="Enter Task" @keyup.enter="add"></v-text-field>
        <button @click="add" variant="primary" class="ml-3">Add</button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-3">
        <div class="p-2 alert alert-secondary">
          <h3>Back Log</h3>
          <draggable class="list-group kanban-column" :list="backlog" group="tasks" @change="(event) => onChanged(event, 'backlog')">
            <v-card class="list-group-item" v-for="element in backlog" :key="element.name">
              {{ element.name }}
            </v-card>
          </draggable>
        </div>
      </div>
      <div class="col-3">
        <div class="p-2 alert alert-primary">
          <h3>In Progress</h3>
          <draggable class="list-group kanban-column" :list="inProgress" group="tasks" @change="(event) => onChanged(event, 'inProgress')">
            <v-card class="list-group-item" v-for="element in inProgress" :key="element.name">
              {{ element.name }}
            </v-card>
          </draggable>
        </div>
      </div>
      <div class="col-3">
        <div class="p-2 alert alert-warning">
          <h3>Testing</h3>
          <draggable class="list-group kanban-column" :list="tested" group="tasks" @change="(event) => onChanged(event, 'tested')">
            <v-card class="list-group-item" v-for="element in tested" :key="element.name">
              {{ element.name }}
            </v-card>
          </draggable>
        </div>
      </div>
      <div class="col-3">
        <div class="p-2 alert alert-success">
          <h3>Done</h3>
          <draggable class="list-group kanban-column" :list="done" group="tasks" @change="(event) => onChanged(event, 'done')">
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
import HttpService from '@/services/HttpService';
import route from '@/constants/routes';

@Component({
  components: {
    draggable,
  },
})
export default class DragAndDrop extends Vue {
  newTask = {
    name: '',
    status: 'backlog',
  }

  name = ''

  newIndex = 0

  loaded = false

  status: any = []

  taskId = ''

  tasks = []

  backlog: any = []

  inProgress = []

  tested = []

  done = []

  sortedTasks(status: any) {
    const list: any = this.tasks?.filter((task: any) => task.status === status);
    list.sort((prev: any, next: any) => prev.index - next.index);
    console.log(1);

    return list;
  }

  // eslint-disable-next-line class-methods-use-this
  public async onChanged(event:any, status: any) {
    this.status.push(status);

    if (event.added?.newIndex) {
      this.newIndex = event.added?.newIndex;
    }
    this.taskId = event.removed?.element.id;
    if (event.removed?.element.id) {
      HttpService.patch(`${route.toDoList}/${this.taskId}`, { status: this.status[this.status.length - 2], index: this.newIndex });
    }
  }

  async add() {
    if (this.name) {
      try {
        this.backlog.push({ name: this.name });
        await HttpService.post(route.toDoList, { name: this.name, status: 'backlog' });
        this.name = '';
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getTasks() {
    const response = await HttpService.get(route.toDoList);
    this.tasks = response.data;

    this.backlog = this.sortedTasks('backlog');
    this.inProgress = this.sortedTasks('inProgress');
    this.tested = this.sortedTasks('tested');
    this.done = this.sortedTasks('done');
  }

  // eslint-disable-next-line class-methods-use-this
  async mounted() {
    await this.getTasks();
    this.loaded = true;
  }
}
</script>

<style lang="scss" scoped>
.kanban-column {
  min-height: 300px;
  min-width: 150px;
}
</style>
