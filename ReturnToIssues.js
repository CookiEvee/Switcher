/* 
This program deals with what occurs after an issue is answered

If there are still issues left it takes the user back to the dillemmas page, otherwise it goes back to the deck page.
*/
document.onkeydown = function(event){
    document.onkeydown = undefined;
    if (document.getElementsByClassName('error')[0]){
        let urlList = document.URL.split('/');
        let choice = urlList[5].substring(7,8);
        let dilemma = urlList[4].substring(8);
        choice = parseInt(choice)+1;
        if (config.NoTemplate){
            document.location.replace('https://www.nationstates.net/page=enact_dilemma/dilemma='+dilemma+'/choice-'+choice+'=1/template-overall=none');
        }else{
            document.location.replace('https://www.nationstates.net/page=enact_dilemma/dilemma='+dilemma+'/choice-'+choice+'=1');
        }
    }else{
        if (config.NoTemplate){
            document.location.replace('https://www.nationstates.net/page=dilemmas/template-overall=none')
        }else{
            document.location = '/page=dilemmas'
        }
    }
}