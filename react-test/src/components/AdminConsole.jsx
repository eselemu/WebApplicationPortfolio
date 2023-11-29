import Card from './Card';
import contacts from '../data/data';
import React, {useState} from 'react';

function AdminConsole() {
    function mapElements(conts) {
        if (conts) {
            return conts.map((contact) => (
                <Card
                    name={contact.name}
                    img={contact.picture}
                    phone={contact.phone} />
            ));
        }
        return undefined;
    }
    const [filter, setFilter] = useState("");

    var findElement = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(filter.toLowerCase());
    });

    //let allContacts = findElement.length > 0 ? mapElements(findElement) : mapElements(contacts);
    let allContacts = mapElements(findElement);
    function filterListener(event) {
        setFilter(event.target.value)
        console.log(event.target.name + ": " + event.target.value);
    }
    return (
        <div>
            <div>
                <input type='text' placeholder='filter' name='filter' onChange={filterListener} value={filter}></input>
            </div>
            {allContacts && allContacts.length > 0 ? (allContacts) : (<h2>No contacts found</h2>)}
        </div>
    );
}

export default AdminConsole;