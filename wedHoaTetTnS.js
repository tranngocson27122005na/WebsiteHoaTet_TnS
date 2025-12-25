/* ---------------- GIỎ HÀNG ---------------- */
let cart=[], total=0;
function updateCart(){
    const cartEl=document.getElementById("cart-items"); cartEl.innerHTML="";
    cart.forEach(i=>{const li=document.createElement("li"); li.textContent=`${i.name} - ${i.price.toLocaleString()}₫`; cartEl.appendChild(li);});
    document.getElementById("total").innerText=total.toLocaleString()+"₫";
}
document.querySelectorAll(".add-cart").forEach(btn=>{
    btn.addEventListener("click",()=>{
        const p=btn.closest(".product"); const name=p.dataset.name; const price=Number(p.dataset.price);
        cart.push({name, price}); total+=price;
        const totalEl=document.getElementById("total"); totalEl.style.transform="scale(1.3)";
        setTimeout(()=>totalEl.style.transform="scale(1)",300); updateCart();
        addBotAutoMessage(`Bạn vừa thêm <b>${name}</b> vào giỏ. Tổng hiện tại: ${total.toLocaleString()}₫`);
    });
});

/* ---------------- CHATBOT ---------------- */
const chatInput=document.getElementById("chat-input");
const chatMessages=document.getElementById("chat-messages");

async function sendUserMessage(msg){
    if(!msg) return;
    chatMessages.innerHTML+=`<div class="user-message">${msg}</div>`;
    chatInput.value=""; chatMessages.scrollTop=chatMessages.scrollHeight;
    await sendBotMessage(msg);
}

async function sendBotMessage(message){
    const botLoading=document.createElement("div"); botLoading.className="bot-message"; 
    botLoading.innerHTML='<span class="typing-dot">•</span><span class="typing-dot">•</span><span class="typing-dot">•</span> Đang trả lời...';
    chatMessages.appendChild(botLoading); chatMessages.scrollTop=chatMessages.scrollHeight;
    try{
        await new Promise(r=>setTimeout(r,1000)); // Demo typing
        let botReply="";
        if(message.toLowerCase().includes("hoa ly")) botReply="🌸 Hoa Ly 300,000₫/bó. Bạn muốn thêm vào giỏ không🌸?";
        else if(message.toLowerCase().includes("hoa đào")) botReply="🌸 Hoa Đào 500,000₫/bó. Bạn muốn thêm vào giỏ không🌸?";
        else if(message.toLowerCase().includes("hoa mai")) botReply="🌸 Hoa Mai 700,000₫/bó. Bạn muốn thêm vào giỏ không🌸?";
        else if(message.toLowerCase().includes("đơn hàng")) botReply=`✅ Đơn hàng hiện tại:\n${cart.map(i=>i.name+' - '+i.price.toLocaleString()+'₫').join('\n')}\nTổng: ${total.toLocaleString()}₫`;
        else botReply="Xin chào! Bạn muốn xem hoa nào hôm nay? Bạn có thể nhấn vào gợi ý bên dưới.🌸";

        botLoading.remove();
        const botDiv=document.createElement("div"); botDiv.className="bot-message"; botDiv.innerHTML=botReply;
        chatMessages.appendChild(botDiv); chatMessages.scrollTop=chatMessages.scrollHeight;

        if(botReply.includes("Bạn có thể nhấn")){
            ["Hoa Ly","Hoa Đào","Hoa Mai"].forEach(p=>{
                const btn=document.createElement("button"); btn.className="chat-btn"; btn.textContent=p;
                btn.onclick=()=> sendUserMessage(p);
                chatMessages.appendChild(btn);
            });
        }

    }catch(e){ console.error(e); botLoading.textContent="Có lỗi xảy ra, vui lòng thử lại!"; }
}

document.getElementById("chat-send").addEventListener("click",()=>sendUserMessage(chatInput.value.trim()));
chatInput.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault(); sendUserMessage(chatInput.value.trim());}});

/* ---------------- TỰ GỬI TIN NHẮN MẪU ---------------- */
const autoMessages=["Chào bạn! Tôi có thể giúp gì hôm nay?","🌸Bạn muốn xem các loại hoa Tết nổi bật không?","Nhấn vào hoa để thêm vào giỏ nhanh nhé!🌸"];
let autoIndex=0;
function addBotAutoMessage(msg){
    const botDiv=document.createElement("div"); botDiv.className="bot-message auto-message"; botDiv.innerHTML=msg;
    chatMessages.appendChild(botDiv); chatMessages.scrollTop=chatMessages.scrollHeight;
}
setInterval(()=>{addBotAutoMessage(autoMessages[autoIndex]); autoIndex=(autoIndex+1)%autoMessages.length;},15000);
