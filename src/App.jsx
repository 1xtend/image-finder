import { useState, useEffect } from 'react';
import axios from 'axios';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Modal from './components/Modal';
import Button from './components/Button';

function App() {
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);

  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    setLoading(true);

    axios
      .get('https://pixabay.com/api/', {
        params: {
          q: query,
          page,
          per_page: 12,
          key: '33665756-797053471af2a43772fb226e5',
          image_type: 'photo',
          orientation: 'horizontal',
        },
      })
      .then((res) => {
        setImages((prevImages) => [...prevImages, ...res.data.hits]);
        setPagesCount(Math.ceil(res.data.totalHits / 12));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    const timeout = setTimeout(() => {
      window.scrollBy({
        behavior: 'smooth',
        top: window.innerHeight - 144,
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [page]);

  function openModal(image) {
    setActiveImage(image);
  }

  function closeModal() {
    setActiveImage(null);
  }

  function handleSearchSubmit(e, searchQuery) {
    e.preventDefault();

    setImages([]);
    setQuery(searchQuery);
    setPage(1);
    setPagesCount(0);
  }

  function handleLoadMoreClick() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <div className="App">
      {activeImage && <Modal onClose={closeModal} image={activeImage} />}
      <Searchbar onSubmit={handleSearchSubmit} />

      {!error && <ImageGallery images={images} onOpen={openModal} />}
      {error && (
        <p
          style={{
            textAlign: 'center',
            color: 'red',
            fontSize: '20px',
            fontWeight: 700,
          }}
        >
          {error}
        </p>
      )}

      <div className="BottomWrapper">
        {!error && loading && <Loader />}
        {!error && images.length > 0 && page < pagesCount && (
          <Button onLoadMore={handleLoadMoreClick} />
        )}
      </div>
    </div>
  );
}

export default App;
