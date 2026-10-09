const API_URL = "https://4100.api.green-api.com";

interface SendMessageResponse {
  idMessage: string;
}

type HttpRequest = (
  url: string,
  method?: string,
  body?: string | null,
  headers?: Record<string, string>
) => Promise<SendMessageResponse>;

export const sendMessage = (
  request: HttpRequest,
  idInstance: string,
  apiTokenInstance: string,
  chatId: string,
  message: string
) => {
  const url = `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

  return request(
    url,
    "POST",
    JSON.stringify({ chatId, message })
  );
};