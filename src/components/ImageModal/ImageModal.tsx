import Modal from 'react-modal';
import s from './ImageModal.module.css';

type Image = {
  description: string;
  urls: { regular: string };
};

type ImageModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  image: Image | null;
};

Modal.setAppElement("#root");

const ImageModal: React.FC<ImageModalProps> = ({ modalIsOpen, closeModal, image }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      className={s.modal}
      overlayClassName={s.overlay}
      contentLabel={(image?.description) || "Image modal"}
      onRequestClose={closeModal}
    >
      {image && (
        <div className={s.modal}>
          <img
            src={image.urls.regular}
            alt={image.description}
            className={s.modalImage}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;