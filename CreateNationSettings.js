document.getElementById('SettingsButton').addEventListener('click', SubmitSettings);
//adds an event listener to see if the button to go back a menu is clicked
document.getElementById('BackButton').addEventListener('click', Back);
//adds an event listener to see if the button to go back a menu is clicked

let CreateNationInputList = localStorage.getItem('Settings');
if (CreateNationInputList){
    var CreateNationInput = JSON.parse(CreateNationInputList);
}else{
    var CreateNationInput = {'name':'','start':'','currency':'','animal':'','motto':'','email':'','password':''};
}

document.getElementById('SettingsForm').elements[0].value = CreateNationInput.name;
document.getElementById('SettingsForm').elements[1].value = CreateNationInput.start;
document.getElementById('SettingsForm').elements[2].value = CreateNationInput.currency;
document.getElementById('SettingsForm').elements[3].value = CreateNationInput.animal;
document.getElementById('SettingsForm').elements[4].value = CreateNationInput.motto
document.getElementById('SettingsForm').elements[5].value = CreateNationInput.email;
document.getElementById('SettingsForm').elements[6].value = CreateNationInput.password;

function SubmitSettings(){  
    CreateNationInput.name = document.getElementById('SettingsForm').elements[0].value;
    CreateNationInput.start = document.getElementById('SettingsForm').elements[1].value;
    CreateNationInput.currency = document.getElementById('SettingsForm').elements[2].value;
    CreateNationInput.animal = document.getElementById('SettingsForm').elements[3].value;
    CreateNationInput.motto = document.getElementById('SettingsForm').elements[4].value;
    CreateNationInput.email = document.getElementById('SettingsForm').elements[5].value;
    CreateNationInput.password = document.getElementById('SettingsForm').elements[6].value;
    localStorage.setItem('Settings', JSON.stringify(CreateNationInput));
}


function Back(){
    window.location.href = 'popup.html';
    //goes back a menu
}