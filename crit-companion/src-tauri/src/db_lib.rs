
use mongodb::{ 
    bson::{Document, doc, Bson},
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
pub async fn create_character(name: &str, race: &str, class: &str, alignment: &str, height: i32, attributes: Value) -> Result<(), Box<dyn Error>> {
    let collection = get_collection("characters").await?; // Await the Result
    
    let attributes_bson: Bson = attributes
    .try_into()
    .map_err(|e| format!("Failed to convert attributes to Bson: {}", e))?;

    let document = doc! {
        "name": name,
        "alignment": alignment,
        "height": height,
        "race": race,
        "class": class,
        "attributes": attributes_bson
    };
    collection.insert_one(document).await?; // Ensure to specify None as the second parameter
    Ok(())
}

pub async fn get_characters(offset: usize, limit: usize, filter: Option<String>) -> Result<(Vec<Value>, u64), Box<dyn Error>> {
    let collection: Collection<Document> = get_collection("characters").await?;

    // Create a filter document if there's a filter provided
    let filter_doc = match filter {
        Some(f) => doc! { "$or": [
            { "name": { "$regex": &f, "$options": "i" } },
            { "race": { "$regex": &f, "$options": "i" } },
            { "class": { "$regex": &f, "$options": "i" } },
            { "alignment": { "$regex": &f, "$options": "i" } },
        ]},
        None => Document::new(), // No filter if none is provided
    };

    // Adjust the query to include pagination
    let mut cursor = collection.find(filter_doc.clone()).await?;
    
    let mut documents = Vec::new();

    while let Some(result) = cursor.try_next().await? {
        let json_value = serde_json::to_value(result)?;
        documents.push(json_value);
    }

    // Return only the requested range of documents
    let paginated_docs = documents.into_iter().skip(offset).take(limit).collect();

    // Get the total count of matching documents
    let total_count = collection.count_documents(filter_doc.clone()).await?;

    Ok((paginated_docs, total_count)) // Return paginated documents along with the total count
}


pub async fn get_enemy_characters(offset: usize, limit: usize, filter: Option<String>) -> Result<(Vec<Value>, u64), Box<dyn Error>> {
    let collection: Collection<Document> = get_collection("enemy-characters").await?;

    // Create a filter document if there's a filter provided
    let filter_doc = match filter {
        Some(f) => doc! { "$or": [
            { "name": { "$regex": &f, "$options": "i" } },
            { "type": { "$regex": &f, "$options": "i" } },
            { "size": { "$regex": &f, "$options": "i" } },
            { "hp": { "$regex": &f, "$options": "i" } },
        ]},
        None => Document::new(), // No filter if none is provided
    };

    // Adjust the query to include pagination
    let mut cursor = collection.find(filter_doc.clone()).await?;
    
    let mut documents = Vec::new();

    while let Some(result) = cursor.try_next().await? {
        let json_value = serde_json::to_value(result)?;
        documents.push(json_value);
    }

    // Return only the requested range of documents
    let paginated_docs = documents.into_iter().skip(offset).take(limit).collect();

    // Get the total count of matching documents
    let total_count = collection.count_documents(filter_doc.clone()).await?;

    Ok((paginated_docs, total_count)) // Return paginated documents along with the total count
}

////////////////////////////////////////////////////////////////////////////////////////////////////