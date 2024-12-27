import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import axios from "axios";

type GalleryImage = {
  id: string;
  description: string;
  urls: { small: string; regular: string };
};

const accessKey = "BKfrCHbs8Xe0DH6EXeVKITP6FERPUbzqPAktJyW4mDg";

const App: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const totalPages = useRef<number>(0);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setIsError(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://api.unsplash.com/search/photos", {
          params: { query, page, per_page: 12 },
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        });
        const results = response.data.results as GalleryImage[];

        if (page === 1) {
          setImages(results);
        } else {
          setImages((prevImages) => [...prevImages, ...results]);
        }
        totalPages.current = response.data.total_pages;
      } catch (error) {
        console.error("Помилка отримання зображень:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {isError && <ErrorMessage message="Помилка завантаження зображень. Спробуйте пізніше." />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && page < totalPages.current && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default App;