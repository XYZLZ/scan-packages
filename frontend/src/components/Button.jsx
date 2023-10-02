// eslint-disable-next-line react/prop-types
const Button = ({Icon, color, text, onclick}) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-lg border border-${color}-500
      bg-${color}-500 px-5 py-2.5 text-center text-sm font-medium
    text-white shadow-sm transition-all hover:border-${color}-700
      hover:bg-${color}-700 focus:ring focus:ring-${color}-200 disabled:cursor-not-allowed 
      disabled:border-${color}-300 disabled:bg-${color}-300`}
      onClick={onclick}
    >
      <Icon />
      {text}
    </button>
  );
};

export default Button;
