var Link;
//declares Link for use in functions
try{
    Link = document.getElementsByClassName('dilemmalist')[0].children[0].children[0].href;
    //attempts to find the first issue
}catch(err){
    Link = undefined;
    //if there is no first issue
}
if (Link !== undefined){
    //if there is an issue
    let IssueNumber = Link.split('=')[2];
    //finds what number the issue is
    let IssueForm = document.createElement('form');
    IssueForm.method = 'POST';
    IssueForm.action = '/page=enact_dilemma/dilemma='+IssueNumber;
    //creates a form to submit the first option to the first issue available.

    var IssueButton = document.createElement('button');
    IssueButton.type = 'submit';
    IssueButton.name = 'choice-0';
    IssueButton.value = '1';
    //Creates the button to answer the issue

    document.getElementById('content').appendChild(IssueForm);
    IssueForm.appendChild(IssueButton);
    //adds the button and the form to the document
} 

document.onkeyup = function(event) {
    if (event.key === '1') {
        //if the user clicks the 1 key
        event.preventDefault();
        if (Link !== undefined){
            document.onkeydown = undefined;
            document.onkeyup = undefined;
            document.getElementById('nextInput').remove();
            document.getElementById('backInput').remove();
            IssueButton.click();
            //if there is an issue, answer it
        }else{
            document.onkeydown = undefined;
            document.onkeyup = undefined;
            document.getElementById('nextInput').remove();
            document.getElementById('backInput').remove();
            document.location = '/page=deck';
            //otherwise go to the cards deck location
        }
    }
}