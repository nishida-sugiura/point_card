// LIFFの初期化とオープン
async function initializeLiff() {
    await liff.init({ liffId: '2001059289-X2m74PYZ' }); // LIFF IDを設定

    if (liff.isInClient()) {
        // LINEアプリ内の場合
        initializeApp();
    } else {
        alert('このアプリはLINE内でのみ動作します。');
    }
}


async function initializeApp() {
  document.getElementById('scanQRButton').addEventListener('click', scanQRCode);
    await liff.getProfile();
}

// QRコードスキャン
async function scanQRCode() {
    try {
        const result = await liff.scanCode();
        const qrCodeData = result.value;

        // スプレッドシートにデータを記録
        await recordDataToSpreadsheet(qrCodeData);

        alert('QRコードの内容をスプレッドシートに記録しました。');
    } catch (error) {
        alert('QRコードを読み取れませんでした。');
    }
}

// スプレッドシートへのデータ記録（Google Apps Scriptを使用）
async function recordDataToSpreadsheet(data) {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxX_Ob0_n3H2vf5qEtrmmKmYOnZQ1VrhLV3TM4_m8pHsKgIvZO2LRHEHmK3TIWvUxLqiQ/exec'; // Google Apps ScriptのURLを設定
    const response = await fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify({ data: data }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        const result = await response.json();
        console.log('スプレッドシートにデータが記録されました。', result);
    } else {
        console.error('スプレッドシートへのデータ記録に失敗しました。', response.statusText);
    }
}

// LIFFの初期化後にアプリを起動
initializeLiff();






