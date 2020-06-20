// Age in Days

function ageInDays(){
    var birthyear = prompt('What year were you born....Good friend?');
    var Days = (2020 - birthyear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + Days + ' days old.');
    h1.setAttribute('id', 'Days' );
    h1.appendChild(textAnswer);
    document.getElementById('result').appendChild(h1);
}

function reset() {
    document.getElementById('Days').remove();
}