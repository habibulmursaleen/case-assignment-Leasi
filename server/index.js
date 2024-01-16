const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 9000;
app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017/leasi";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
  } else {
    console.log("Connected to MongoDB");
  }
});

// GET all equipment
app.get("/equipment", async (req, res) => {
  try {
    const db = client.db();
    const equipmentCollection = db.collection("equipment");

    const equipmentData = await equipmentCollection.find({}).toArray();
    res.json(equipmentData);
  } catch (error) {
    console.error("Error retrieving equipment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/equipment", async (req, res) => {
  try {
    const newEquipment = { ...req.body, _id: new ObjectId() };
    const db = client.db();
    const equipmentCollection = db.collection("equipment");

    const result = await equipmentCollection.insertOne(newEquipment);

    if (result) {
      res.status(201).json(newEquipment);
    } else {
      res.status(500).json({ error: "Failed to create equipment" });
    }
  } catch (error) {
    console.error("Error creating equipment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT update equipment by ID
app.put("/equipment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedEquipment = req.body;
    const db = client.db();
    const equipmentCollection = db.collection("equipment");

    const result = await equipmentCollection.replaceOne(
      { _id: new ObjectId(id) },
      updatedEquipment
    );

    if (result) {
      res.json(updatedEquipment);
    } else {
      res.status(404).json({ error: "Equipment not found" });
    }
  } catch (error) {
    console.error("Error updating equipment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE equipment by ID
app.delete("/equipment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const db = client.db();
    const equipmentCollection = db.collection("equipment");

    const result = await equipmentCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 1) {
      res.sendStatus(204); // No Content
    } else {
      res.status(404).json({ error: "Equipment not found" });
    }
  } catch (error) {
    console.error("Error deleting equipment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
