import db from "../config/db.js";

/* Book appointment (client) */
export const bookAppointment = async (req, res) => {
  const user_id = req.user.user_id;
  const { pet_id, date, time } = req.body;

  try {
    // get client_id from users → clients table
    const [[client]] = await db.query(
      "SELECT client_id FROM clients WHERE user_id = ?",
      [user_id]
    );

    if (!client) {
      return res.status(400).json({ error: "Client not found" });
    }

    const appointmentStart = `${date} ${time}`;
    const appointmentEnd = `${date} ${time}`;

    await db.query(
      `INSERT INTO appointments 
        (client_id, pet_id, appointment_start, appointment_end, status_id)
       VALUES (?, ?, ?, ?, ?)`,
      [client.client_id, pet_id, appointmentStart, appointmentEnd, 1]
    );

    res.json({ message: "Appointment booked successfully 🐾" });
  } catch (err) {
    console.error("BOOK APPOINTMENT ERROR:", err);
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

/* View client appointments */
export const getMyAppointments = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const [[client]] = await db.query(
      "SELECT client_id FROM clients WHERE user_id = ?",
      [user_id]
    );

    if (!client) {
      return res.json([]);
    }

    const [rows] = await db.query(
      `SELECT 
        a.appointment_id,
        a.appointment_start,
        a.appointment_end,
        p.pet_name,
        a.created_at
       FROM appointments a
       JOIN pets p ON a.pet_id = p.pet_id
       WHERE a.client_id = ?
       ORDER BY a.appointment_start DESC`,
      [client.client_id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};