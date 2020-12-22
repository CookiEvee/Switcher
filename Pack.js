/* 
This program is for opening, flipping and junking packs
When '1' is clicked a pack is opened.
Then whenever 2 is clicked, for the first 5 clicks a card is flipped, for the next 5 clicks a card is junked.
'd' can be used to skip a flip or a junk
This works by clicking the card and/or the junk button
*/

let counterFlip = 0;
//starts the counter at 0

var HotKeys = function(event){
    if (event.key === '2') {
        //if the "2" key is pressed
        if (counterFlip < 5){
            //as long as the counter is below 5(5 cards haven't been flipped)
            event.preventDefault();
            try{
            document.getElementsByClassName("back")[counterFlip].click();
            //try and flip a card(try to stop errors when a pack isn't open)
            counterFlip = counterFlip+1;
            //increase the counter
            }catch(err){}
        }else if(counterFlip  > 4){
            //as long as the counter is below 10(5 cards haven't been junked)
            event.preventDefault();
            //prevents usual keypress
            try{
            document.getElementsByClassName("button deckcard-junk-button danger ")[counterFlip-5].click();
            //try and junk a card
            counterFlip = counterFlip +1;
            //increase the counter by 1
            }catch(err){}
        }           //go back to the deck page
    }else if(event.key == '1'){
        //if the user clicks '1'
        event.preventDefault();
        try{
            document.getElementsByClassName("button lootboxbutton")[0].click();
            //try and open a pack
            document.onkeydown = undefined;
            document.onkeyup = undefined;
            document.getElementById('nextInput').remove();
            document.getElementById('backInput').remove();
            //disables all hotkeys and buttons
        }catch(err){}
    }else if(event.key == 'd'){
        //if user clicks 'd'
        counterFlip = counterFlip+1;
        //increase the counter(can be used to skip a junk)
    }
};

document.onkeyup = HotKeys;
//sets up the keybind
