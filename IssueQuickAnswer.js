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
    let IssueNumber = Link.split('=')[2];
    //finds what number the issue is
    let IssueForm = document.createElement('form');
    IssueForm.method = 'POST';
    IssueForm.action = '/page=enact_dilemma/dilemma='+IssueNumber+'/template-overall=none';
    //IssueForm.action = '/page=enact_dilemma/dilemma='+IssueNumber;
    //creates a form to submit the first option to the first issue available.

    var IssueButton = document.createElement('button');
    IssueButton.type = 'submit';
    IssueButton.name = 'choice-0';
    IssueButton.value = '1';
    //Creates the button to answer the issue

    document.body.appendChild(IssueForm);
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
            try{
                document.getElementById('nextInput').remove();
                document.getElementById('backInput').remove();
            }catch(err){}
            IssueButton.click();
            //if there is an issue, answer it
        }else{
            document.onkeydown = undefined;
            document.onkeyup = undefined;
            try{
                document.getElementById('nextInput').remove();
                document.getElementById('backInput').remove();
            }catch(err){}
            document.location = '/page=deck';
            //otherwise go to the cards deck location
        }
    }else if(event.key === '`'){
        document.location = '/page=deck';
    }
}