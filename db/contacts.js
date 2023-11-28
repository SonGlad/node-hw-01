const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");


const contactsPath = path.join(__dirname, "contacts.json");


async function readContacts(){
    try{
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data);
    }
    catch(error){
        console.error(error.message);
    }
}

async function writeContacts(contacts){
    try{
        await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2))
    }
    catch(error){
        throw error;
    }
}



async function listContacts() {
    try{
        const contacts = await readContacts();
        return contacts;
    }
    catch(error){
        console.error(error.message);
    }
}   



async function getContactById(id) {
    try{
        const contacts = await readContacts();
        const contact = contacts.find((contact) => contact.id === id);
        return contact || null;
    }
    catch(error){
        console.error(error.message);
    }
}



async function addContact(name, email, phone) {
    try{
        const contacts = await readContacts();
        const newContact = {id: crypto.randomUUID(), name, email, phone}
        contacts.push(newContact);
        await writeContacts(contacts);
        return newContact; 
    }
    catch(error){
        console.error(error.message);
    }

}



async function removeContact(id) {
    try{
        const contacts = await readContacts();
        const index = contacts.findIndex((contact) => contact.id === id)

        if(index === -1){
            return null;
        }

        const newContact = [
            ...contacts.slice(0, index),
            ...contacts.slice(index + 1),
        ];

        await writeContacts(newContact);
        return contacts[index]
    }
    catch(error){
        console.error(error.message);
    }
}


module.exports = {listContacts, getContactById, addContact, removeContact};