import {acceptHMRUpdate, defineStore} from "pinia";
import {deleteNode, getNodesAll, postNode, putNode} from "~/composables/indexedDB";

export interface MainStore {
    notesList: Note[]
    activeNote: Note | null
    editActive: boolean
    searchQuery: string | null
}
export const useMainStore = defineStore("main", {
    state: (): MainStore => {
        return {
            notesList: [],
            activeNote: null,
            editActive: false,
            searchQuery: null,
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
            await this.nodesAll()
            this.activeNote = obj;
        },
        async deleteNote(id: number) {
            await deleteNode(id);
            this.activeNote = null;
            this.notesList = await getNodesAll();
        },

        async updateNote(id: number, text: string) {
            if(this.activeNote && this.activeNote.id === id) {
                if (text?.trim().includes('#')) {
                    this.activeNote.title = text.length <= 22 ? text.trim() : text.substring(0, 23)+'...';
                }

                this.activeNote.text = text;
                this.activeNote.date = new Date().toISOString();

                await putNode(this.activeNote);
                this.notesList = await getNodesAll();
            }
        },

        setActiveNote(item: Note) {
            this.activeNote = item;
        },

        async setSearchText(q: string) {
            this.searchQuery = q || null;
            const text = q.toLowerCase().trim();
            const list = await getNodesAll();
            this.notesList = list.filter((note: Note) => (note.title?.toLowerCase().includes(text) || note.text?.toLowerCase().includes(text)) && note)
            if(this.notesList && this.notesList.length) {
                this.setActiveNote(this.notesList[0])
                // this.activeNote = this.notesList[0];
                this.editActive = false;
                await navigateTo({
                    path: "",
                    query: {id: this.activeNote?.id},
                })
            } else {
                this.activeNote = null
            }
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
