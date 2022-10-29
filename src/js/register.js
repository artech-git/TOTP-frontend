const email = document.getElementById("register_email");
const username = document.getElementById("register_username");
const password = document.getElementById("register_passwd");
const register = document.querySelector(".btn");
const pass_txt = document.getElementById("pword-txt");
const email_txt = document.getElementById("email-txt");
const email_err = document.getElementById("email-error");
const pass_err = document.getElementById("password-error");
const input = document.querySelector(".form-style");
const container = document.querySelector(".container");
const email_search = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const pass_search = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

register.addEventListener("click", (e) => {
  if (email.value === "" || !email.value.match(email_search)) {
    email.focus();
    e.preventDefault();
    email.style.borderColor = "#ec4846";
    email_txt.style.color = "#ec4846";
    email_err.innerText = " - This is not a valid email address";
  } else if (!password.value.match(pass_search)) {
    password.focus();
    e.preventDefault();
    password.style.borderColor = "#ec4846";
    pass_txt.style.color = "#ec4846";
    pass_err.innerText =
      " - Your Password must contain: \n- A lowercase letter \n- An uppercase letter \n- A number \n- Must be at least 8 characters long";
  } else {
    user.register = true;
    console.log("User registered!");
    reg_req(email.password, username.value, password.value);
  }
  setTimeout(() => {
    pass_txt.style.color = "#919296";
    email_txt.style.color = "#919296";
    pass_err.innerText = "";
    email_err.innerText = "";
    email.style.borderColor = "";
    password.style.borderColor = "";
  }, 2500);
});

async function reg_req(e, u, p) {
  /*
   * Payload for http://<URL>/signup ??
   *
   * let payload = {
   *   email: e,
   *   username: u,
   *   password: p,
   * };
   */

  let payload = {
    Id: 78912,
    Customer: "Jason Sweet",
    Quantity: 1,
    Price: 18.0,
  };

  const response = await fetch("https://reqbin.com/echo/post/json", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: payload,
  });

  response.json().then((data) => {
    console.log(data);
    qr = new QRious({
      element: document.getElementById("qr-code"),
      size: 170,
      value: data.success, // use proper response?
      // replace `data.success` with `data.token`
    });
  });
}

// background animation
const canvas = document.getElementById("svgBlob");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let numParticles = 20;
let particles = [];

const colors = ["#9192296", "#daa172", "#d69662"];
1;

const mouse = {
  x: null,
};

let user = {
  register: false,
};

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 200;
    this.radius = Math.random() * 6 + 3;
    this.speedX = Math.random() * 6;
    this.moveRight = this.x + this.speedX;
    this.moveLeft = this.x - this.speedX;
    this.speedY = Math.random() * 1;
    this.color = colors[Math.floor(Math.random() * 3)];
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.draw();
    if (!user.register) {
      this.y -= this.speedY;
    } else {
      this.y -= 10;
    }
    if (this.y <= canvas.height) {
      if (mouse.x > canvas.width / 2) {
        this.x = this.moveRight;
      } else {
        this.x = this.moveLeft;
      }
    }
  }
}

function setup() {
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
});

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    if (particle.y + particle.radius < 0) {
      setTimeout(() => {
        particles.splice(index, 1);
      }, 0);
      if (!user.register) {
        particles.push(new Particle());
      }
    }
  });
}
setup();
animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
