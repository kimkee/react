const ui = {
    init: function(){
      this.dpmode.init();
      console.log("ui.init");
    },
    e:1,
    aaa:function(){
        console.log("dsfafsafdsffsafasfdfas");
    },
    iosx:{ // 아이폰X 여백값
        top: ()=>    parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-top").replace(/[^0-9]/g, "")) || 0 ,
        bottom: ()=> parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-bottom").replace(/[^0-9]/g, "")) || 0
    },
    viewport: {
        height: () => parseInt(window.visualViewport ? visualViewport.height : window.innerHeight),
        width: () => parseInt(window.visualViewport ? visualViewport.width : window.innerWidth),
        docHeight: () => parseInt(document.documentElement.scrollHeight || document.body.clientHeight),
        scrollTop: () => parseInt(document.documentElement.scrollTop)
    },
    dateForm: (date, opt)=> {
        opt = opt === undefined ? opt = 'medium' : null;
        return new Intl.DateTimeFormat('ko-KR', { dateStyle: opt, timeStyle: opt }).format(date);
    },
    getSafe:{
        top: ()=> parseInt( getComputedStyle(document.documentElement).getPropertyValue("--safe-top")  ) || 0 ,
        bottom: ()=> parseInt( getComputedStyle(document.documentElement).getPropertyValue("--safe-bottom")  ) || 0,
        watch: ()=> parseInt( getComputedStyle(document.documentElement).getPropertyValue("--safe-watch")  ) || 0
    },
    dpmode:{
        init: function(){
            setInterval( this.set , 500);
        },
        set: function(){
            // console.log("dpmode");
            const isPwaFull = window.matchMedia('(display-mode: fullscreen)').matches;
            const isPwaStad = window.matchMedia('(display-mode: standalone)').matches;
            // console.log(`isPwaFull ${isPwaFull}`);
            isPwaFull 
                ? document.documentElement.classList.add("is-pwa-fullscreen")
                : document.documentElement.classList.remove("is-pwa-fullscreen");
            isPwaFull 
                ? document.documentElement.style.setProperty("--safe-watch","24px")
                : document.documentElement.style.setProperty("--safe-watch","0px");
            
            isPwaStad
                ? document.documentElement.classList.add("is-pwa-standalone")
                : document.documentElement.classList.remove("is-pwa-standalone");
            
        }
    }, 
    scrollTo: (selector, position, duration, callback) => {
        // ui.scrollTo(boxElement, 100, 200, () => {
        //     console.log(".box 도착");
        // });
        const element = document.querySelector(selector);
        if (!element) return;
        console.log(element);
        const startingYOffset = element.scrollTop || document.documentElement.scrollTop;
        const targetYOffset = position;
        const startTime = performance.now();

        const animateScroll = (timestamp) => {
            const currentTime = timestamp - startTime;
            const progress = Math.min(currentTime / duration, 1);
            const easeInOutCubic = progress < 0.5 ? 4 * progress * progress * progress : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
            const yOffset = startingYOffset + (targetYOffset - startingYOffset) * easeInOutCubic;

            if (element === document.body) {
                window.scrollTo(0, yOffset);
            }else{
                element.scrollTop = yOffset;
            }

            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }else{
                if (typeof callback === 'function') {
                    callback();
                }
            }
        };

        requestAnimationFrame(animateScroll);
    },
    popup:{
        evt:function(){
            
        },
        resize:function(){
            
            let $pop =  document.querySelector(".pop-layer");
            let pctnH =  $pop.offsetHeight || 0;
            let pbtnH =  $pop.querySelector(".pbt")?.offsetHeight || 0 ;
            let phtnH =  $pop.querySelector(".phd")?.offsetHeight || 0 ;
            pctnH = (pctnH - phtnH) || 0 ;
            console.log(pctnH  );
            $pop.querySelector(".pct").style.maxHeight = pctnH - pbtnH+"px" ; 
        
        }
    },
    // elip:{ // 5줄이상 내용더보기 
	// 	init:function(){
	// 		this.evt();
	// 		this.set();
	// 	},
	// 	evt:function(){
	// 		$(document).on("click", "[data-ui='elips'] .btn-tog", function() {
	// 			if ($(this).closest("[data-ui='elips']").hasClass("open")) {
	// 				$(this).closest("[data-ui='elips']").removeClass("open");
	// 				$(this).text("내용더보기");
	// 			} else {
	// 				$(this).closest("[data-ui='elips']").addClass("open");
	// 				$(this).text("내용닫기");
	// 			}
	// 		});
	// 	},
	// 	set:function(){
	// 		$("[data-ui='elips']").each(function(){
	// 			var txtH = $(this).find(".txt");
				
	// 			if(txtH.height()>105){
	// 				txtH.closest("[data-ui='elips']").addClass("elips");
	// 			}else{
	// 				txtH.closest("[data-ui='elips']").removeClass("elips");
	// 			}
	// 		});
	// 	}
	// },
    alert: function (msg, params) { // 커스텀 알럿

        let opt = Object.assign({
            msg: msg,
            tit: "",
            cls: "",
            ycb: "",
            ybt: "확인"
        }, params);

        if (document.querySelectorAll(".ui-alert").length) return;

        ui.lock.using(true);
        // console.log(opt.tit);

        var lyAlert =
            `<article class="ui-alert ${opt.cls}" tabindex="0">
            <div class="pbd">
                <div class="phd"><span class="ptit">${opt.tit}</span></div>
                <div class="pct"><div class="msg">${opt.msg}</div></div>
                <div class="pbt">
                    <button type="button" class="btn btn-confirm">${opt.ybt}</button>
                </div>
                <!-- <button type="button" class="btn-close"><i class="fa-regular fa-xmark"></i></button> -->
            </div>
        </article>`;
        const body = document.querySelector("body");
        body.insertAdjacentHTML("beforeend", lyAlert);

        const uiAlert = document.querySelector(".ui-alert");
        body.classList.add("is-alert");
        setTimeout(() => uiAlert.classList.add("open"));
        opt.tit && uiAlert.querySelector(".pbd>.phd").classList.add("is-tit");

        uiAlert.focus();
        uiAlert.querySelector(".btn-confirm").addEventListener("click", () => window.setTimeout(opt.ycb));

        uiAlert.querySelectorAll(".btn-confirm, .btn-close").forEach((btn) => { btn.addEventListener("click", alertClose); })
        // $(".ui-alert").find(".btn-close , .btn-confirm").on("click",alertClose);

        function alertClose() {
            uiAlert.remove();
            body.classList.remove("is-alert");
            if (document.querySelectorAll(".pop-layer").length < 1) {
                ui.lock.using(false);
            }
        }
    },
    confirm: function (msg, params) { // 커스텀 컨펌

        let opt = Object.assign({
            msg: msg,
            tit: "",
            cls: "",
            ycb: "",
            ybt: "확인",
            ncb: "",
            nbt: "취소"
        }, params);

        if (document.querySelectorAll(".ui-confrim").length) return;

        ui.lock.using(true);

        let lyConfirm =
        `<article class="ui-confrim ${opt.cls}" tabindex="0">
            <div class="pbd">
                <div class="phd"><span class="ptit">${opt.tit}</span></div>
                <div class="pct"><div class="msg">${opt.msg}</div></div>
                <div class="pbt">
                    <button type="button" class="btn btn-cancel">${opt.nbt}</button>
                    <button type="button" class="btn btn-confirm">${opt.ybt}</button>
                </div>
                <!-- <button type="button" class="btn-close"><i class="fa-regular fa-xmark"></i></button> -->
            </div>
        </article>`;
        const body = document.querySelector("body");
        body.insertAdjacentHTML("beforeend", lyConfirm);

        const uiConfirm = document.querySelector(".ui-confrim");
        body.classList.add("is-confrim");
        setTimeout(() => uiConfirm.classList.add("open"));
        opt.tit && uiConfirm.querySelector(".pbd>.phd").classList.add("is-tit");
        uiConfirm.focus();
        uiConfirm.querySelector(".btn-confirm").addEventListener("click", () => window.setTimeout(opt.ycb));
        uiConfirm.querySelector(".btn-cancel").addEventListener("click", () => window.setTimeout(opt.ncb));

        uiConfirm.querySelectorAll(".btn-confirm, .btn-close , .btn-cancel").forEach((btn) => { btn.addEventListener("click", confirmClose); })

        function confirmClose() {
            uiConfirm.remove();
            body.classList.remove("is-confrim");
            if (document.querySelectorAll(".pop-layer").length < 1) {
                ui.lock.using(false);
            }
        }
    },
    loading: { // 로딩중..
        show: function () {
            if (!document.querySelectorAll("body>.ui-loading-dot").length) {
                // var els = '<div class="ui-loading"><em></em></div>';
                var els =
                    `<div class="ui-loading-dot">
                    <div class="bx"><em><i></i></em></div>
                </div>`;
                document.querySelector("body").insertAdjacentHTML("afterbegin", els);
                document.querySelector("body").classList.add("is-loading");
            }
        },
        hide: function () {
            document.querySelectorAll(".ui-loading-dot").forEach(el => el.remove());
            document.querySelector("body").classList.remove("is-loading");
        }
    },
    lock: { // 스크롤 막기,풀기
        sct: 0,
        stat: false,
        els: ".pop-layer  , .ui-confrim , .ui-alert",
        set: function () {
            if (document.querySelectorAll(this.els).length <= 0) {
                this.using(false);
            }
        },
        using: function (opt) {
            const body = document.querySelectorAll("body , html");
            const html = document.querySelector("html");
            if (opt === true && this.stat === false) {
                ui.lock.stat = true;
                ui.lock.sct = window.scrollY;
                body.forEach(body => body.classList.add("is-lock", "is-lock-end"));
                html.style.top = -ui.lock.sct + "px";
                // $(this.els).bind("touchmove scroll", function(e){ e.preventDefault(); });
            }
            if (opt === false && document.querySelectorAll(this.els).length <= 0 && html.classList.contains("is-lock")) {
                ui.lock.stat = false;
                body.forEach(body => body.classList.remove("is-lock"));
                html.style.top = "";
                window.scrollTo(0, ui.lock.sct)
                // $(this.els).unbind("touchmove scroll");
                setTimeout(() => {
                    body.forEach(body => body.classList.remove("is-lock-end"));
                }, 50);
            }
        }
    },
};
window.ui = ui;
export default ui