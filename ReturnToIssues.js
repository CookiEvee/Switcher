/* 
This program deals with what occurs after an issue is answered

If there are still issues left it takes the user back to the dillemmas page, otherwise it goes back to the deck page.
*/
document.onkeydown = function(event){
    document.onkeydown = undefined;
    document.onkeyup = undefined;
    if (document.getElementsByClassName('error')[0]){
        //if there was an error
        let urlList = document.URL.split('/');
        let choice = urlList[5].substring(7,8);
        let dilemma = urlList[4].substring(8);
        choice = parseInt(choice)+1;
        //find the next choice and the current dilemma
        if (config.NoTemplate){
            //if the user wants no template
            document.location.replace('https://www.nationstates.net/page=enact_dilemma/dilemma='+dilemma+'/choice-'+choice+'=1/template-overall=none');
            //try and choose the next choice
        }else{
            document.location.replace('https://www.nationstates.net/page=enact_dilemma/dilemma='+dilemma+'/choice-'+choice+'=1');
            //choose the next choice for the issue
        }
    }else{
        //if there was no error
        if (config.NoTemplate){
            //if the user wants no template
            document.location.replace('https://www.nationstates.net/page=dilemmas/template-overall=none')
            //go back to the dilemma page
        }else{
            document.location = '/page=dilemmas'
            //go back to the dilemma page.
        }
    }
}