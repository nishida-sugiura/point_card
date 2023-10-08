$(document).ready(function() {
	var liffId = '1657198553-M8zND8nk';
	// LIFF 初期化
	liff.init(
		{
			liffId: liffId,
		},
		function(data) {
			console.log('liff.init 完了');
			// プロフィール情報取得
			liff.getProfile()
				.then(function(userData) {
					console.log(`liff.getProfile 完了 userId: ${userData.userId}, displayName: ${userData.displayName}`);
					userId = userData.userId;
					$('#name').text(userData.displayName + ' 様');
					$('#point').text('100 ポイント');
				})
				.catch(function(err) {
					console.log(`liff.getProfile 失敗 code: ${err.code}, detail: ${err.message}`);
				});
		},
		function(err) {
			console.log(`liff.init 失敗 ${err}`);
		}
	);
	// step4 でQR コード読み取り機能を入れる場所
});