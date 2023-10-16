import {acceptHMRUpdate, defineStore} from "pinia";
import {getNodesAll} from "~/composables/indexedDB";

export interface MainStore {
    notes: Note[]
    editActive: boolean
}
export const useMainStore = defineStore("main", {
    state: (): MainStore => {
        return {
            notes: [],
            editActive: false
        }
    },
    getters: {


    },
    actions: {
        async nodesAll() {
            this.notes = await getNodesAll();
        },
        isEditActive() {
            this.editActive = !this.editActive;
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
