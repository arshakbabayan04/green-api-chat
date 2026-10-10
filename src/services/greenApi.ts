const API_URL = "https://4100.api.green-api.com";

interface SendMessageResponse {
  idMessage: string;
}

interface Notification {
  receiptId: number;
  body: {
    idMessage: string;
    typeWebhook: string;
    senderData: {
      chatId: string;
    };
    messageData?: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
    };
    timestamp: number;
  };
}

interface DeleteNotificationResponse {
  result: boolean;
  reason: string;
}

type HttpRequest = <T = unknown>(
  url: string,
  method?: string,
  body?: string | null,
  headers?: Record<string, string>
) => Promise<T>;

export const sendMessage = (
  request: HttpRequest,
  idInstance: string,
  apiTokenInstance: string,
  chatId: string,
  message: string
) => {
  const url = `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

  return request<SendMessageResponse>(
    url,
    "POST",
    JSON.stringify({ chatId, message })
  );
};

export const getMessages = (
  request: HttpRequest, 
  idInstance: string, 
  apiTokenInstance: string, 
  receiveTimeout = 5
) => {
  const url = `${API_URL}/waInstance${idInstance}` +
    `/receiveNotification/${apiTokenInstance}` +
    `?receiveTimeout=${receiveTimeout}`;

  return request<Notification | null>(url);
}

export const deleteNotification = (
  request: HttpRequest,
  idInstance: string,
  apiTokenInstance: string,
  receiptId: number
) => {
  const url = `${API_URL}/waInstance${idInstance}` +
    `/deleteNotification/${apiTokenInstance}/${receiptId}`;
  
  return request<DeleteNotificationResponse>(url, "DELETE");
}