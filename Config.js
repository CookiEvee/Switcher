/* 
This is the config file. if you look below  every key will be explained.
All keys can be found here: https://keycode.info/
Type in the key you want then look for where it says "key", and copy paste the exact string.
Make sure that once you have changed the keybinds to do the following:

CTRL+S

Go to chrome://extensions or click CTRL+SHIFT+A on firefox

Reload the extension.
*/

var config = {
    "next":"ArrowRight",
    //This is the key to switch to the next nation
    "back":"3",
    //This is the key to switch to the previous nation
    "pack": "1",
    //This is the key for opening packs
    "junk":"2",
    //This is the key to junk cards on both the pack page and the deck page
    "hold":"d",
    //This is the key to skip a card whilst junking
    "deck":"`",
    //This is the key to go to /page=deck whilst on any page
    "move":"m",
    //This is the key to both go to the region page, and move into the region
    "pullevent":"h",
    //This is the key to increment your bid by 0.01 on a page, useful for pullevents.
    "issue":"1",
    //This is the key to answer an issue (and go to /page=deck when issues runs out)
    "create":"r",
    //This is the key to go to the create nation page
    "flag":"f",
    //This is the key to go the /page=upload_flag page
    "value":"v",
    //This is the key to go to /page=deck/value_deck=1
    "NoTemplate": false,
    //if you want the issue answering page and issue choosing page to have a template choose false.
    //if you want no template choose true (this is ugly but faster page loading times).
    //Do not capitalise any of the letters.
    "match": "m",
    //This is the key to match the current bid/ask
    "buy":"b",
    //This is they key to open the buy option on a card
    "sell":"s",
    //This is the key to sell a card

    //Junk Options:
    "legendary": true,
    //Allow junking legendaries
    "epic": true,
    //Allow junking epics
    "ultra-rare": true,
    //Allow junking ultra rares
    "rare": true,
    //Allow junking rares
    "uncommon": true,
    //Allow junking uncommons
    "common": true,
    //Allow junking commons
    "confirm_highMV": true,
    //set to true to confirm before you junk a card with a high MV
    "highMV": 30,
    //The lowest value for a card to be considered high MV
    "confirm_bid": true
    //set to true to confirm before you junk a card with a bid on it
}

