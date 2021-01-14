/* 
This is the pull event script, when the user pressed h(can be turned off to just pressing anything)
it will find the bid you've placed and up it
*/

let matchedRow = document.querySelectorAll('tr.cardauctionmatchedrow');
//finds how many matches there are in the page

document.onkeyup = function(event){
    //creates a keybind
    if(event.key == config.pullevent){
        document.onkeydown = undefined
        document.onkeyup = undefined
        //if the pull event button is pressed
        if (matchedRow.length){
            //if there are matches
            let key = matchedRow.length - 1;
            //finds how many matches there are.
            let BidsorAsks = matchedRow[key].querySelectorAll('[title="Click to edit"]');
            //finds all the matches that have you in them
            BidsorAsks[BidsorAsks.length - 1].firstChild.click();
            //finds the last request(going to be the bid) and clicks it to activate the container to increment the bid
            document.getElementById('new_price_value').stepUp();
            //increment the bid by 1
            document.getElementById('change_price_button').click();
            //submit the new price
        }
        //stop other actions being done
    }else if (event.key === config.value){
        //if the user presses the value key
        document.onkeydown = undefined
        document.onkeyup = undefined
        //stop other user inputs
        document.location = '/page=deck/value_deck=1';
        //go to the value_deck page
    }else if(event.key === config.buy){
        //if the user presses the buy button
        document.getElementById('cardauctionoffertable').children[0].children[0].children[1].click();
        document.getElementsByClassName('auctionbid')[1].focus()
        //click on the but button and focus on the input
    }else if(event.key === config.sell){
        //if the user presses the sell key
        document.getElementById('cardauctionoffertable').children[0].children[0].children[0].click();
        document.getElementsByClassName('auctionbid')[0].focus() 
        //press the sell button and focus on the input field
    }else if (event.key === config.deck){
        //if the user presses the deck button
        document.onkeyup = undefined;
        document.onkeydown = undefined;
        //stop further input
        document.location = '/page=deck';
        //go to the deck page
    }
};
document.getElementById('cardauctionoffertable').children[0].children[0].children[0].addEventListener('click',MatchAsk)
//add an event listener for when the user presses the sell button
function MatchAsk(){
    let Owners = parseFloat(document.getElementsByClassName('deckcard-card-stats')[0].children[0].children[0].children[1].innerHTML);
    //find the number of owners
    let OwnerBid = Math.floor((1/Owners)*100)/100
    //create the bid for the owner quantity(1/owners)
    let BidList = document.getElementsByClassName('cardauctionunmatchedrow-bid');
    let HighestBid = parseFloat(BidList[BidList.length -1].getElementsByClassName('cardprice')[0].innerHTML);
    //find the highest bid
    if (HighestBid){
        if(OwnerBid > HighestBid && Owners < 7){
            //if there is a bid but the Owner bid is higher
            document.getElementsByName('auction_ask')[0].value = OwnerBid;
            //set the value to the owner bid   
        }else{
            document.getElementsByName('auction_ask')[0].value = HighestBid;
            //otherwise set the value to the highest bid
        }
    }else{
        document.getElementsByName('auction_ask')[0].value = OwnerBid;
        //if there is no HighestBid set the value to OwnerBid
    }    
}

document.getElementsByClassName('currencyformat')[0].onkeyup = function(event){
    //add a keybind to the sell input field
    if (event.key === config.match){
        //if the user presses the match button
        event.preventDefault()
        event.stopPropagation()
        //stop other functions being called
        let bids = document.getElementsByClassName('cardauctionunmatchedrow-bid')
        document.getElementsByClassName('currencyformat')[0].value = bids[bids.length -1].getElementsByClassName('cardprice')[0].innerHTML;
        //find the highest bid and set the input to it
    }
}

document.getElementsByClassName('currencyformat')[1].onkeyup = function(event){
    //add a keybind to the buy input field
    if (event.key === config.match){
        //if the user presses the match button
        event.preventDefault()
        event.stopPropagation()
        //stop other functions being called
        let asks = document.getElementsByClassName('cardauctionunmatchedrow-ask')
        document.getElementsByClassName('currencyformat')[1].value = asks[0].getElementsByClassName('cardprice')[0].innerHTML;
        //find the lowest ask and set the input to it
    }
}