let editSaved: object | any = $state({ value: false });
let selectedDevice: object | any = $state({ id: -1 });
let newDeviceAdded: object | any = $state({ value: false });

// To track the history
let historyIndex: object | any = $state({ index: 0, id: 1 });

export { editSaved, historyIndex, newDeviceAdded, selectedDevice };
