type BotaoAbrirProps = {
  onOpen: () => void;
};

export default function BotaoAbrir({ onOpen }: BotaoAbrirProps) {
  return (
    <button onClick={onOpen}>
      Abrir Modal
    </button>
  );
}
