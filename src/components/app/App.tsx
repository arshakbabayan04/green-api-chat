import { useState } from "react";
import CredentialsForm from "../credentials/CredentialsForm"
import Chat from "../chat/Chat";

function App() {
  const [idInstance, setIdInstance] = useState<string>("");
  const [apiTokenInstance, setApiTokenInstance] = useState<string>("");
  const [chatId, setChatId] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);


  const onSubmit = () => {
    setIsChatOpen(true);
  }

  return (
    <div className="App bg-black text-white h-screen flex items-center justify-center">
      {
        !isChatOpen ? <CredentialsForm 
          idInstance={idInstance}
          apiTokenInstance={apiTokenInstance}
          chatId={chatId}
          onIdInstanceChange={setIdInstance}
          onApiTokenInstanceChange={setApiTokenInstance}
          onChatIdChange={setChatId}
          onSubmit={onSubmit}
        />
       : 
       <Chat 
        chatId={chatId}
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
        />
      }
    </div>
  )
}

export default App
