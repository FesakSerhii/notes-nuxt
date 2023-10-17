<script setup lang="ts">
import moment from "moment";
import {useMainStore} from "~/stores";

const router = useRouter();
const route = useRoute();
const store = useMainStore();
const veeConfirmRef = ref();


const create = async () => {
  await store.createNote()
  await router.push({
    path: "",
    query: {id: store.activeNote?.id},
  });
}

const openNote = (item: Note) => {
  store.editActive = false
  store.setActiveNote(item);
  router.push({
    path: "",
    query: {id: item?.id},
  });
}

const deleteNode = () => {
  veeConfirmRef.value
      .open("Delete", "Are you sure?")
      .then((confirm: any) => {
        if (confirm) {
          if (store.activeNote?.id) {
            store.deleteNote(store.activeNote.id)
            router.push(route.path);
          }
        }
      });
}

</script>

<template>
  <div class="nav">
    <div class="nav-icon icon-add" @click="create()"/>
    <div class="nav-icon" v-if="store.activeNote">
      <IconsTrash class="icon-delete" @click="deleteNode()"/>
    </div>
    <span class="add-note-text" v-if="!store.notesList || store.notesList.length === 0" @click="create()">Add a new note</span>
  </div>
  <div class="list-items" v-if="store.notesList && store.notesList.length > 0">
    <div class="list-item"
         v-for="item in store.notesList"
         :key="item.id"
         @click="openNote(item)"
         :class="{'active': store.activeNote && store.activeNote?.id === item.id}">
      <div class="list-item-title">
        {{ item?.title || "Empty" }}
      </div>
      <div class="list-item-content">
        <div class="list-item-date">{{ moment(item?.date).format("HH:mm") || "" }}</div>
        <div class="list-item-text">{{ item?.text || "" }}</div>
      </div>
    </div>
  </div>

  <ModalsConfirmModal ref="veeConfirmRef"/>
</template>

<style scoped lang="scss">
.nav {
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 20px;

  &-icon {
    width: 32px;
    height: 32px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
.add-note-text {
    cursor: pointer;
}
.list {
  &-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
  }

  &-item {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 20px;
    position: relative;
    cursor: pointer;
    gap: 8px;
    transition: .3s;

    &:first-child {
      &:before {
        display: none;
      }
    }

    &.active {
      background-color: #ffd69c;

      &:before {
        display: none;
      }

      + .list-item {
        &:before {
          display: none;
        }
      }
    }

    &:hover {
      background-color: #ffd69c;
    }

    &:before {
      content: '';
      position: absolute;
      top: -10px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(34, 34, 34, 0.2);
    }

    &-title {
      font-weight: 600;
      font-size: 22px;
    }

    &-content {
      display: flex;
      gap: 16px;

    }

    &-date {
      font-size: 18px;
    }

    &-text {
      font-size: 18px;
      color: rgba(124, 124, 124, 0.7);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.icon {
  &-add {
    &:hover {
      &:before, &:after {
        background-color: green;
      }
    }

    &:before, &:after {
      content: '';
      position: absolute;
      width: 20px;
      height: 2px;
      background-color: #ccc;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: .3s;
    }

    &:after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }

  &-delete {
    width: 26px;
    height: 26px;
  }
}
</style>
