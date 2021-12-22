(function ($) {
    "use strict";

    $.fn.extend({ 

      countdown100: function(options) {
        var defaults = {
          timeZone: "",
          endtimeYear: 0,
          endtimeMonth: 0,
          endtimeDate: 0,
          endtimeHours: 0,
          endtimeMinutes: 0,
          endtimeSeconds: 0,
        }

        var options =  $.extend(defaults, options);

        return this.each(function() {
          var obj = $(this);
          var timeNow = new Date();

          var tZ = options.timeZone; console.log(tZ);
          var endYear = options.endtimeYear;
          var endMonth = options.endtimeMonth;
          var endDate = options.endtimeDate;
          var endHours = options.endtimeHours;
          var endMinutes = options.endtimeMinutes;
          var endSeconds = options.endtimeSeconds;

          if(tZ == "") {
            var deadline = new Date(endYear, endMonth - 1, endDate, endHours, endMinutes, endSeconds);
          } 
          else {
            var deadline = moment.tz([endYear, endMonth - 1, endDate, endHours, endMinutes, endSeconds], tZ).format();
          }
          
          
          initializeClock(deadline);

          function getTimeRemaining(endtime) { 
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
              'total': t,
              'days': days,
              'hours': hours,
              'minutes': minutes,
              'seconds': seconds
            };
          }

          function initializeClock(endtime) { 
            var daysSpan = $(obj).find('.days');
            var hoursSpan = $(obj).find('.hours');
            var minutesSpan = $(obj).find('.minutes');
            var secondsSpan = $(obj).find('.seconds');

            function updateClock() { 
              var t = getTimeRemaining(endtime);

              daysSpan.html(t.days);
              hoursSpan.html(('0' + t.hours).slice(-2));
              minutesSpan.html(('0' + t.minutes).slice(-2));
              secondsSpan.html(('0' + t.seconds).slice(-2))

              if (t.total <= 0) {
                clearInterval(timeinterval);

aaa();
                var counterDiv = document.querySelectorAll('.counter')[0];
                counterDiv.style.visibility = "hidden";

              }



			}
			
            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
			
			
			function aaa() {
			
					window.addEventListener("resize", resizeCanvas, false);
				//window.addEventListener("DOMContentLoaded", onLoad, false);
				
				window.requestAnimationFrame = 
					window.requestAnimationFrame       || 
					window.webkitRequestAnimationFrame || 
					window.mozRequestAnimationFrame    || 
					window.oRequestAnimationFrame      || 
					window.msRequestAnimationFrame     || 
					function (callback) {
						window.setTimeout(callback, 1000/60);
					};
				
				var canvas, ctx, w, h, particles = [], probability = 0.04,
					xPoint, yPoint;
				
				
				
				
				
				function onLoad() {
					canvas = document.getElementById("canvas");
					canvas.style.opacity = 0.15	
					ctx = canvas.getContext("2d");
					resizeCanvas();
					
					window.requestAnimationFrame(updateWorld);
				} 
				
				function resizeCanvas() {
					if (!!canvas) {
						w = canvas.width = window.innerWidth;
						h = canvas.height = window.innerHeight;
					}
				} 
				
				function updateWorld() {
					update();
					paint();
					window.requestAnimationFrame(updateWorld);
				} 
				
				function update() {
					if (particles.length < 500 && Math.random() < probability) {
						createFirework();
					}
					var alive = [];
					for (var i=0; i<particles.length; i++) {
						if (particles[i].move()) {
							alive.push(particles[i]);
						}
					}
					particles = alive;
				} 
				
				function paint() {
					ctx.globalCompositeOperation = 'source-over';
					ctx.fillStyle = "rgba(0,0,0,0.2)";
					ctx.fillRect(0, 0, w, h);
					ctx.globalCompositeOperation = 'lighter';
					for (var i=0; i<particles.length; i++) {
						particles[i].draw(ctx);
					}
				} 
				
				function createFirework() {
					xPoint = Math.random()*(w-200)+100;
					yPoint = Math.random()*(h-200)+100;
					var nFire = Math.random()*50+100;
					var c = "rgb("+(~~(Math.random()*200+55))+","
						 +(~~(Math.random()*200+55))+","+(~~(Math.random()*200+55))+")";
					for (var i=0; i<nFire; i++) {
						var particle = new Particle();
						particle.color = c;
						var vy = Math.sqrt(25-particle.vx*particle.vx);
						if (Math.abs(particle.vy) > vy) {
							particle.vy = particle.vy>0 ? vy: -vy;
						}
						particles.push(particle);
					}
				} 
				
				function Particle() {
					this.w = this.h = Math.random()*4+1;
					
					this.x = xPoint-this.w/2;
					this.y = yPoint-this.h/2;
					
					this.vx = (Math.random()-0.5)*10;
					this.vy = (Math.random()-0.5)*10;
					
					this.alpha = Math.random()*.5+.5;
					
					this.color;
				} 
				
				Particle.prototype = {
					gravity: 0.05,
					move: function () {
						this.x += this.vx;
						this.vy += this.gravity;
						this.y += this.vy;
						this.alpha -= 0.01;
						if (this.x <= -this.w || this.x >= screen.width ||
							this.y >= screen.height ||
							this.alpha <= 0) {
								return false;
						}
						return true;
					},
					draw: function (c) {
						c.save();
						c.beginPath();
						
						c.translate(this.x+this.w/2, this.y+this.h/2);
						c.arc(0, 0, this.w, 0, Math.PI*2);
						c.fillStyle = this.color;
						c.globalAlpha = this.alpha;
						
						c.closePath();
						c.fill();
						c.restore();
					}
        } 
			
			onLoad()
			}
          }

        });
      }
    });

    

})(jQuery);