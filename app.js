const thumbnail = document.getElementById("thumbnail"); //TO REFERENCE TO THUBMNAIL IMAGES
const preview = document.getElementById("preview"); //TO REFERENCE TO PREVIEW IMAGES
const prev = document.getElementById("prev"); //TO REFERENCE TO PREVIOUS BUTTON
const next = document.getElementById("next"); //TO REFERENCE TO NEXT IMAGES

//TO FETCH THE IMAGES FROM UNSPLASH API
const getImages = async () => {
  const url = `https://api.unsplash.com/search/photos?page=1&query=flowers landscape&client_id=tWW_WC7gevAz9CcT5CkzYXQ2Y1wr71LQLSZJarsvyvY`;
  const getData = await fetch(url);
  const { results } = await getData.json();
  const imageResults = results.map((res, i) => {
    const obj = {
      id: i,
      img_large: res.urls.regular,
    };
    return obj;
  });
  return imageResults;
};
//previewImagePosition IS TO GET CURRENT IMAGE ID [0...9]
let previewImagePosition = 0;

// add  thumbnail images to dom
addThumbnailImagesToDom = async () => {
  prev.disabled = true;
  const results = await getImages();
  results.forEach((res) => {
    const img = document.createElement("img");
    img.classList.add("img-thumb");
    console.log(res.id);
    img.setAttribute("img-id", res.id);
    img.setAttribute("src", res.img_large);
    thumbnail.appendChild(img);
  });
  handleThumbnailImages(results);

  prev.addEventListener("click", () => {
    handleChangeImage("prev", results);
  });
  next.addEventListener("click", () => {
    handleChangeImage("next", results);
  });
};
//function to preview thumbnail images when clicked  click
const handleThumbnailImages = (results) => {
  const img = document.createElement("img");
  //by default first image is set preview
  img.setAttribute("src", results[0].img_large);
  preview.appendChild(img);

  thumbnail.addEventListener("click", (e) => {
    if (e.target.classList.contains("img-thumb")) {
      preview.innerHTML = " ";
      const id = e.target.getAttribute("img-id");
      //image id is taken and set previewPostion to it so that previous button previous images to current images similarlynext button shows next image
      previewImagePosition = id;

      img.setAttribute("src", results[id].img_large);
      preview.appendChild(img);

      previewImagePosition == 0
        ? (prev.disabled = true)
        : (prev.disabled = false);
      previewImagePosition == 9
        ? (next.disabled = true)
        : (next.disabled = false);
    }
  });
};
//to handle the previous and next buttons
const handleChangeImage = (type, results) => {
  const img = document.createElement("img");
  preview.innerHTML = "";
  if (type == "prev") {
    next.disabled = false;

    img.setAttribute("src", results[--previewImagePosition].img_large);

    previewImagePosition == 0 && (prev.disabled = true);
  } else if (type == "next") {
    prev.disabled = false;
    preview.innerHTML = "";
    img.setAttribute("src", results[++previewImagePosition].img_large);

    previewImagePosition == 9 && (next.disabled = true);
  }
  preview.appendChild(img);
};
addThumbnailImagesToDom();
