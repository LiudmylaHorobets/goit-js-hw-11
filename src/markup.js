export function createImageMarkup(data, gallery, lightbox) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="320"/>
        </a>
        <div class="info">
            <p class="info-item">
            <b>Likes</b></br>${likes}
            </p>
            <p class="info-item">
            <b>Views</b></br>${views}
            </p>
            <p class="info-item">
            <b>Comments</b></br>${comments}
            </p>
            <p class="info-item">
            <b>Downloads</b></br>${downloads}
            </p>
        </div>
        </div>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}
