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

// Clear history if any when the app starts
Dexie.delete("history");

const history = new Dexie("history") as Dexie & {
    history: EntityTable<
        ExtendedHistoryElement,
        "id"
    >;
};

history.version(version).stores({
    history: "++id, path, timestamp, states",
});

const addHistory = (path: string, states: object | any) => {
    try {

        history.history.add({
            path: path,
            timestamp: Date.now(),
            states: {
                editSaved: states.editSaved,
                selectedDevice: states.selectedDevice,
                newDeviceAdded: states.newDeviceAdded
            }
        })
    } catch (error) {
        console.error(error);
    }
};