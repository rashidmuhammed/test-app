const client = require("../config/databaseConnection");

const createActivity = async (req, res) => {
  const { title, description, imageUrls, user_id } = req.body;

  if (!title || !description) {
    res.status(400).json({
      error: "All fields are required",
    });
  }

  if (
    !Array.isArray(imageUrls) ||
    imageUrls.length < 1 ||
    imageUrls.length > 3
  ) {
    res.status(400).json({ error: "Please upload between 1 and 3 images." });
  }

  try {
    const result = await client.query(
      `INSERT INTO activities (user_id, title, description, image_urls, joined_users)
      VALUES ($1, $2, $3, $4, ARRAY[$1]::INT[]) RETURNING *`,
      [user_id, title, description, JSON.stringify(imageUrls)]
    );

    res.status(201).json({
      message: "Activity created successfully",
    });
  } catch (err) {
    console.error("Error creating activity:", err);
    res.status(500).json({ error: "Failed to create activity", err });
  }
};

const getAllActivitiesUserNotJoined = async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const result = await client.query(
      `SELECT * FROM activities WHERE NOT $1 = ANY(joined_users)`,
      [user_id]
    );

    res.status(200).json({
      success: true,
      data: {
        title: result.rows[0].title,
      },
    });
  } catch (err) {
    console.error("Error fetching activities:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
      error: err.message,
    });
  }
};

module.exports = { createActivity, getAllActivitiesUserNotJoined };
