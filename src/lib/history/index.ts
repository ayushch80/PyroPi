import Dexie, { type EntityTable } from "dexie";

const version = 1;

interface HistoryElement {
    path: string;
    timestamp: number;
    states: {
        editSaved: object | any;
        selectedDevice: object | any;
        newDeviceAdded: object | any;
    };
}

interface ExtendedHistoryElement extends HistoryElement {
    id: number;
}

const history = new Dexie("history") as Dexie & {
    history: EntityTable<
        ExtendedHistoryElement,
        "id"
    >;
};

// Clear history if any when the app starts
history.delete({ disableAutoOpen: false });

history.version(version).stores({
    history: "++id, path, timestamp, states",
});

const addHistory = async (
    path: string,
    states: object | any,
): Promise<boolean> => {
    try {
        await history.history.add({
            path: path,
            timestamp: Date.now(),
            states: {
                editSaved: states.editSaved,
                selectedDevice: states.selectedDevice,
                newDeviceAdded: states.newDeviceAdded,
            },
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const deleteAfterId = async (id: number): Promise<boolean> => {
    try {
        await history.history.where("id").above(id).delete();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const deleteAfterIndex = async (index: number): Promise<boolean> => {
    try {
        return await deleteAfterId(index + 1);
    } catch (error) {
        console.error(error);
        return false;
    }
};

export type { ExtendedHistoryElement, HistoryElement };
export { addHistory, deleteAfterId, deleteAfterIndex, history };
