const accessKey = 'ddamMobp43cPgMAmYK_pTvY4WG6f3Kl8DeZCk3WMb_4'
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imagesContainer = document.querySelector('.images-container');
const loadmore = document.querySelector('.loadMoreBtn');

let page=1;

const fetchImages = async (query,pageNo)=>{
    imagesContainer.innerHTML='';
const url = `
https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

const response = await fetch(url);
const data = await response.json();
// console.log(data);

data.results.forEach(photo =>{
const imageElement = document.createElement('div');
imageElement.classList.add('imageDiv');
imageElement.innerHTML=`<img src="${photo.urls.regular}"/>`;
const overlayElement = document.createElement('div');
overlayElement.classList.add('overlay');

const overlayText=document.createElement('h3');
overlayText.innerText=`${photo.alt_description}`;

overlayElement.appendChild(overlayText);
imageElement.appendChild(overlayElement);
imagesContainer.appendChild(imageElement);
})

}

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
const inputText = searchInput.value.trim();
if(inputText!==''){
    page=1;
    fetchImages(inputText,page);
}
    else{
        imagesContainer.innerHTML=`<h2>please enter a fetch query.</h2>`
    }

});

loadmore.addEventListener('click',()=>{
fetchImages(searchInput.value.trim(),++page);
});
