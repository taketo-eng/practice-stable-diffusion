# stable-diffusion-generator-app
stable diffusionに触れてみようと思い、簡単なアプリを制作しました。  
### 使用言語  
TypeScript, Python  
### フレームワーク  
Frontend: Next.js  
Backend: FastAPI  
  
### 概要  
フロントから送信されたプロンプトテキストを受け取ると、  
6枚の画像を生成し、base64に変換してからフロントにレスポンスする。  
レスポンスを受け取ったフロントはダウンロードボタンと一緒に画像一覧を表示。  
  
![Stable Diffusion Practice App - Google Chrome 2023_06_28 20_58_29 (2)](https://github.com/taketo-eng/stable-diffusion-generator-app/assets/61618401/201b2a06-c8e1-4c95-85de-27ddcc53aac1)

