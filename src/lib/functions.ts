import { invoke } from "@tauri-apps/api/core";
import { platform, type Platform } from "@tauri-apps/plugin-os";

const pingHostname = async (hostname : string, os: Platform = platform()) : Promise<string> => {
    var hostnameData : string = "";
    
    if (os == "linux" || os == "windows") {
        const data : string | any = await invoke("find_ip", { hostname: `${hostname}.local`, os });

        hostnameData = data as string || "Hostname cannot be resolved";
        return hostnameData;
    } else {
        hostnameData = "Unsupported Platform"
        return hostnameData;
    }
};

export {
    pingHostname
}
