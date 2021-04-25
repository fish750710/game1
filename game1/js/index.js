
var hg = null;
$(function() {
    $(".badge").on("click", function(){
        var top = $("#gameStage").offset().top;        
        if (Com.browserRedirect()) {            
            window.scrollTo(0, top-50);
        }else{            
            window.scrollTo(0, top-150);
        }
    })
    if(!hg){
        createHg(false)
    }

    $("#setBtn").on('click',function () {                                 
        $(".popMsg, .popBg2").hide();        
        if(hg.level<4){
            $("#gameSuccessBox, #gameOverBox, .gameBtnBox").hide()       
            hg.gameContinue(true); 
        }else{
            $(".gameBtnBox").css("display","flex"); 
        }        
    })
});
function createHg(GAMEMODE){
    //初始化游戏, 两个参数分别表示"游戏所处的canvas画布元素"和"关卡设置, 可以省略(省略后将使用默认设置)"
    hg = new HardestGame(document.getElementById("gameStage"),GAMEMODE);
    $("#gameRestBtn").on("click",function(){         
        hg=null;
        if(hg){delete hg;}
        window.history.go(0);
    })
    //游戏成功过关    
    hg.levelSuccessHandle = function (){
        $("#gameSuccessBox").show();
            $(".time-left").attr("src","<!--#echo var='8BX_CSS_HOST'-->/lp/lp_v300dfn/num/0.png")
            $(".time-right").attr("src","<!--#echo var='8BX_CSS_HOST'-->/lp/lp_v300dfn/num/0.png")
            setTimeout(( () => $(".popMsg, .popBg2").show() ), 2500); 
        if(hg.level<4){            
            // 前兩關過關            
            // $(".gameNextBtn").off("click");
            // $(".gameNextBtn").on("click",function(){   
            //     $("#gameSuccessBox, #gameOverBox, .gameBtnBox").hide()  
            //         hg.gameContinue(true);  
            //     // setTimeout(()=>{
            //     //     console.log("333333")
            //     //     // $("#gameSuccessBox, #gameOverBox, .gameBtnBox").hide()  
            //     //     // hg.gameContinue(true);   
            //     // },3000)              
            // }) 
            if(hg.level == 2){
                // initHd(103,1)             
            }else if(hg.level == 3){
                $(".msgCommodity").text("牛奶糖");
                $(".msgDiscount").text("20");                
                // initHd(103,2)
            }
            $(".msgClose").on("click",function(){          
                $(".popMsg, .popBg2").hide();
                $(".gameBtnBox").css("display","flex");
            }) 
            $(".gameAgain").off("click");
            $(".gameAgain").on("click", function(){              
                $("#gameSuccessBox, #gameOverBox, .gameBtnBox").hide()   
                hg.gameAgain(hg.level);
            })        
        }else{
            // 過三關
            $(".popMsg>.title").text("恭喜过关")
            $(".msgCommodity").text("巧克力");
            $(".msgDiscount").text("30"); 
            $(".msgBtn").text("立即报名");
            // initHd(103,3)            
            $("#gameSuccessBox, .info3, #gameOverBoxBtn, #gameRestBtn").show();
            $(".gameNextBtn, .gameAgain").hide(); 
        }
    }
    //游戏失败结束
    hg.gameOverHandle = function (){
        clearInterval(timeboxInterval);        
        $("#gameOverBox").show();
        $("#app").addClass("blur"); 
        $(".gameBtnBox").css("display","flex");       
        $("#gameOverBoxBtn").on("click",function(){            
            hg=null;
            if(hg){delete hg;}
            window.history.go(0);
             
        })  
        $(".gameAgain").off("click");
        $(".gameAgain").on("click", function(){              
            $("#gameSuccessBox, #gameOverBox, .gameBtnBox").hide();
            hg.gameReset(hg.level);
        })   
    }
      
    $(document).on("click",".gameStart", function(){
        $(".gameStart, .popBg").hide();
        $("#panel, .aim, #timebox").show();
        hg.gameStart();
    })
    //初始化游戏
    hg.init();    
    return true;
}
