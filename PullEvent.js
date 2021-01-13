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
        document.onkeydown = undefined
        document.onkeyup = undefined
        document.location = '/page=deck/value_deck=1';
    }else if(event.key === config.buy){
        document.getElementById('cardauctionoffertable').children[0].children[0].children[1].click();
        document.getElementsByClassName('auctionbid')[1].focus()
    }else if(event.key === config.sell){
        document.getElementById('cardauctionoffertable').children[0].children[0].children[0].click();
        document.getElementsByClassName('auctionbid')[0].focus() 
    }else if (event.key === config.deck){
        document.onkeyup = undefined;
        document.onkeydown = undefined;
        document.location = '/page=deck';
    }
};
document.getElementById('cardauctionoffertable').children[0].children[0].children[0].addEventListener('click',MatchAsk)
function MatchAsk(){
    let Owners = parseFloat(document.getElementsByClassName('deckcard-card-stats')[0].children[0].children[0].children[1].innerHTML);
    let OwnerBid = Math.floor((1/Owners)*100)/100
    let BidList = document.getElementsByClassName('cardauctionunmatchedrow cardauctionunmatchedrow-bid');
    let HighestBid = parseFloat(BidList[BidList.length-1].children[3].children[0].children[0].innerHTML);
    if (HighestBid){
        if(OwnerBid > HighestBid && Owners < 11){
            document.getElementsByName('auction_ask')[0].value = OwnerBid;   
        }else{
            document.getElementsByName('auction_ask')[0].value = HighestBid;
        }
    }else{
        document.getElementsByName('auction_ask')[0].value = HighestBid;
    }    
}

document.getElementsByClassName('currencyformat')[0].onkeyup = function(event){
    if (event.key === config.match){
        let bids = document.getElementsByClassName('cardauctionunmatchedrow-bid')
        document.getElementsByClassName('currencyformat')[0].value = bids[bids.length -1].getElementsByClassName('cardprice')[0].innerHTML;
    }
}

document.getElementsByClassName('currencyformat')[1].onkeyup = function(event){
    if (event.key === config.match){
        let asks = document.getElementsByClassName('cardauctionunmatchedrow-ask')
        document.getElementsByClassName('currencyformat')[1].value = asks[0].getElementsByClassName('cardprice')[0].innerHTML;
    }
}