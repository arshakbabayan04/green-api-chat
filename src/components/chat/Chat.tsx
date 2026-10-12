import { useEffect, useRef, useState } from "react";
import type { IMessage } from "../../types/message";
import { useHttp } from "../../hooks/http.hook";
import { sendMessage, getMessages, deleteNotification } from "../../services/greenApi";

interface ChatProps {
  chatId: string;
  idInstance: string;
  apiTokenInstance: string;
}

const Chat = ({ chatId, idInstance, apiTokenInstance }: ChatProps) => {
  const [content, setContent] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { request } = useHttp();

  const handleSendMessage = async (content: string) => {
    const text = content.trim();

    if (!text) return;

    try { 
      const result = await sendMessage(request, idInstance, apiTokenInstance, chatId, content);

      const newMessage: IMessage = {
        id: result.idMessage,
        content: text,
        sender: 'me',
        timestamp: Date.now(),
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    } 
  }

  useEffect(() => {
    let isActive = true;

    const fetchMessages = async () => {
      console.log("Polling...");
      try {
        const notification = await getMessages(
          request,
          idInstance,
          apiTokenInstance
        );

        if (
          notification &&
          notification.body.senderData.chatId === chatId &&
          notification.body.messageData?.typeMessage === "textMessage"
        ) {
          const text =
            notification.body.messageData.textMessageData?.textMessage;

          if (text) {
            const newMessage: IMessage = {
              id: notification.body.idMessage,
              content: text,
              sender: "other",
              timestamp: notification.body.timestamp * 1000,
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
        if (notification) {
          await deleteNotification(
            request,
            idInstance,
            apiTokenInstance,
            notification.receiptId
          );
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const pollMessages = async () => {
      while (isActive) {
        await fetchMessages();
      }
    };

    void pollMessages();

    return () => {
      isActive = false;
    };
  }, [request, idInstance, apiTokenInstance, chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return ( 
    <div className="flex justify-center lg:justify-start items-start lg:items-center mt-5 lg:mt-0 h-5/6 w-full sm:w-3/4 lg:w-1/2">
      <div id="chat-content" className="h-full w-full max-md:mx-auto bg-regal-blue backdrop-blur-md border border-white/10 sm:rounded-xl p-8">
        <div className="flex flex-col divide-y divide-white/10 h-full">
          <div className="flex p-2">
            <div className="font-medium text-lg">{`Chat Id: ${chatId}`}</div>
          </div>

          <div className="flex-1 min-h-0 bg-transparent p-5 space-y-3 shadow-inner overflow-y-auto scrollbar-thumb-sky-700 scrollbar-track-black scrollbar-none">
            {messages.length ? messages.map((message) => {
              const isMe = message.sender === 'me';
              return (
                <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`} key={message.id}>
                  <div className={isMe ? `bg-linear-to-r from-green-900 to-green-600 px-3 py-2 text-emerald-100 rounded-2xl rounded-br-none shadow-black/20 shadow-md max-w-[70%] break-all` : `bg-linear-to-r from-slate-800 to-slate-700 text-slate-100 px-3 py-2 rounded-2xl rounded-bl-none shadow-black/20 shadow-md max-w-[70%] break-all`}>
                    {message.content}
                  </div>
                </div>
              )
            }) : <p className="text-white/60 text-center">No messages yet</p>}
            <div ref={bottomRef} />
          </div>

          <div className="py-5">
            <form className="flex w-full" onSubmit={(event) => { event.preventDefault(); handleSendMessage(content); }} > 
              <input 
                className="w-full outline-none border border-white/10 px-3 py-1.5 rounded-l-md" 
                placeholder="Type message here..." 
                value={content} 
                onChange={(event) => setContent(event.target.value)} />

              <button
                type="submit"
                className="bg-[#333333] px-2.5 rounded-r-md cursor-pointer hover:bg-[#444444] transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Chat;