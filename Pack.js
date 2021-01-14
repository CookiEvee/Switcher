/* 
This program is for opening, flipping and junking packs
Then whenever 2 is clicked, for the first 5 clicks a card is flipped, for the next 5 clicks a card is junked.
This works by clicking the card and/or the junk button
There are keybinds to skip a card, to junk a card.
There is also settings and confirms for junking high rarities, cards with bids on and cards with MV on
*/

if (document.getElementById('content').children[3].innerHTML === "Tap cards to reveal..."){
    //if there is a pack
    var card;
    for (card of document.getElementsByClassName("back")){
        card.click();
        //flip the packs
    }
}
try{
    document.getElementsByClassName('deckcard-container')[0].style.outline = '5px red solid';
    //highlight the first card
}catch(err){}
//catch in case there are no cards



let counterJunk = 0;
//starts the counter at 0

var HotKeysPack = function(event){
    if (event.key === config.junk) {
        //if the junk key is pressed
        event.preventDefault();
        //prevents usual keypress
        try{
            let cards = document.getElementsByClassName('deckcard-container');
            //find all the cards on the page
            let rarity = cards[counterJunk].getElementsByClassName('front')[0].getAttribute('class').substring(24);
            //find the rarity of the selected card
            if (!config[rarity]){
                //if the user has not allowed junking of that card
                cards[counterJunk].style.outline = '';
                cards[counterJunk+1].style.outline = '5px red solid';
                cards[counterJunk+1].scrollIntoView();
                window.scrollBy(0,-100);
                //changes the highlight to the next card and scrolls it into view
                counterJunk = counterJunk +1;
                //increments the counter
                return
                //breaks out of the function
            }
            if (cards[counterJunk].getElementsByClassName('deckcard-card-mv')[0] !== undefined && config.confirm_highMV){
                //if the card has an MV and the user wants confirms for high MV cards
                if (parseFloat(cards[counterJunk].getElementsByClassName('deckcard-card-mv')[0].innerHTML.substring(3)) >= config.highMV){
                    //check if the MV is high
                    var MVConfirm = true;
                    //if it is set MVConfirm to true
                }else{
                    var MVConfirm = false;
                    //otherwise set it to false
                }
            }else{
                var MVConfirm = false;
                //if the card has no MV set MVConfirm to false
            }
            if (cards[counterJunk].getElementsByClassName('deckcard-card-buyers')[0] !== undefined && config.confirm_bid){
                //if the card has a bid and the uer wants to conirm cards with bids
                var BidConfirm = true;
                //set BidConfirm to true
            }else{
                var BidConfirm = false;
                //otherwise set BidConfirm to false
            }
            if (BidConfirm && MVConfirm){
                //if there is a bid and an MV
                if (!confirm('Are you sure you want to junk this card, it has a bid and a high MV?')){
                    //send a confirm message
                    cards[counterJunk].style.outline = '';
                    cards[counterJunk+1].style.outline = '5px red solid';
                    cards[counterJunk+1].scrollIntoView();
                    window.scrollBy(0,-100);
                    //change the highlighting and scroll the next card into view
                    counterJunk = counterJunk +1;
                    //increase the Junk Counter
                    return
                    //break out of the function
                }
            }else if (BidConfirm){
                //otherwise, if the card only has a bid
                if (!confirm('Are you sure you want to junk this card, it has a bid?')){
                    //send a confirm message, if they cancel it
                    cards[counterJunk].style.outline = '';
                    cards[counterJunk+1].style.outline = '5px red solid';
                    cards[counterJunk+1].scrollIntoView();
                    window.scrollBy(0,-100);
                    //change highlighting and scroll into view
                    counterJunk = counterJunk +1;
                    //increase counter
                    return
                    //break out of function
                }
            }else if (MVConfirm){
                //otherwise if the card only has an MV
                if (!confirm('Are you sure you want to junk this card, it has a high MV?')){
                    //send a confirm message, if they cancil it
                    cards[counterJunk].style.outline = '';
                    cards[counterJunk+1].style.outline = '5px red solid';
                    cards[counterJunk+1].scrollIntoView();
                    window.scrollBy(0,-100);
                    counterJunk = counterJunk +1;
                    //change highlighting, scroll next card into view, increase counter
                    return
                    //break out of functions
                }
            }
            document.getElementsByClassName("button deckcard-junk-button danger ")[counterJunk].click();
            //junk card
            cards[counterJunk].style.outline = '';
            cards[counterJunk+1].style.outline = '5px red solid';
            cards[counterJunk+1].scrollIntoView();
            window.scrollBy(0,-100);
            //change highlighting
            counterJunk = counterJunk +1;
            //increase the counter by 1
        }catch(err){
        }        
    }else if(event.key == config.pack){
        //if the user clicks the pack key
        document.onkeydown = undefined;
        document.onkeyup = undefined;
        //disable all other hotkeys
        event.preventDefault();
        if (document.getElementById('content').children[3].innerHTML === "Tap cards to reveal..."){
            document.getElementById('nextInput').remove();
            document.getElementById('backInput').remove();
            //if the pack is opened, stop any buttons being clicked
            document.location = '/page=deck';
            //go back to deck page
        }else if (document.getElementsByClassName("button lootboxbutton")[0]){
            document.getElementById('nextInput').remove();
            document.getElementById('backInput').remove();
            //if there are packs, stop any buttons being clicked
            document.getElementsByClassName("button lootboxbutton")[0].click();
            //try and open a pack
        }else{
            document.getElementById('backInput').click();
            //otherwise switch users
            document.getElementById('nextInput').remove();
            document.getElementById('backInput').remove();
            //and stop any other buttons being clicked
        }
    }else if(event.key == config.hold){
        //if user clicks 'd'
        document.getElementsByClassName('deckcard-container')[counterJunk].style.outline = '';
        try{
        document.getElementsByClassName('deckcard-container')[counterJunk+1].style.outline = '5px red solid';
        document.getElementsByClassName('deckcard-container')[counterJunk+1].scrollIntoView();
        window.scrollBy(0,-100);
        }catch(err){}
        counterJunk = counterJunk+1;
        //increase the counter(can be used to skip a junk)
    }
};

document.onkeyup = HotKeysPack;
//sets up the keybind
