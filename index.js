const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

function isHabitable(planet) {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
}
fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitable(data)) habitablePlanets.push(data);
  })
  .on("error", (err) => {
    console.log("Error :", err);
  })
  .on("end", () => {
    console.log("Finished searching for habitable planets ...");
    console.log(
      "There is the list of the planets names we found :",
      habitablePlanets.map((planet) => planet.kepler_name)
    );
  });
