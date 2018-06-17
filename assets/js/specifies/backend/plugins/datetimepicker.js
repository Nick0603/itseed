function setPicker(status, createdAt) {
	if(status == "new"){
		$("#datetimepicker").datetimepicker({
			lang: "zh-TW",
			format: "Y/m/d H:i",
			closeOnDateSelect: true,
			onShow: function(current_time,$input){
				$("#time-setting input[value='manual']").prop("checked", true);
			},
		});
	}
	else{	
		$("#datetimepicker").datetimepicker({
			lang: "zh-TW",
			format: "Y.m.d H:i",
			closeOnDateSelect: true,
			onShow: function(current_time,$input){
				$("#time-setting input[value='manual']").prop("checked", true);
			},
			value: createdAt,
		});
	}
}

function setEvents() {
	//設定日期及時間
	$("#dtpTrigger").click(function(){
		$("#datetimepicker").trigger("mousedown");
	})
	
	//完成		
	$("#time-setting button").click(function(){
		//選擇設定
		if($("#time-setting input:checked").val() == "manual"){
			if($("#datetimepicker").val() == ""){
				alert("請選擇日期及時間");
			}
			else{
				var timeStr = $("#datetimepicker").val();
				var timeFormat =  formatTime(new Date(timeStr).getTime());

				//顯示新的設定
				$("#time-setting>a>div").html(timeFormat);
				//折疊選單
				$("#time-setting>a").trigger("click");
				//添加新設定到表單
				$("#form-edit").append(
					"<input type='text' class='hidden' id='createdAt' name='createdAt' value='"+timeStr+"'>"
				);
			}
		}
		//選擇自動
		else{
			//顯示新的設定
			$("#time-setting>a>div").html("自動");
			//折疊選單
			$("#time-setting>a").trigger("click");
			//添加新設定到表單
			$("#form-edit").append(
				"<input type='text' class='hidden' id='createdAt' name='createdAt' value='auto'>"
			);
		}
	});
}
		
function formatTime (milliseconds) {
    var time = new Date(milliseconds);

    var year = time.getFullYear();
    var month = time.getMonth();
    var date = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();

    //補零
    if(hour%12 < 10){
        hour = "0" + hour;
    }
    if(minute < 10){
        minute = "0" + minute;
    }
        
    //標準格式化
    if(hour == 0){
        return year + "/" + (month + 1) + "/" + date + " 上午 " + "12" + ":" + minute;
    }
    else if(hour < 12){
        return year + "/" + (month + 1) + "/" + date + " 上午 " + hour + ":" + minute;
    }
    else if(hour == 12){
        return year + "/" + (month + 1) + "/" + date + " 下午 " + "12" + ":" + minute;
    }
    else{
        return year + "/" + (month + 1) + "/" + date + " 下午 " + (hour - 12) + ":" + minute;
    }    
}
