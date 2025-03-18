import { goto } from "$app/navigation";
import { addHistory } from ".";
import {
    editSaved,
    historyIndex,
    newDeviceAdded,
    selectedDevice,
} from "../../routes/reactiveVariables.svelte";

const link = async (path: string): Promise<boolean> => {
    try {
        const states: object = {
            editSaved,
            newDeviceAdded,
            selectedDevice,
        };
        goto(path);
        addHistory(path, states);
        historyIndex.value += 1;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export { link };
