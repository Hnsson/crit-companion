
use mongodb::{ 
    bson::{Document, doc},
    Client,
    Collection,
    Database,
};
use std::error::Error;
use serde_json::Value;
use futures_util::TryStreamExt;


////////////////////////////////////////// PRIVATE /////////////////////////////////////////////////
/// Connect to the database and return the `Database` object
async fn connect_to_database() -> Result<Database, Box<dyn Error>> {
    let client = Client::with_uri_str("mongodb://localhost:27017").await.unwrap(); 
    let database = client.database("crit-db");
    Ok(database)
}

/// Get a specific collection from the database asynchronously
async fn get_collection(collection_name: &str) -> Result<Collection<Document>, Box<dyn Error>> {
    let database = connect_to_database().await?;
    let collection = database.collection(collection_name);
    Ok(collection) // Return the collection wrapped in a Result
}
////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////// PUBLIC //////////////////////////////////////////////////
/// Create a character and insert it into the database
pub async fn create_character(name: &str, alignment: &str, height: i32) -> Result<(), Box<dyn Error>> {
    let collection = get_collection("characters").await?; // Await the Result
    let document = doc! {
        "name": name,
        "alignment": alignment,
        "height": height
    };
    collection.insert_one(document).await?; // Ensure to specify None as the second parameter
    Ok(())
}

pub async fn get_characters() -> Result<Vec<Value>, Box<dyn Error>> {
    let collection: Collection<Document> = get_collection("characters").await?;
    let mut cursor = collection.find(Document::new()).await?; // Corrected: Single argument, empty filter

    let mut documents = Vec::new();

    while let Some(result) = cursor.try_next().await? {
        let json_value = serde_json::to_value(result)?;
        documents.push(json_value);
    }

    Ok(documents)
}

pub async fn get_character(filter: Value) -> Result<Vec<Value>, Box<dyn Error>> {
    let collection: Collection<Document> = get_collection("characters").await?;
    
    let bson_filter = match serde_json::from_value::<Document>(filter) {
        Ok(doc) => doc,
        Err(e) => return Err(Box::new(e))
    };

    let mut cursor = collection.find(bson_filter).await?;
    let mut documents = Vec::new();

    while let Some(result) = cursor.try_next().await? {
        let json_value = serde_json::to_value(result)?;
        documents.push(json_value);
    }

    Ok(documents)
}

pub async fn get_enemy_characters() -> Result<Vec<Value>, Box<dyn Error>> {
    let collection: Collection<Document> = get_collection("enemy-characters").await?;
    let mut cursor = collection.find(Document::new()).await?;

    let mut documents = Vec::new();

    while let Some(result) = cursor.try_next().await? {
        let json_value = serde_json::to_value(result)?;
        documents.push(json_value);
    }

    Ok(documents)
}

pub async fn get_enemy_character(filter: Value) -> Result<Vec<Value>, Box<dyn Error>> {
    let collection: Collection<Document> = get_collection("enemy-characters").await?;
    
    let bson_filter = match serde_json::from_value::<Document>(filter) {
        Ok(doc) => doc,
        Err(e) => return Err(Box::new(e))
    };

    let mut cursor = collection.find(bson_filter).await?;
    let mut documents = Vec::new();

    while let Some(result) = cursor.try_next().await? {
        let json_value = serde_json::to_value(result)?;
        documents.push(json_value);
    }

    Ok(documents)
}

////////////////////////////////////////////////////////////////////////////////////////////////////