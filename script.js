const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slider = document.querySelector(".slider");
const slideContainer = document.querySelector(".slide-container");
const thumbnails = document.querySelector(".thumbnails");

let imagesData = [];
let totalImages = imagesData.length;
let currentIndex  = 0;

// function for Update main Image
const updateImage = (id)=>{
    if(currentIndex<0){
        currentIndex = 0;
        return
    }else if(currentIndex>=totalImages){
        currentIndex = totalImages - 1;
        return
    }
    currentIndex = id;

    slider.innerHTML = `
    <img src="${imagesData[currentIndex].download_url}" alt="">
    `;

    const thumbnailImage = document.querySelectorAll(".thumbnailImg");
    thumbnailImage.forEach((item)=>{
        if(currentIndex == item.id){
            item.classList.add('active');
           }else{
               item.classList.remove('active');
           }
    })
}

// function for set Thumbnail images
const setThumbnails = ()=>{
    imagesData.forEach((item)=>{
        thumbnails.innerHTML += `
          <img id="${item.id}" class="${currentIndex == item.id ? "active":''} thumbnailImg" src="${item.download_url}" alt="">
        `
    })
    const thumbnailImage = document.querySelectorAll(".thumbnailImg");
    thumbnailImage.forEach((item)=>{
        item.addEventListener('click',(e)=>{
            updateImage(e.target.id);
        })
    })
}

// function for fetch images data
async function fetchImages() {
    const res = await fetch('https://picsum.photos/v2/list?page=1&limit=5');
    imagesData = await res.json();
    totalImages = imagesData.length;
    updateImage(0);
    setThumbnails()
}
fetchImages()

// prev and next functionality
prevBtn.addEventListener('click',()=>{
 updateImage(--currentIndex);
})
nextBtn.addEventListener('click',()=>{
    updateImage(++currentIndex);
})

let touchStart, touchEnd;
slideContainer.addEventListener('touchstart',(e)=>{
    touchStart = e.changedTouches[0].clientX;
});
slideContainer.addEventListener('touchend',(e)=>{
    touchEnd = e.changedTouches[0].clientX;
    if(touchStart - touchEnd > 50){
        updateImage(++currentIndex);
    }else if(touchEnd - touchStart > 50){
        updateImage(--currentIndex);
    }
});

// Add to Cart functionality
function addToCart() {
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.classList.remove('hidden');
    setTimeout(() => {
        confirmationMessage.classList.add('hidden');
    }, 2000);
}