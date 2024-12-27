import s from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

type GalleryImage = {
  id: string;
  description: string;
  urls: { small: string; regular: string };
};

type ImageGalleryProps = {
  images: GalleryImage[];
  openModal: (image: GalleryImage) => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={s.gallery}>
      <li>
        <div className={s.containerGallery}>
          {images.map((image) => (
            <ImageCard
              key={image.id}
              src={image.urls.small}
              alt={image.description}
              onClick={() => openModal(image)}
            />
          ))}
        </div>
      </li>
    </ul>
  );
};

export default ImageGallery;