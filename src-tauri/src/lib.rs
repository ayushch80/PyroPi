use std::process::Command;
use regex::Regex;

#[tauri::command]
fn find_ip(hostname: &str, os: &str) -> String {
    let mut ip = String::new();
    if os == "linux" {
        let ipv4_regex = Regex::new(r"\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b").unwrap();
        let mut cmd = Command::new("ping");
        let res = cmd.args([hostname, "-c", "1"]).output().unwrap();

        let stderr = String::from_utf8(res.clone().stderr);
        let stdout = String::from_utf8(res.clone().stdout);

        if stderr != Ok(String::from("")) {
            return ip;
        }

        if let Some(cap) = ipv4_regex.find(stdout.clone().expect("Failed").as_str()) {
            ip = cap.as_str().to_string();
        }
    } else if os == "windows" {
        let ipv6_regex = Regex::new(r"\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b|(?:[a-fA-F0-9:]+:+)+[a-fA-F0-9]+").unwrap();
        let mut cmd = Command::new("ping");
        let res = cmd.args([hostname]).output().unwrap();

        let stderr = String::from_utf8(res.clone().stderr);
        let stdout = String::from_utf8(res.clone().stdout);

        if stderr != Ok(String::from("")) {
            return ip;
        }

        if let Some(cap) = ipv6_regex.find(stdout.clone().expect("Failed").as_str()) {
            ip = cap.as_str().to_string();
        }
    }
    return ip;
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![find_ip])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
