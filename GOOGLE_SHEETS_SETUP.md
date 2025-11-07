# Google 試算表表單設置說明

## 步驟 1: 設置 Google 試算表

1. 打開您的 Google 試算表:
   https://docs.google.com/spreadsheets/d/1trxCfccRTsL5Gms0y63dJZ7bXGU8pY0_LOZmbk5BSLQ/edit

2. 確保試算表有以下欄位標題 (第一行):
   - A1: 提交時間
   - B1: 客戶名稱
   - C1: 聯絡電話
   - D1: 施工地點
   - E1: MAIL信箱
   - F1: 留言內容

## 步驟 2: 創建 Google Apps Script

1. 在試算表中,點擊 **擴充功能** > **Apps Script**

2. 刪除默認代碼,貼上以下代碼:

```javascript
function doPost(e) {
  try {
    // 獲取試算表
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 解析接收到的數據
    const data = JSON.parse(e.postData.contents);
    
    // 準備要寫入的行數據
    const rowData = [
      data.timestamp,      // 提交時間
      data.name,          // 客戶名稱
      data.phone,         // 聯絡電話
      data.address,       // 施工地點
      data.email,         // MAIL信箱
      data.message        // 留言內容
    ];
    
    // 將數據添加到試算表
    sheet.appendRow(rowData);
    
    // 返回成功響應
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 返回錯誤響應
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 測試函數 (可選)
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toLocaleString('zh-TW'),
        name: '測試客戶',
        phone: '0912-345-678',
        address: '台北市測試地址',
        email: 'test@example.com',
        message: '這是一個測試留言'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

3. 點擊 **儲存** (磁碟圖示)

4. 為專案命名,例如: "699拆除聯絡表單"

## 步驟 3: 部署為網路應用程式

1. 點擊右上角的 **部署** > **新增部署作業**

2. 在 "選取類型" 點擊齒輪圖示,選擇 **網路應用程式**

3. 設定如下:
   - **說明**: 699拆除聯絡表單 API
   - **執行身分**: 我
   - **具有存取權的使用者**: 任何人

4. 點擊 **部署**

5. 首次部署需要授權:
   - 點擊 **授權存取權**
   - 選擇您的 Google 帳號
   - 點擊 **進階** > **前往 [專案名稱] (不安全)**
   - 點擊 **允許**

6. 複製 **網路應用程式 URL** (格式類似):
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

## 步驟 4: 更新網站代碼

1. 打開 `script.js` 文件

2. 找到這一行:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```

3. 將 `YOUR_GOOGLE_SCRIPT_URL_HERE` 替換為您複製的網路應用程式 URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```

4. 儲存文件

## 步驟 5: 測試

1. 打開您的網站
2. 填寫聯絡表單
3. 點擊 "送出"
4. 檢查 Google 試算表是否收到新的一行數據

## 常見問題

### Q: 表單提交後沒有數據?
- 檢查 Google Apps Script URL 是否正確
- 檢查試算表欄位標題是否正確
- 查看瀏覽器控制台 (F12) 是否有錯誤訊息

### Q: 顯示授權錯誤?
- 重新部署 Apps Script
- 確保 "具有存取權的使用者" 設定為 "任何人"

### Q: 想要收到郵件通知?
在 Apps Script 的 `doPost` 函數中添加:

```javascript
// 在 sheet.appendRow(rowData); 之後添加
MailApp.sendEmail({
  to: 'your-email@example.com',
  subject: '699拆除 - 新的聯絡表單提交',
  body: `
    客戶名稱: ${data.name}
    聯絡電話: ${data.phone}
    施工地點: ${data.address}
    Email: ${data.email}
    留言內容: ${data.message}
    提交時間: ${data.timestamp}
  `
});
```

## 安全建議

1. 定期檢查試算表的共享設定
2. 考慮添加驗證碼 (reCAPTCHA) 防止垃圾訊息
3. 設定表單提交頻率限制

## 支援

如有問題,請聯絡技術支援或參考 Google Apps Script 官方文檔:
https://developers.google.com/apps-script
