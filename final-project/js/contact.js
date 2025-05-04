
  const textarea = document.querySelector("textarea[name='message']");
  const counter = document.createElement("small");
  const maxChars = 280;
  

  counter.style.display = "block";
  counter.style.textAlign = "right";
  counter.style.marginTop = "5px";
  counter.style.color = "#fff";
  

  textarea.parentNode.insertBefore(counter, textarea.nextSibling);
  

  textarea.addEventListener("input", () => {
    const currentLength = textarea.value.length;
  
    // Enforce the max limit manually (optional, HTML already has maxlength)
    if (currentLength > maxChars) {
      textarea.value = textarea.value.substring(0, maxChars);
    }
  
   
    counter.textContent = `${textarea.value.length} / ${maxChars} characters`;
  
    // Change color if at max
    counter.style.color = currentLength >= maxChars ? "red" : "#fff";
  });
  


document.querySelector("form").addEventListener("submit", function (e) {
  const btn = this.querySelector("button");
  btn.disabled = true;
  btn.innerText = "Sending...";
});


  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent actual submit 7ata ma yi3mal refresh lal page

 
    this.style.display = "none";
    const msg = document.createElement("div");
    msg.innerHTML = "<h2>✅ Thank you! We'll be in touch soon.</h2>";
    msg.style.marginTop = "30px";
    msg.style.fontSize = "20px";
    document.querySelector(".contact-box").appendChild(msg);
  });
//}

