const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

async function addPhotos() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "prealcac_callidon",
    password: process.env.MYSQL_PASSWORD || "19Ric19car2.",
    database: process.env.MYSQL_DATABASE || "prealcac_callidon",
  });

  try {
    // Read image files and convert to base64
    const imageDir = path.join(__dirname, "../public/images");
    const img1Path = path.join(imageDir, "equipment-1.jpg");
    const img2Path = path.join(imageDir, "equipment-2.jpg");

    if (!fs.existsSync(img1Path) || !fs.existsSync(img2Path)) {
      console.log("Image files not found, skipping photo update");
      return;
    }

    const img1Data = fs.readFileSync(img1Path);
    const img2Data = fs.readFileSync(img2Path);

    const photo1 = "data:image/jpeg;base64," + img1Data.toString("base64");
    const photo2 = "data:image/jpeg;base64," + img2Data.toString("base64");

    // Get all machines
    const [machines] = await connection.query("SELECT id FROM machines ORDER BY created_at ASC");

    // Update first machine with photo1
    if (machines.length > 0) {
      await connection.query("UPDATE machines SET photo = ? WHERE id = ?", [photo1, machines[0].id]);
      console.log(`Updated machine ${machines[0].id} with photo 1`);
    }

    // Update second machine with photo2
    if (machines.length > 1) {
      await connection.query("UPDATE machines SET photo = ? WHERE id = ?", [photo2, machines[1].id]);
      console.log(`Updated machine ${machines[1].id} with photo 2`);
    }

    console.log("Photos added successfully!");
  } catch (error) {
    console.error("Error adding photos:", error);
  } finally {
    await connection.end();
  }
}

addPhotos();
