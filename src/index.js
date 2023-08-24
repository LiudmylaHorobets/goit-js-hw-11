import { getImage } from './api-pixabay.js';
import { createImageMarkup } from './markup.js';
import './styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(searchForm);
  const searchQuery = formData.get('searchQuery');

  if (searchQuery.trim() === '') {
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;
  gallery.innerHTML = '';

  try {
    await fetchAndDisplayImages(currentQuery, currentPage);
  } catch (error) {
    console.error('Error fetching images:', error);
    Notify.failure(
      'Sorry, there was an error fetching images. Please try again later.'
    );
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  try {
    await fetchAndDisplayImages(currentQuery, currentPage);
  } catch (error) {
    console.error('Error fetching images:', error);
    Notify.failure(
      'Sorry, there was an error fetching images. Please try again later.'
    );
  }
});

// async function fetchAndDisplayImages(q, page) {
//   try {
//     const response = await getImage(q, page);
//     const images = response.hits;

//     if (images && images.length > 0) {
//       createImageMarkup(images, gallery, lightbox);
//     } else {
//       loadMoreBtn.style.display = 'none';
//       gallery.innerHTML =
//         '<p>Sorry, there are no images matching your search query. Please try again.</p>';
//     }

//     if (currentPage < Math.ceil(response.totalHits / 40)) {
//       loadMoreBtn.style.display = 'block';
//     } else {
//       loadMoreBtn.style.display = 'none';
//       gallery.insertAdjacentHTML(
//         'beforeend',
//         "<p>We're sorry, but you've reached the end of search results.</p>"
//       );
//     }
//   } catch (error) {
//     console.error('Error fetching images:', error);
//     Notify.failure(
//       'Sorry, there was an error fetching images. Please try again later.'
//     );
//     throw new Error('Error fetching images from Pixabay API');
//   }
// }
async function fetchAndDisplayImages(q, page) {
  try {
    const response = await getImage(q, page);
    const images = response.hits;

    if (images.length > 0) {
      createImageMarkup(images, gallery, lightbox);
    } else {
      loadMoreBtn.style.display = 'none';
      //   gallery.innerHTML =
      //     '<p>Sorry, there are no images matching your search query. Please try again.</p>';
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (currentPage < Math.ceil(response.totalHits / 40)) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
      //   gallery.insertAdjacentHTML(
      //     'beforeend',
      //     "<p>We're sorry, but you've reached the end of search results.</p>"
      //   );
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    Notify.failure(
      'Sorry, there was an error fetching images. Please try again later.'
    );
    throw new Error('Error fetching images from Pixabay API');
  }
}
