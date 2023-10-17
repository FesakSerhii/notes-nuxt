<script setup lang="ts">
import moment from "moment";
import {useMainStore} from "~/stores";
import {useMedia} from "~/composables/useMedia";
const isTable = useMedia("(max-width: 992px)")
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
    <div class="nav-info">
      <div class="nav-icon icon-add" @click="create()"/>
      <div class="nav-icon" v-if="store.activeNote">
        <IconsTrash class="icon-delete" @click="deleteNode()"/>
      </div>
      <span class="add-note-text" v-if="!store.notesList || store.notesList.length === 0" @click="create() && !isTable">Add a new note</span>
    </div>
    <div class="search" v-if="isTable">
      <Search />
    </div>
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
@import "~/assets/scss/utils/_functions.scss";
.nav {
  display: flex;
  align-items: center;
  padding: 0 clamp(10px , functions-vw(20px, 1920px), 20px);
  gap: clamp(10px , functions-vw(20px, 1920px), 20px);
  @media (max-width: 992px) {
    justify-content: space-between;
    padding: 0;
  }
  &-icon {
    width: clamp(24px , functions-vw(32px, 1920px), 32px);
    height: clamp(24px , functions-vw(32px, 1920px), 32px);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @media (max-width: 992px) {
      width: 32px;
      height: 32px;
    }
  }
  &-info {
    display: flex;
    align-items: center;
    gap: clamp(10px , functions-vw(20px, 1920px), 20px);
  }
}
.add-note-text {
    cursor: pointer;
}
.list {
  &-items {
    display: flex;
    flex-direction: column;
    gap: clamp(10px , functions-vw(20px, 1920px), 20px);
    margin-top: clamp(15px , functions-vw(30px, 1920px), 30px);
  }

  &-item {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: clamp(10px , functions-vw(20px, 1920px), 20px);
    position: relative;
    cursor: pointer;
    gap: clamp(4px , functions-vw(8px, 1920px), 8px);
    transition: .3s;
    @media (max-width: 992px) {

    }

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
      top: calc(clamp(5px , functions-vw(10px, 1920px), 10px) * -1);
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(34, 34, 34, 0.2);
    }

    &-title {
      font-weight: 600;
      font-size: clamp(18px , functions-vw(22px, 1920px), 22px);
    }

    &-content {
      display: flex;
      gap: clamp(8px , functions-vw(16px, 1920px), 16px);

    }

    &-date {
      font-size: clamp(14px , functions-vw(18px, 1920px), 18px);
    }

    &-text {
      font-size: clamp(14px , functions-vw(18px, 1920px), 18px);
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
      width: clamp(10px , functions-vw(20px, 1920px), 20px);
      height: clamp(1px , functions-vw(2px, 1920px), 2px);
      background-color: #ccc;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: .3s;
      @media (max-width: 992px) {
        width: 20px;
        height: 2px;
      }
    }

    &:after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }

  &-delete {
    width: clamp(13px , functions-vw(26px, 1920px), 26px);
    height: clamp(13px , functions-vw(26px, 1920px), 26px);
    @media (max-width: 992px) {
      display: none;
    }
  }
}

.search {
  @media (min-width: 992px) {
    display: none;
  }

}
</style>
