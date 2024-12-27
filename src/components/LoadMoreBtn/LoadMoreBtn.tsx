import s from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  onClick: () => void;
};

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button className={s.button} onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;