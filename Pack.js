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
    document.getElementsByClassName('deckcard-container')[0].style.outline = '5px red solid';
}




let counterFlip = 0;
//starts the counter at 0

var HotKeysPack = function(event){
    if (event.key === '2') {
        //if the "2" key is pressed
        event.preventDefault();
        //prevents usual keypress
        try{
            document.getElementsByClassName('deckcard-container')[counterFlip].style.outline = '';
            document.getElementsByClassName("button deckcard-junk-button danger ")[counterFlip].click();
            document.getElementsByClassName('deckcard-container')[counterFlip+1].style.outline = '5px red solid';
            //try and junk a card
            counterFlip = counterFlip +1;
            //increase the counter by 1
        }catch(err){}        
    }else if(event.key == '1'){
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
    }else if(event.key == 'd'){
        //if user clicks 'd'
        document.getElementsByClassName('deckcard-container')[counterFlip].style.outline = '';
        document.getElementsByClassName('deckcard-container')[counterFlip+1].style.outline = '5px red solid';
        counterFlip = counterFlip+1;
        //increase the counter(can be used to skip a junk)
    }
};

document.onkeyup = HotKeysPack;
//sets up the keybind
