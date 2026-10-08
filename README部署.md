# README_部署文档

## 1. 本地启动
### STEP 1:
安装依赖：
```bash
pip install -r requirements.txt
```
### STEP 2:
配置环境变量（内容写入项目根目录的 `.env` 文件，切勿提交）：
```bash
API_KEY=your_gitee_ai_api_key_here
BASE_URL=https://ai.gitee.com/v1
```
### STEP 3:
启动系统：
```bash
python main.py
```
### STEP 4:
浏览器访问：
```bash
http://localhost:5000
```

## 2. docker打包启动
```bash
wsl --shutdown
docker rm -f csx-app

docker build -t csx-app:latest .
docker save csx-app:latest -o csx-app.tar

docker load -i csx-app.tar
docker run -d -p 5000:5000 -e NATAPP_URL=http://chushenxi.nat100.top --name csx-app-temp csx-app:latest
```

