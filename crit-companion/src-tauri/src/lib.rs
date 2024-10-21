mod db_lib;

use serde_json::Value;



////////////////////////////////////// TAURI COMMANDS //////////////////////////////////////////////
#[tauri::command]
async fn create_character(name: &str, alignment: &str, height: i32) -> Result<String, String> {
    // Await the result of create_character and convert errors to strings
    db_lib::create_character(name, alignment, height)
        .await
        .map_err(|e| e.to_string())?; // Convert error to String

    Ok(format!("Character {} created", name))
}

#[tauri::command]
async fn fetch_characters() -> Result<Vec<Value>, String> {
    db_lib::get_characters()
        .await
        .map_err(|e| e.to_string()) // Convert any errors to String
}

#[tauri::command]
async fn fetch_character(filter: Value) -> Result<Vec<Value>, String> {
    db_lib::get_character(filter)
        .await
        .map_err(|e| e.to_string()) // Convert any errors to String
}

#[tauri::command]
async fn fetch_enemy_characters() -> Result<Vec<Value>, String> {
    db_lib::get_enemy_characters()
        .await
        .map_err(|e| e.to_string()) // Convert any errors to String
}

#[tauri::command]
async fn fetch_enemy_character(filter: Value) -> Result<Vec<Value>, String> {
    db_lib::get_enemy_character(filter)
        .await
        .map_err(|e| e.to_string()) // Convert any errors to String
}

////////////////////////////////////////////////////////////////////////////////////////////////////


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            create_character,
            fetch_characters,
            fetch_character,
            fetch_enemy_characters,
            fetch_enemy_character,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
