import Input from "../ui/Input";

interface CredentialsFormProps { 
  idInstance: string; 
  apiTokenInstance: string; 
  chatId: string; 
  onIdInstanceChange: (value: string) => void; 
  onApiTokenInstanceChange: (value: string) => void; 
  onChatIdChange: (value: string) => void; 
  onSubmit: () => void; 
}

const CredentialsForm = ({ idInstance, apiTokenInstance, chatId, onIdInstanceChange, onApiTokenInstanceChange, onChatIdChange, onSubmit }: CredentialsFormProps) => {
  return ( 
    <div className="w-full max-w-lg max-md:mx-auto bg-regal-blue backdrop-blur-sm border border-white/10 rounded-xl p-8">
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            GREEN-API Chat
          </h1>
          <p className="text-sm text-white/60 mt-2">
            Enter your credentials to open a chat
          </p>
        </div>
        <Input
          id="idInstance"
          type="text"
          value={idInstance}
          onChangeFunc={onIdInstanceChange}
        />
        <Input
          id="apiTokenInstance"
          type="password"
          value={apiTokenInstance}
          onChangeFunc={onApiTokenInstanceChange}
        />
        <Input
          id="chatId"
          type="text"
          value={chatId}
          onChangeFunc={onChatIdChange}
        />
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-white/60">
            Your API token stays in the current app session.
          </p>

          <button
            type="submit"
            className="bg-linear-to-r from-green-950 to-green-600 hover:from-green-600 hover:to-green-950 text-white text-sm px-8 md:px-10 py-3 rounded-full transition duration-300 cursor-pointer shrink-0"
          >
            Open Chat
          </button>
        </div>
        </form>
      </div>
  );
}
 
export default CredentialsForm;