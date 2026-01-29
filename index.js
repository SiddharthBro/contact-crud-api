const express = require("express");
const app = express();

app.use(express.json());

let contacts = [];
let idCounter = 1;

// GET all contacts
app.get("/contacts", (req, res) => {
  res.status(200).json(contacts);
});

// POST create contact
app.post("/contacts", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newContact = {
    id: idCounter++,
    name,
    email,
    phone
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
});

// PUT update contact
app.put("/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find(c => c.id === id);

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const { name, email, phone } = req.body;
  contact.name = name || contact.name;
  contact.email = email || contact.email;
  contact.phone = phone || contact.phone;

  res.status(200).json(contact);
});

// DELETE contact
app.delete("/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Contact not found" });
  }

  contacts.splice(index, 1);
  res.status(200).json({ message: "Contact deleted successfully" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
