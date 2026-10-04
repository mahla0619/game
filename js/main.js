
const chars = [
        {
          pic: "player12.gif",
          voice: "zoo1.mp3",
          speed: 3.5,
          lock: 0,
          unlockScore: 9,
        },
        {
          pic: "player3.gif",
          voice: "zoo6.mp3",
          speed: 2.5,
          lock: 1,
          unlockScore: 1,
        },
        {
          pic: "player4.gif",
          voice: "zoo2.mp3",
          speed: 2.5,
          lock: 1,
          unlockScore: 5,
        },
        {
          pic: "player6.gif",
          voice: "zoo3.mp3",
          speed: 1.5,
          lock: 0,
          unlockScore: 0,
        },
        {
          pic: "player8.gif",
          voice: "zoo4.mp3",
          speed: 2,
          lock: 1,
          unlockScore: 8,
        },
        {
          pic: "player9.gif",
          voice: "zoo5.mp3",
          speed: 2,
          lock: 0,
          unlockScore: 0,
        },
        {
          pic: "player10.gif",
          voice: "zoo6.mp3",
          speed: 1,
          lock: 1,
          unlockScore: 2,
        },
        {
          pic: "player11.gif",
          voice: "zoo5.mp3",
          speed: 2,
          lock: 0,
          unlockScore: 0,
        },
      ];



      var cp = 0;
      var charLen = chars.length;

      function lockPlayer() {
        let isLock = chars[cp].lock;

        if (isLock ==1 ) {
            char.className = "lock"
            nextBtn.className = "hide"

        }

        else{
            char.className = ""
            nextBtn.className = ""
        }

      }

      right.addEventListener ("click", () => {
        cp = (cp +1) % charLen ;
        char.style.backgroundImage = "url(gif/" + chars[cp].pic + ")";

        lockPlayer();
      })

        left.addEventListener ("click", () => {
        cp = (cp - 1) % charLen ;

        cp = cp > 0 ? cp : cp + charLen;

        char.style.backgroundImage = "url(gif/" + chars[cp].pic + ")";

        lockPlayer();
      })

      char.addEventListener("click", () => {
        auStart.volume = 0.2;
        let charVoice = new Audio(`audio/${chars[cp].voice}`);
        charVoice.play();
        setTimeout(() => {
          auStart.volume = 1;
        }, 1500);
      });


      auStart.play();

      nextBtn.onclick = function () {
        gameMenu.className = "hide";
        selectLevel.className = "show";

        selplayer.style.backgroundImage = "url(gif/" + chars[cp].pic + ")";
        player.style.backgroundImage = "url(gif/" + chars[cp].pic + ")";

      };
      homeBtn.onclick = function () {
        gameMenu.className = "show";
        selectLevel.className = "hide";
      };

      function loadLevel(params) {

        auStart.pause();
        auMarsh.play();
        auLevel.play();

        if (params == 1) {
          levelone.className = "show";
          selectLevel.className = "hide";
          console.log(params);
        } else if (params == 2) {
          levelTow.className = "show";
          selectLevel.className = "hide";
        }
      }

      auStart.play();

      let canFly = true;
      let mouseY = 0;

      player.onclick = function () {

        if (!canFly) {
          return;
        }

        this.style.left = "200px";
        this.style.bottom = "170px";

        let charVoice = new Audio(`audio/${chars[cp].voice}`);
        charVoice.play();

        mouseBox.style.display = "block";
      };

      mouseBox.onmousemove = function (event) {
        auSling.play();

        mouseY = event.pageY;

        player.style.bottom = event.pageY / 2 + "px";
        player.style.left = "120px";

        mouseBox.innerHTML = event.pageY;
      };

          mouseBox.onclick = function () {

        // اگر پرنده قبلاً پرتاب شده باشد، دوباره اجازه پرتاب نمی‌دهیم
        if (!canFly) {
          return;
        }

        // بعد از پرتاب، تا زمانی که پرنده برنگشته اجازه پرتاب دوباره نداریم
        canFly = false;

        // صدای پرتاب
        auFly.play();

        console.log("0");

        // حالت اول: پرنده خیلی بالا پرتاب شده
        if (mouseY < 280) {

          player.className = "fly1";

          console.log("01");

          // بعد از پرتاب، پرنده به جای اولیه برمی‌گردد
          setTimeout(() => {

            player.style.left = "120px";
            player.style.bottom = "170px";
            player.className = "";

            // محل کشیدن پرنده دوباره مخفی می‌شود
            mouseBox.style.display = "none";

          }, 1500);

          // بعد از چند ثانیه دوباره اجازه پرتاب می‌دهیم
          setTimeout(() => {

            canFly = true;

          }, 3500);


        // حالت دوم: پرنده به سمت پایین پرتاب شده
        } else if (mouseY > 340) {

          console.log("02");

          player.className = "fly2";

          // نابود شدن دشمن
          function destroyOne() {

            enemyBox.className = "destroy1";
            auIce.play();

          }

          setTimeout(destroyOne, 900);

          // بعد از پرتاب، پرنده به جای اولیه برمی‌گردد
          setTimeout(() => {

            player.style.left = "120px";
            player.style.bottom = "170px";
            player.className = "";

            // محل کشیدن پرنده دوباره مخفی می‌شود
            mouseBox.style.display = "none";

          }, 1500);

          // بعد از چند ثانیه دوباره اجازه پرتاب می‌دهیم
          setTimeout(() => {

            canFly = true;

          }, 3500);


        // حالت سوم: پرنده مستقیم به مانع اصلی برخورد کرده و مرحله تمام می‌شود
        } else {

          player.className = "fly3";

          // نابود شدن کامل دشمن
          function destroyOne() {

            enemyBox.className = "destroy2";
            auTnt.play();
            auIce.play();
            auBye.play();

          }

          setTimeout(destroyOne, 1000);

          // مرحله تمام می‌شود و پرنده دیگر برنمی‌گردد
          setTimeout(() => {

            // موس باکس دیگر قابل استفاده نیست
            mouseBox.style.display = "none";
            mouseBox.style.pointerEvents = "none";

            // ساخت پیام پایان مرحله
            let gameOverText = document.createElement("div");

            gameOverText.innerHTML = "این مرحله تمام شد";

            gameOverText.style.position = "fixed";
            gameOverText.style.background = "#ccc";
            gameOverText.style.left = "50%";
            gameOverText.style.top = "50%";
            gameOverText.style.transform = "translate(-50%, -50%)";
            gameOverText.style.fontSize = "40px";
            gameOverText.style.fontWeight = "bold";
            gameOverText.style.zIndex = "9999";

            document.body.appendChild(gameOverText);

          }, 1500);
        }
      };
