/* 
This program is dedicated to creating a keybind for answering issues on the /page=dilemmas page.
When on the dilemmas page, the first issue will be found and using it's number a button is created that takes the user
to the enact_dilemma page for that issue, this answers the issue.
The keybind is set to '1' by default.
*/

var Link;
//declares Link for use in functions
try{
    Link = document.getElementsByClassName('dilemmalist')[0].children[0].children[0].href;
    //attempts to find the first issue
}catch(err){
    //if there is no first issue
}
if (Link !== undefined){
    //if there is an issue
    var IssueNumber = Link.split('=')[2];
    //finds what number the issue is

    var IssueButton = document.createElement('button');
    IssueButton.addEventListener('click',AnswerIssue)
    //Creates the button to answer the issue

    document.body.appendChild(IssueButton);
    //adds the button to the document
} 
document.onkeyup = function(event) {
    if (event.key === config.issue) {
        //if the user clicks the 1 key
        event.preventDefault();
        if (Link !== undefined){
            document.onkeydown = undefined;
            document.onkeyup = undefined;
            //stops the user pressing a different key
            try{
                backInput.removeEventListener("click", loginback);
                nextInput.removeEventListener("click", loginforward);
            }catch(err){}
            IssueButton.click();
            //if there is an issue, answer it
        }else{
            document.onkeydown = undefined;
            document.onkeyup = undefined;
            try{
                backInput.removeEventListener("click", loginback);
                nextInput.removeEventListener("click", loginforward);
            }catch(err){}
            document.location = '/page=deck';
            //otherwise go to the cards deck location
        }
    }else if(event.key === config.deck){
        document.location = '/page=deck';
        //if the user presses the deck key, go to deck
    }
}

function AnswerIssue(){
    if (config.NoTemplate){
        document.location = '/page=enact_dilemma/dilemma='+IssueNumber+'/choice-0=1/template-overall=none';
        //if the user has chosen no template, then go to the no template page
    }else{
        document.location = '/page=enact_dilemma/dilemma='+IssueNumber+'/choice-0=1';
        //otherwise answer the issue normally
    }
}