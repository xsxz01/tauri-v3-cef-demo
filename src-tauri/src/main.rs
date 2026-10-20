#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust.", name)
}

#[tauri_runtime_cef::cef_entry_point]
fn main() {
    tauri::Builder::default()
        .runtime(tauri_runtime_cef::Cef::default())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
