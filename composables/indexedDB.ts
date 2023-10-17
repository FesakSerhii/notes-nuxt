let db: IDBDatabase | null = null;

export const useConnectBD = (): Promise<IDBDatabase> => {
    if(db) {
        return Promise.resolve(db);
    }

    return new Promise((resolve, reject) => {
        const request: IDBOpenDBRequest = indexedDB.open('notesApp', 2);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db: IDBDatabase = (event.target as IDBOpenDBRequest)?.result;
            db.createObjectStore('notesApp', { keyPath: 'id' });
        }

        request.onsuccess = (event: Event) => {
            db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
            resolve(db);
        }

        request.onerror = (event: Event) => {
            reject((event.target as IDBOpenDBRequest).error);
        }
    });
}

export const getNodesAll = async (): Promise<Note[]> => {
    const connect: IDBDatabase = await useConnectBD();
    const trans: IDBTransaction = connect.transaction('notesApp', 'readonly');
    const store: IDBObjectStore = trans.objectStore('notesApp');

    return new Promise((resolve, reject) => {
        const request: IDBRequest = store.getAll()

        request.onsuccess = (event: Event) => {
            const data: Note[] = (event.target as IDBRequest).result as Note[]

            if (data && data.length) {
                data.sort((a: Note, b: Note) => new Date(b.date).getTime() - new Date(a.date).getTime())
                resolve(data)
            } else {
                resolve(data)
            }
        }

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error)
        }
    })
}

export const getNode = async (id: string): Promise<Note | undefined> => {
    const connect: IDBDatabase = await useConnectBD();
    const trans: IDBTransaction = connect.transaction('notesApp', 'readonly');
    const store: IDBObjectStore = trans.objectStore('notesApp');

    return new Promise((resolve, reject) => {
        const request: IDBRequest = store.get(id)

        request.onsuccess = (event: Event) => {
            resolve((event.target as IDBRequest).result as Note)
        }

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error)
        }
    })
}

export const postNode = async (item: Note): Promise<void> => {
    const connect: IDBDatabase = await useConnectBD();
    const trans: IDBTransaction = connect.transaction('notesApp', 'readwrite');
    const store: IDBObjectStore = trans.objectStore('notesApp');

    return new Promise((resolve, reject) => {
        const request: IDBRequest = store.add(item)

        request.onsuccess = () => {
            resolve();
        }

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error)
        }
    })
}

export const putNode = async (item: Note): Promise<void> => {
    const connect: IDBDatabase = await useConnectBD();
    const trans: IDBTransaction = connect.transaction('notesApp', 'readwrite');
    const store: IDBObjectStore = trans.objectStore('notesApp');

    return new Promise((resolve, reject) => {

        const request: IDBRequest = store.put({...item})
        request.onsuccess = () => {
            resolve()
        }

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error)
        }
    })
}

export const deleteNode = async (id: number): Promise<void> => {
    const connect: IDBDatabase = await useConnectBD();
    const trans: IDBTransaction = connect.transaction('notesApp', 'readwrite');
    const store: IDBObjectStore = trans.objectStore('notesApp');

    return new Promise((resolve, reject) => {
        const request: IDBRequest = store.delete(id)

        request.onsuccess = () => {
            resolve()
        }

        request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error)
        }
    })
}
