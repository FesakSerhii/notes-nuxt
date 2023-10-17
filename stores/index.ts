import {acceptHMRUpdate, defineStore} from "pinia";
import {getNodesAll, postNode} from "~/composables/indexedDB";

export interface MainStore {
    notesList: Note[]
    editActive: boolean
}
export const useMainStore = defineStore("main", {
    state: (): MainStore => {
        return {
            notesList: [],
            editActive: false
        }
    },
    getters: {

    },
    actions: {
        async nodesAll() {
            this.notesList = await getNodesAll();
        },
        isEditActive() {
            this.editActive = !this.editActive;
        },
        async createNote(clear: boolean = false) {
            let obj: Note = {
                id: this.notesList.length + 1,
                title: '',
                text: '',
                date: new Date().toISOString()
            }
            await postNode(obj);
            this.notesList.push(obj);
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
