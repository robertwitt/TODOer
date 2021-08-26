#![cfg_attr(debug_assertions, allow(dead_code, unused_imports))]
use rocket::{catch, catchers, get, launch, response::content::Html, routes};
use std::str;

#[cfg(test)]
mod tests;

// We can return basic data types like numbers, strings, Option, Result
// because Rocket contains ready-made implementation of the `Responder` trait
// for them. For our own types, we could implement custom responders.
//    (see https://rocket.rs/v0.4/guide/responses/#implementations)
#[get("/")]
fn hello_world() -> &'static str {
    "Hello, world!"
}

// You can use any type that implements the `FromParam` trait
//    (see also https://api.rocket.rs/v0.4/rocket/request/trait.FromParam.html)
// Use `RawStr` to get unsanitized, unvalidated, and undecoded raw string from HTTP message
//    (see also https://api.rocket.rs/v0.4/rocket/http/struct.RawStr.html)
// Rust considers parameter types during routing
//    (see also https://rocket.rs/v0.4/guide/requests/#dynamic-paths)
#[get("/<name>")]
fn greeting(name: String) -> String {
    format!("Hello {}", name)
}

// Catcher for 404 errors
//    (see https://rocket.rs/v0.4/guide/requests/#error-catchers)
#[catch(404)]
fn not_found() -> Html<&'static str> {
    Html(
        r#"
        <h1>Not found</h1>
        <p>What are you looking for?</p>
    "#,
    )
}

// Will generate (async) main function for us
#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/api", routes![hello_world, greeting])
        .register("/", catchers![not_found])
}
