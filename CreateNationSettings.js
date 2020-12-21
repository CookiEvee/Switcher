/* 
This program is for setting the input fields when creating a nation.
When the button is clicked it finds all the inputs and gets the dictionary values to it
Also has a back button for navigation
*/

document.getElementById('SettingsButton').addEventListener('click', SubmitSettings);
//adds an event listener to see if the button to go back a menu is clicked
document.getElementById('BackButton').addEventListener('click', Back);
//adds an event listener to see if the button to go back a menu is clicked

let CreateNationInputList = localStorage.getItem('Settings');
//gets the Current Settings list
if (CreateNationInputList){
    var CreateNationInput = JSON.parse(CreateNationInputList);
    //if it exists then parse the list
}else{
    var CreateNationInput = {'name':'','start':'','currency':'','animal':'','motto':'','email':'','password':'','region':'','regionpassword':''};
    //otherwise create the dictionary
}

document.getElementById('SettingsForm').elements[0].value = CreateNationInput.name;
document.getElementById('SettingsForm').elements[1].value = CreateNationInput.start;
document.getElementById('SettingsForm').elements[2].value = CreateNationInput.currency;
document.getElementById('SettingsForm').elements[3].value = CreateNationInput.animal;
document.getElementById('SettingsForm').elements[4].value = CreateNationInput.motto
document.getElementById('SettingsForm').elements[5].value = CreateNationInput.email;
document.getElementById('SettingsForm').elements[6].value = CreateNationInput.password;
document.getElementById('SettingsForm').elements[7].value = CreateNationInput.region;
document.getElementById('SettingsForm').elements[8].value = CreateNationInput.regionpassword;
//preset the values for the fields to the one in the list.

function SubmitSettings(){  
    CreateNationInput.name = document.getElementById('SettingsForm').elements[0].value;
    CreateNationInput.start = document.getElementById('SettingsForm').elements[1].value;
    CreateNationInput.currency = document.getElementById('SettingsForm').elements[2].value;
    CreateNationInput.animal = document.getElementById('SettingsForm').elements[3].value;
    CreateNationInput.motto = document.getElementById('SettingsForm').elements[4].value;
    CreateNationInput.email = document.getElementById('SettingsForm').elements[5].value;
    CreateNationInput.password = document.getElementById('SettingsForm').elements[6].value;
    CreateNationInput.region =document.getElementById('SettingsForm').elements[7].value; 
    CreateNationInput.regionpassword = document.getElementById('SettingsForm').elements[8].value
    //when the button is clicked, set the values in the dictionary to the inputs 
    localStorage.setItem('Settings', JSON.stringify(CreateNationInput));
    //send the dictionary back to storage
}


function Back(){
    window.location.href = 'popup.html';
    //goes back a menu
}