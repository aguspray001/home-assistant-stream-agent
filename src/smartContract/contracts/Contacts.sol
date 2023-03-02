//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8;

contract Contacts {
    uint public count = 0; //state variable

    struct Contact {
        uint id;
        string name;
        string phone;
    }

    constructor() public {
        createContact('Agus Prayudi', '085961142551');
    }

    mapping(uint => Contact) public contacts;

    function createContact(string memory _name, string memory _phone) public {
        count++;
        contacts[count] = Contact(count, _name, _phone);
    }
}