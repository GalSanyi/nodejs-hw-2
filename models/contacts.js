// const fs = require('fs/promises')
const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (books) => {
  await fs.writeFile(contactsPath, JSON.stringify(books, null, 2));
}



const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.contactId === contactId);
  if(!result){
    return null;
  }
  return result;
}


const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id:nanoid(),

  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.contactId === contactId);
  if(idx === -1){
    return null;
  }
  const [remove]= contacts.splice(idx, 1);
  updateContacts(contacts);
  return remove;
}


const updateContact = async (contactId, {name, email, phone}) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.contactId === contactId);
  if(idx === -1){
    return null;
  }
contacts[idx] = {name, email, phone};
await updateContacts(contacts);
return contacts[idx];


}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
