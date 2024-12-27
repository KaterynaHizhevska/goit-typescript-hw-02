import s from './ErrorMessage.module.css';

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={s.error}>
      <p>{message || "Щось пішло не так. Спробуйте пізніше."}</p>
    </div>
  );
};

export default ErrorMessage;