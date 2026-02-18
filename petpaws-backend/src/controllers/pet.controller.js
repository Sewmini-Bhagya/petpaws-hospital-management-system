import db from "../config/db.js";

/* Add a pet */
export const addPet = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { pet_name, species, breed, date_of_birth, gender } = req.body;

    await db.query(
      `INSERT INTO pets 
       (user_id, pet_name, species, breed, date_of_birth, gender)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, pet_name, species, breed, date_of_birth, gender]
    );

    res.json({ message: "Pet registered successfully" });
  } catch (err) {
    console.error("ADD PET ERROR:", err);
    res.status(500).json({ error: "Failed to register pet" });
  }
};




/* Get pets of logged-in client */
export const getMyPets = async (req, res) => {
  const user_id = req.user.user_id;

  const [[client]] = await db.query(
    "SELECT client_id FROM clients WHERE user_id = ?",
    [user_id]
  );

  const [pets] = await db.query(
    "SELECT pet_id, pet_name FROM pets WHERE user_id = ?",
    [user_id]
  );

  res.json(pets);
};

