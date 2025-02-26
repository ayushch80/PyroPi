<script lang="ts">
  import { platform } from "@tauri-apps/plugin-os";
  import { invoke } from "@tauri-apps/api/core";

  let os: string = platform() || undefined;
  let hostname: string = "raspberrypi";
  let loginUsername: string = "";
  let loginPassword: string = "";
  let hostnameData: string = "";

  const pingHostname = (event: Event) => {
    event.preventDefault();
    if (os == "linux") {
      invoke("find_ip", { hostname: `${hostname}.local`, os })
        .then((data) => {
          hostnameData = data as string;
          if (hostnameData == "") {
            hostnameData = "Hostname cannot be resolved"
          }
        })
        .catch((err) => {
          hostname = `ERROR : {err}`;
        });
    } else {
      hostnameData = "Unsupported platform";
    }
  };
</script>

<main class="container">
  <div class="navbar">
    <h1>PyroPi</h1>
  </div>
  <div>
    <span>OS : <code>{os}</code></span><br />
    <span
      >mDNS hostname : <input
        bind:value={hostname}
        placeholder="hostname"
      /><code>.local</code></span
    ><br />
    <span
      >Login username : <input
        bind:value={loginUsername}
        placeholder="username"
      /></span
    ><br />
    <span
      >Login password : <input
        bind:value={loginPassword}
        placeholder="password"
      /></span
    ><br />
    <div>
      <button on:click={pingHostname}>PING HOSTNAME</button><br />
      {hostnameData}<br />
      <button on:click={()=>{}} hidden={!hostnameData}>START SSH</button><br />
    </div>
  </div>
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
</style>
