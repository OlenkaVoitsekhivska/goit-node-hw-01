const fs = require("fs").promises;

const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    let data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    let result = await JSON.parse(data).find(
      ({ id }) => id === contactId.toString()
    );
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    let result = await JSON.parse(data).filter(({ id }) => id !== contactId);
    const stringifiedData = JSON.stringify(result);
    await fs.writeFile(contactsPath, stringifiedData, "utf8");
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = await JSON.parse(data);
    const obj = { id: nanoid(), name, email, phone };
    await fs.writeFile(
      contactsPath,
      JSON.stringify([...parsedData, obj]),
      "utf8"
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
