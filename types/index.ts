export {};

declare global {
    interface Note {
        id: string;
        title: string | null;
        text: string | null;
        date: string | Date;
    }
}
