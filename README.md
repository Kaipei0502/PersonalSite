# PersonalSite（個人網站）

[English](#english) | [繁體中文](#繁體中文)

---

<a name="lang-en"></a>

## English

A full-stack personal portfolio website built with **React, TypeScript, and ASP.NET Core**. It presents personal information, professional experience, technical skills, and project work through a responsive frontend, while a RESTful Web API retrieves portfolio data from SQL Server.

### System Architecture

```text
React Frontend (Vite)
  ├── React Router page navigation
  ├── Axios API client
  ├── Pages and reusable UI components
  └── Vite /api development proxy
              ↕ HTTP / JSON
ASP.NET Core 8 Web API
  ├── Controllers (API endpoints)
  ├── Services (business logic)
  ├── DAC + Dapper (data access)
  ├── Autofac (dependency injection)
  ├── NLog (application logging)
  └── SQL Server (data)
```

### Features

* Personal profile
* Professional experience and achievement highlights
* Skills grouped by category
* Project portfolio and featured projects
* Responsive multi-page interface
* RESTful API with Swagger documentation
* Layered backend architecture
* Structured application logging with NLog

### Tech Stack

| Area     | Technologies                                                      |
| -------- | ----------------------------------------------------------------- |
| Frontend | React 19, TypeScript, Vite 7, React Router, Axios, Tailwind CSS 4 |
| Backend  | ASP.NET Core 8 Web API, Dapper, Autofac                           |
| Database | Microsoft SQL Server                                              |
| Tooling  | Swagger / OpenAPI, NLog, ESLint                                   |

### Quick Start

#### Prerequisites

* [Node.js](https://nodejs.org/) and npm
* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* SQL Server or SQL Server Express

#### 1. Clone the Repository

```bash
git clone https://github.com/Kaipei0502/PersonalSite.git
cd PersonalSite
```

#### 2. Configure the Database Connection

Use .NET User Secrets to keep the development connection string out of source control:

```powershell
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost\SQLEXPRESS;Database=PERSONAL_SITE;User Id=sa;Password=<YOUR_PASSWORD>;TrustServerCertificate=True;Encrypt=False;" --project .\PersonalSite\PersonalSite.csproj
```

Update `Server`, `Database`, `User Id`, and `Password` for your local environment.

The backend currently reads data from the following tables:

```text
PROFILE
EXPERIENCE
EXPERIENCE_HIGHLIGHT
EXPERIENCE_SKILL
SKILL_CATEGORY
SKILL
PROJECT
PROJECT_TECHNOLOGY
```

#### 3. Run the Backend

```powershell
dotnet run --project .\PersonalSite\PersonalSite.csproj --launch-profile http
```

* API: `http://localhost:5250`
* Swagger: `http://localhost:5250/swagger`

#### 4. Run the Frontend

Open another terminal:

```powershell
cd .\Frontend
npm install
npm run start
```

Open `http://localhost:5173` in your browser.

During development, Vite proxies `/api` requests to `http://localhost:5250`.

### Environment Variables

#### Frontend

Create `Frontend/.env` from the included example file:

```powershell
Copy-Item .\Frontend\.env.example .\Frontend\.env
```

| Variable            | Description                              | Required |
| ------------------- | ---------------------------------------- | -------- |
| `VITE_API_BASE_URL` | Backend API base URL; defaults to `/api` | No       |

#### Backend

| Configuration                         | Description                  | Required |
| ------------------------------------- | ---------------------------- | -------- |
| `ConnectionStrings:DefaultConnection` | SQL Server connection string | Yes      |

### API Endpoints

| Method | Endpoint                 | Description                             |
| ------ | ------------------------ | --------------------------------------- |
| `GET`  | `/api/Profile`           | Get the profile, experience, and skills |
| `GET`  | `/api/Projects`          | Get all projects                        |
| `GET`  | `/api/Projects/featured` | Get featured projects                   |

### Build and Validation

```powershell
# Frontend
cd .\Frontend
npm run lint
npm run build

# Backend (run from the repository root)
cd ..
dotnet build .\PersonalSite\PersonalSite.csproj
```

---

<a name="lang-zh-tw"></a>

## 繁體中文

這是一個以 **React、TypeScript 與 ASP.NET Core** 建置的全端個人作品集網站。網站透過響應式介面展示個人簡介、工作經歷、技術能力與專案作品，並由 RESTful Web API 從 SQL Server 讀取作品集資料。

### 系統架構

```text
React 前端（Vite）
  ├── React Router 頁面路由
  ├── Axios API 請求
  ├── 頁面與共用 UI 元件
  └── Vite /api 開發環境代理
              ↕ HTTP / JSON
ASP.NET Core 8 Web API
  ├── Controllers（API 端點）
  ├── Services（商業邏輯）
  ├── DAC + Dapper（資料存取）
  ├── Autofac（依賴注入）
  ├── NLog（應用程式日誌）
  └── SQL Server（資料）
```

### 功能特色

* 個人簡介
* 工作經歷與成果重點展示
* 依類別呈現技術能力
* 專案列表與精選專案
* 響應式多頁面介面
* RESTful API 與 Swagger 文件
* 分層式後端架構
* 使用 NLog 記錄應用程式日誌

### 使用技術

| 類別   | 技術                                                           |
| ---- | ------------------------------------------------------------ |
| 前端   | React 19、TypeScript、Vite 7、React Router、Axios、Tailwind CSS 4 |
| 後端   | ASP.NET Core 8 Web API、Dapper、Autofac                        |
| 資料庫  | Microsoft SQL Server                                         |
| 開發工具 | Swagger / OpenAPI、NLog、ESLint                                |

### 快速開始

#### 前置需求

* [Node.js](https://nodejs.org/) 與 npm
* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* SQL Server 或 SQL Server Express

#### 1. 下載專案

```bash
git clone https://github.com/Kaipei0502/PersonalSite.git
cd PersonalSite
```

#### 2. 設定資料庫連線

建議使用 .NET User Secrets 保存開發環境的連線字串，避免將密碼提交至 Git：

```powershell
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost\SQLEXPRESS;Database=PERSONAL_SITE;User Id=sa;Password=<YOUR_PASSWORD>;TrustServerCertificate=True;Encrypt=False;" --project .\PersonalSite\PersonalSite.csproj
```

請依照本機環境修改 `Server`、`Database`、`User Id` 與 `Password`。

後端目前會讀取以下資料表：

```text
PROFILE
EXPERIENCE
EXPERIENCE_HIGHLIGHT
EXPERIENCE_SKILL
SKILL_CATEGORY
SKILL
PROJECT
PROJECT_TECHNOLOGY
```

#### 3. 啟動後端

```powershell
dotnet run --project .\PersonalSite\PersonalSite.csproj --launch-profile http
```

* API：`http://localhost:5250`
* Swagger：`http://localhost:5250/swagger`

#### 4. 啟動前端

開啟另一個終端機：

```powershell
cd .\Frontend
npm install
npm run start
```

在瀏覽器開啟 `http://localhost:5173`。

開發期間，Vite 會將 `/api` 請求代理至 `http://localhost:5250`。

### 環境變數設定

#### 前端

從專案提供的範例建立 `Frontend/.env`：

```powershell
Copy-Item .\Frontend\.env.example .\Frontend\.env
```

| 變數名稱                | 說明                     | 必填 |
| ------------------- | ---------------------- | -- |
| `VITE_API_BASE_URL` | 後端 API 基礎路徑，預設為 `/api` | 否  |

#### 後端

| 設定名稱                                  | 說明                 | 必填 |
| ------------------------------------- | ------------------ | -- |
| `ConnectionStrings:DefaultConnection` | SQL Server 資料庫連線字串 | 是  |

### API 端點

| 方法    | 路徑                       | 說明             |
| ----- | ------------------------ | -------------- |
| `GET` | `/api/Profile`           | 取得個人簡介、工作經歷與技能 |
| `GET` | `/api/Projects`          | 取得所有專案         |
| `GET` | `/api/Projects/featured` | 取得精選專案         |

### 檢查與建置

```powershell
# 前端
cd .\Frontend
npm run lint
npm run build

# 後端（從 repository 根目錄執行）
cd ..
dotnet build .\PersonalSite\PersonalSite.csproj
```
