import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  ""; // 讓你可以用 proxy 時走相對路徑

export const http = axios.create({
  baseURL,
  withCredentials: true, // 如果你未來用 Cookie/Auth 會需要；用 JWT 也不會壞
  timeout: 15000,
});

// 統一錯誤處理（先留最小版，之後我們會加 toast / 轉換訊息）
http.interceptors.response.use(
  (res) => res,
  (err) => {
    // 這裡先丟回去給呼叫端處理
    return Promise.reject(err);
  }
);
