import React from "react";

import "./Home.css";

function Home() {
  return (
    <main className="home-container">
      <header>
        <h1>Crit-Companion</h1>
      </header>
      <div className="divider"></div>
      <section className="text">
        <p>Your all-in-one tool to craft, manage, and explore Dungeons & Dragons characters and creations. Unleash your imagination:</p>
        <a href="/about">Discover more</a>
      </section>
    </main>
  )
}

export default Home;
