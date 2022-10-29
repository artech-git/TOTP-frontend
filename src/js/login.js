const email = document.getElementById("login_email");
const password = document.getElementById("login_passwd");
const token = document.getElementById("login_token");
const login = document.querySelector(".btn");
const pass_txt = document.getElementById("passwd-txt");
const email_txt = document.getElementById("email-txt");
const token_txt = document.getElementById("token-txt");
const email_err = document.getElementById("email-error");
const pass_err = document.getElementById("passwd-error");
const token_err = document.getElementById("token-error");
const input = document.querySelector(".form-style");
const container = document.querySelector(".container");
const email_search = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const pass_search = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

// dummy login data
const login_data = {
  email: "test@gmail.com",
  pass: "N!kk@t3st",
  token: "      ",
};

login.addEventListener("click", (e) => {
  if (email.value === "" || !email.value.match(email_search)) {
    email.focus();
    e.preventDefault();
    email.style.borderColor = "#ec4846";
    email_txt.style.color = "#ec4846";
    email_err.innerText = " - Incorrect email";
  } else if (!password.value.match(pass_search)) {
    password.focus();
    e.preventDefault();
    password.style.borderColor = "#ec4846";
    pass_txt.style.color = "#ec4846";
    pass_err.innerText = " - Incorrect password";
  } else if (token.value === "") {
    token.focus();
    e.preventDefault();
    token.style.borderColor = "#ec4846";
    token_txt.style.color = "#ec4846";
    token_err.innerText = " - Invalid token";
  } else {
    // console.log("Logged in")
    if (
      login_data.email === email.value &&
      login_data.pass === password.value
    ) {
      console.log("Credentials are OKAY AS FUCK");
      if (login_data.token === token.value) {
        /*
         * first res. string check
         * second res. string check
         * if (true) -> user.logged_in = true;
         */
        user.logged_in = true;
        console.clear()
        login_usr(email.value, password.value, token.value);
      } else {
        console.log("Auth token ain't tokenin'");
      }
    } else {
      console.log("Credentials ain't credentialing :(");
    }
  }
  setTimeout(() => {
    pass_txt.style.color = "#919296";
    email_txt.style.color = "#919296";
    token_txt.style.color = "#919296";
    pass_err.innerText = "";
    email_err.innerText = "";
    token_err.innerText = "";
    email.style.borderColor = "";
    password.style.borderColor = "";
    token.style.borderColor = "";
  }, 2500);
});

async function login_usr(e, u, t) {
  /*
   * Payload for http://<URL>/login ??
   *
   * let payload = {
   *   email: e,
   *   token: t,
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
    // return data.token;
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
  logged_in: false,
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
    if (!user.logged_in) {
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
      if (!user.logged_in) {
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
