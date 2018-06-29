/**
 * create by Lin_HR
 * @augments {[object]}
 * Necessary:
 * 	render: the moving content
 * Other:
 * 	pointer: the indicators content
 * 	speed: the moving speed
 * 	interval: the carousel's interval
 * 	left_btn: the carousel's left btn
 * 	right_btn: the carousel's right right_btn
 */

(function($){			
	$.fn.carousel = function(config){
		// var $moveBox = $("#carousel .in");
		var $moveBox = config.render;
		if(!$moveBox.length){ return };
		// var countImg = $("#carousel li img").length-1;
		var countImg = $moveBox.children().length-1;
		
		// console.log($(this));
		var boxWidth = parseInt($(this).width()), nowImg = 1;
		var maxLeft = -boxWidth*countImg;

		var $indicator = config.pointer || null;
		var indicaHtml = "";
		for(var i=0;i<countImg;i++){
			if(i == 0){
				indicaHtml += "<span class='jquery-carousel-indicators active'></span>";
			}else{
				indicaHtml += "<span class='jquery-carousel-indicators'></span>";
			}
		}
		if(!$indicator){
			$(this).append("<p class='jquery-carousel-indicators-outer'>"+indicaHtml+"</p>");
		}else{
			$indicator.html(indicaHtml);
		}

		var $indicators = $(".jquery-carousel-indicators");
		var moving = false;
		var timer = null;
		var speed = config.speed || null;
		var interval = config.interval || 2000;
		
		// console.log($moveBox.children());

		function move(jump){
			if(moving){
				return;
			}
			jump = jump || -1;
			nowImg += -jump;
			var nowLeft = parseInt($moveBox.css("left"));
			var tarLeft = nowLeft+jump*boxWidth;

			if(tarLeft > 0){
				$moveBox.css("left",maxLeft+"px");
				tarLeft = -boxWidth*(countImg-1);
				nowImg = countImg;
			}else if(tarLeft == maxLeft){
				nowImg = 1;
			}

			moving = true;
			$moveBox.stop(true).animate({"left":tarLeft+"px"},speed,function(){
				var nowLeft = parseInt($moveBox.css("left"));
				if(nowLeft == maxLeft){
					$moveBox.css("left","0px");
					// nowImg = 1;
				}
				moving = false;
			});

			$($indicators[nowImg-1]).addClass("active").siblings().removeClass("active");
		}

		var $leftBtn = config.left_btn || null;
		var $rightBtn = config.right_btn || null;

		if($leftBtn){
			$leftBtn.click(function(){
				move(1);
			});	
		}

		if($rightBtn){
			$rightBtn.click(function(){
				move();
			});
		}

		$indicators.click(function(){
			var tarImg = $(this).index()+1;
			if(tarImg != nowImg){
				move(-(tarImg-nowImg));
			}
		});

		timer = setInterval(function(){
			move();
		},interval);

		$(this).hover(function(){
			clearInterval(timer);
			timer = null;
		},function(){
			timer = setInterval(function(){
				move();
			},interval);
		})
	}
})(window.jQuery)