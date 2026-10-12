
interface InputProps {
  id: string;
  type: string;
  value: string;
  onChangeFunc: (value: string) => void;
}

const Input = ({ id, type, value, onChangeFunc }: InputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-white text-sm mb-2"
      >
        {id === 'idInstance' && 'Instance ID'}
        {id === 'apiTokenInstance' && 'API Token Instance'}
        {id === 'chatId' && 'Recipient Chat ID'}
      </label>

      <div
        className="
          rounded-xl border border-white/10
          bg-white/5
          transition-all duration-300
          focus-within:-translate-y-[1px]
          focus-within:border-transparent
          focus-within:bg-zinc-900/90
          focus-within:shadow-[0_0_20px_rgba(147,51,234,0.3),0_0_20px_rgba(16,185,129,0.3)]
          focus-within:[background-image:linear-gradient(#18181b,#18181b),linear-gradient(to_right,#9333ea,#10b981)]
          focus-within:[background-origin:border-box]
          focus-within:[background-clip:padding-box,border-box]
          animate-neon-focus
        "
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) =>
            onChangeFunc(event.target.value)
          }
          required
          placeholder="Enter your API token"
          className="
            w-full px-4 py-3 rounded-xl
            text-white font-medium text-sm
            outline-none bg-transparent
            placeholder:text-white/30
            focus:bg-transparent
          "
        />
      </div>
    </div>
  );
};

export default Input;
