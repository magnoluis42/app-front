function MyButton({ title, disabled } : MyButtonProps) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      disabled={disabled}
    >
      {title}
    </button>
  );
}

type MyButtonProps = {
  title: string;
  disabled: boolean;
}

export default MyButton;