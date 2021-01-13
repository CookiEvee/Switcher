/* 
This program is for opening, flipping and junking packs
When '1' is clicked a pack is opened.
Then whenever 2 is clicked, for the first 5 clicks a card is flipped, for the next 5 clicks a card is junked.
'd' can be used to skip a flip or a junk
This works by clicking the card and/or the junk button
*/

if (document.getElementById('content').children[3].innerHTML === "Tap cards to reveal..."){
    var card;
    for (card of document.getElementsByClassName("back")){
        card.click();
    }
}
try{
    document.getElementsByClassName('deckcard-container')[0].style.outline = '5px red solid';
}catch(err){}



let counterJunk = 0;
//starts the counter at 0

var HotKeysPack = function(event){
    if (event.key === config.junk) {
        //if the "2" key is pressed
        event.preventDefault();
        //prevents usual keypress
        try{
            let cards = document.getElementsByClassName('deckcard-container');
            let rarity = cards[counterJunk].getElementsByClassName('front')[0].getAttribute('class').substring(24);
            if (!config[rarity]){
                cards[counterJunk].style.outline = '';
                cards[counterJunk+1].style.outline = '5px red solid';
                cards[counterJunk+1].scrollIntoView();
                window.scrollBy(0,-100);
                counterJunk = counterJunk +1;
                return
            }
            if (cards[counterJunk].getElementsByClassName('deckcard-card-mv')[0] !== undefined && config.confirm_highMV){
                if (parseFloat(cards[counterJunk].getElementsByClassName('deckcard-card-mv')[0].innerHTML.substring(3)) >= config.highMV){
                    var MVConfirm = true;
                }else{
                    var MVConfirm = false;
                }
            }else{
                var MVConfirm = false;
            }
            if (cards[counterJunk].getElementsByClassName('deckcard-card-buyers')[0] !== undefined && config.confirm_bid){
                var BidConfirm = true;
            }else{
                var BidConfirm = false;
            }
            if (BidConfirm && MVConfirm){
                if (!confirm('Are you sure you want to junk this card, it has a bid and a high MV?')){
                    cards[counterJunk].style.outline = '';
                    cards[counterJunk+1].style.outline = '5px red solid';
                    cards[counterJunk+1].scrollIntoView();
                    window.scrollBy(0,-100);
                    counterJunk = counterJunk +1;
                    return
                }
            }else if (BidConfirm){
                if (!confirm('Are you sure you want to junk this card, it has a bid?')){
                    cards[counterJunk].style.outline = '';
                    cards[counterJunk+1].style.outline = '5px red solid';
                    cards[counterJunk+1].scrollIntoView();
                    window.scrollBy(0,-100);
                    counterJunk = counterJunk +1;
                    return
                }
            }else if (MVConfirm){
                if (!confirm('Are you sure you want to junk this card, it has a high MV?')){
                    cards[counterJunk].style.outline = '';
                    cards[counterJunk+1].style.outline = '5px red solid';
                    cards[counterJunk+1].scrollIntoView();
                    window.scrollBy(0,-100);
                    counterJunk = counterJunk +1;
                    return
                }
            }
            cards[counterJunk].style.outline = '';
            document.getElementsByClassName("button deckcard-junk-button danger ")[counterJunk].click();
            cards[counterJunk+1].style.outline = '5px red solid';
            cards[counterJunk+1].scrollIntoView();
            window.scrollBy(0,-100);
            //try and junk a card
            counterJunk = counterJunk +1;
            //increase the counter by 1
        }catch(err){
        }        
    }else if(event.key == config.pack){
        //if the user clicks '1'
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
