import s from './ImageCard.module.css';

type ImageCardProps = {
  src: string;
  alt: string;
  onClick: () => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, onClick }) => {
  return (
    <div className={s.card} onClick={onClick}>
      <img src={src} alt={alt} className={s.image} />
    </div>
  );
};

export default ImageCard;