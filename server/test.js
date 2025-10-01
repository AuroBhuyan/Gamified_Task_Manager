// test-poke.js
(async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/1");
      console.log("Status:", res.status);
      const data = await res.json();
      console.log("Name:", data.name);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  })();
  