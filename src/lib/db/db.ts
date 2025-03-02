import Dexie, { type EntityTable } from "dexie";

interface Config {
  deviceName: string;
  hostname: string;
  sshPort: number;
  username: string;
  password: string;
}

interface ExtendedConfig extends Config {
  id: number;
}

let dbName: string = "pyropi";
let version: number = 1;

const db = new Dexie(dbName) as Dexie & {
  configs: EntityTable<
    ExtendedConfig,
    "id"
  >;
};

db.version(version).stores({
  configs: "++id, deviceName, hostname, sshPort, username, password",
});

async function addConfig(data: Config): Promise<string | Error> {
  try {
    const id = await db.configs.add({
      deviceName: data.deviceName,
      hostname: data.hostname,
      sshPort: data.sshPort,
      username: data.username,
      password: data.password,
    });

    return "Successfully saved data.";
  } catch (error) {
    return new Error("Unable to save data.");
  }
}

async function getConfigs(): Promise<ExtendedConfig[]> {
  return db.configs.toArray();
}

export type { Config, ExtendedConfig };
export { addConfig, db, getConfigs };
