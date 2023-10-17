import {acceptHMRUpdate, defineStore} from "pinia";
import {deleteNode, getNodesAll, postNode, putNode} from "~/composables/indexedDB";

export interface MainStore {
    notesList: Note[]
    activeNote: Note | null
    editActive: boolean
    searchQuery: string
}
export const useMainStore = defineStore("main", {
    state: (): MainStore => {
        return {
            notesList: [],
            activeNote: null,
            editActive: false,
            searchQuery: '',
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
        async createNote() {
            const nodesAll = await getNodesAll();
            const id = Math.round(Math.max.apply(null, nodesAll.map((a: Note) => a.id)))
            let obj: Note = {
                id: id + 1,
                title: '',
                text: '',
                date: new Date().toISOString()
            }
            await postNode(obj);
            await this.nodesAll()
            this.activeNote = obj;
            this.editActive = true;
            this.searchQuery = ''
        },
        async deleteNote(id: number) {
            await deleteNode(id);
            this.activeNote = null;
            if(this.searchQuery) {
                this.setSearchText(this.searchQuery)
            } else {
                this.editActive = false;
                this.notesList = await getNodesAll();

            }
        },

        async updateNote(id: number, text: string) {
            if(this.activeNote && this.activeNote.id === id) {
                if (text?.trim().includes('#')) {
                    const index = text.indexOf('#');
                    this.activeNote.title = text.substring(index, index + 23)
                } else {
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
            if(item.text?.length === 0) {
                this.editActive = true;
            }
        },

        async setSearchText(q: string) {
            this.searchQuery = q || '';
            const text = q.toLowerCase().trim();
            const list = await getNodesAll();
            this.notesList = list.filter((note: Note) => (note.title?.toLowerCase().includes(text) || note.text?.toLowerCase().includes(text)) && note)
            if(this.notesList && this.notesList.length) {
                this.setActiveNote(this.notesList[0])
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
