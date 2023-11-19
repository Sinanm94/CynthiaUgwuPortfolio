const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

function firstPageAnim(){
  var tl = gsap.timeline();

  tl.from("#nav", {
    y:'-10',
    opacity:0,
    duration:2,
    ease: Expo.easeInOut
  })
  .to(".boundingelem", {
    y:0,
    ease: Expo.easeInOut,
    duration:2,
    delay:-1,
    stagger:.2
  })
  .from("#herofooter", {
    y:-10,
    opacity:0,
    duration:1.5,
    delay:-1,
    ease: Expo.easeInOut
  })
}

var timeout;


function circleFade(){
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function(dets){
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(.8,1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(.8,1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale,yscale);
    timeout = setTimeout(function(){
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px ) scale(1 ,1)`;
    },100)
  });
}


function circleMouseFollower(xscale,yscale){
  window.addEventListener("mousemove", function(dets){
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px ) scale(${xscale},${yscale})`;
  })
}

circleFade();
firstPageAnim();
circleMouseFollower();


document.querySelectorAll(".elem").forEach(function(elem) {
  var rotate = 0;
  var diffrot = 0;
  var img = elem.querySelector("img");

  elem.addEventListener("mousemove", function(dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    var rect = elem.getBoundingClientRect();
    var offsetX = dets.clientX - rect.left;
    var offsetY = dets.clientY - rect.top;

    var imgHalfWidth = img.clientWidth / 2;
    var imgHalfHeight = img.clientHeight / 2;

    gsap.to(img, {
      opacity: 1,
      ease: Power1.ease,
      top: gsap.utils.clamp(0, rect.height - img.clientHeight, offsetY - imgHalfHeight),
      left: gsap.utils.clamp(0, rect.width - img.clientWidth, offsetX - imgHalfWidth),
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });

  elem.addEventListener("mouseover", function() {
    gsap.to(img, {
      opacity: 1,
      ease: Power1.ease,
    });
  });

  elem.addEventListener("mouseout", function() {
    gsap.to(img, {
      opacity: 0,
      ease: Power1.ease,
    });
  });
});







