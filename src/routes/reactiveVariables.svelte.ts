let editSaved: object | any = $state({value: false});
let selectedDevice: object | any = $state({id: -1});
let newDeviceAdded: object | any = $state({value: false});

export {
    editSaved,
    selectedDevice,
    newDeviceAdded
}