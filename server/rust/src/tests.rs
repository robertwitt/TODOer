#![cfg_attr(debug_assertions, allow(dead_code, unused_imports))]
use rocket::local::blocking::Client;

#[test]
fn test_hello_world() {
  let client = Client::tracked(super::rocket()).unwrap();
  let response = client.get("/api").dispatch();
  assert_eq!(response.into_string(), Some("Hello, world!".into()));
}

#[test]
fn test_greeting() {
  let client = Client::tracked(super::rocket()).unwrap();
  let response = client.get("/api/robert").dispatch();
  assert_eq!(response.into_string(), Some("Hello robert".into()));
}
