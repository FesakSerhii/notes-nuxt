export {};

declare global {
    interface Note {
        id: number;
        title: string | null;
        text: string | null;
        date: string | Date;
    }
}
