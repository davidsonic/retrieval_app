// weather forcast app

const image = document.querySelector('#prediction-img')
const title = document.querySelector('.prediction-title')

function retrieveFromUrl(img){
    if(img == "") {
        alert('img is not valid');
        return;
    }
    fetch('/gallery/predict?img='+img).then((response)=>{
        var list = document.querySelector('#prediction')
        list.innerHTML = '';
        response.json().then((data)=>{
            if(data.error){
                console.log('javascript error ' + data.error)
                alert('img src not valid')
            }else{
                prediction = JSON.parse(data.prediction)
                console.log(prediction)
                image.src = data.url
                title.setAttribute("style", "visibility: visible;");
                for (var prop in prediction) {
                    document.getElementById('prediction').innerHTML += '<li class="list-group-item h4 list-group-item-success">' + prop + ': ' + prediction[prop] + '</li>';
                  }
            }
        })
    })
}

const urlForm = document.querySelector('form')
urlForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    title.setAttribute("style", "visibility: hidden;");
    const imageUrl = document.querySelector('input')
    const img = imageUrl.value
    retrieveFromUrl(img)
})

document.querySelectorAll('.example_query_img').forEach(item=>{
    item.addEventListener('click', (e)=>{
        title.setAttribute("style", "visibility: hidden;");
        const img = e.target.src
        retrieveFromUrl(img)
    })
})

