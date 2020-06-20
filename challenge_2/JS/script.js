function generateCats(){
    const numbers = [1, 2, 3, 4 ,5 ,6 ,7 , 8, 9 ,10]
    var image_selection = numbers[Math.floor(Math.random() * numbers.length)];
    var card = document.createElement('div');
    var image = document.createElement('img');
    card.setAttribute('class', 'card tc dib br3 pa3 ma2 grow bw2 shadow-5 card-bg', 'id', 'card');
    image.src = `https://robohash.org/${image_selection}?200x200`
    div = document.getElementById('cat-group');
    card.appendChild(image);
    div.appendChild(card);


}