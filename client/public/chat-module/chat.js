// script for chat module
var body = document.getElementsByTagName("BODY")[0];
var chatButton = document.createElement("BUTTON");
var chatIcon=document.createElement('img')
var head = document.getElementsByTagName('head')[0];

// socket io
// var scriptsocket=document.createElement('script')

// scriptsocket.src='https://cdn.socket.io/4.4.1/socket.io.min.js';
// scriptsocket.integrity='sha384-fKnu0iswBIqkjxrhQCTZ7qlLHOFEgNkRmK2vaO/LbTZSXdJfAu6ewRBdwHPhBo/H'
// scriptsocket.crossorigin='crossorigin'
// head.appendChild(scriptsocket);
chatIcon.src='https://i.ibb.co/1LNw0Lf/chaticon.png'
chatIcon.alt='not loaded'
chatButton.appendChild(chatIcon)
function css(element, style) {
    for (const property in style)
        element.style[property] = style[property];
}

var chat = document.createElement('div')
var chatHeader=document.createElement('div')
var chatHeaderLeft=document.createElement('div')
var chatHeaderLeftImage=document.createElement('img')
chatHeaderLeftImage.src='https://i.ibb.co/vsQqSkr/userIcon.png'
var chatHeaderLeftName=document.createElement('span')
chatHeaderLeftName.innerHTML='Ahad Aman'
chatHeader.appendChild(chatHeaderLeft)
chatHeaderLeft.appendChild(chatHeaderLeftImage)
chatHeaderLeft.appendChild(chatHeaderLeftName)
chatHeaderRightButton=document.createElement('button')
chatHeaderRightButton.innerHTML='End chat'
chatHeader.appendChild(chatHeaderRightButton)

// body of chat Box
var chatBody=document.createElement('div')
var chatDateRow=document.createElement('div')
var chatDate=document.createElement('span')
var chatMessages=document.createElement('div')
chatDate.innerHTML='19:25 Monday'
chatDateRow.appendChild(chatDate)
//chat messages
    // Right Message
var RightMessage=document.createElement('div')
var RightMessageTitle=document.createElement('p')
var RightMessageBody=document.createElement('div')
RightMessageBody.innerHTML='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend fames varius lectus diam habitant sagittis,'
RightMessageTitle.innerHTML='Ali(Assistant)'
RightMessage.appendChild(RightMessageTitle)
RightMessage.appendChild(RightMessageBody)
chatMessages.append(RightMessage)
    // Left Message
    var LeftMessage=document.createElement('div')
    var LeftMessageTitle=document.createElement('p')
    var LeftMessageBody=document.createElement('div')
    LeftMessageBody.innerHTML='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend fames varius lectus diam habitant sagittis,'
    LeftMessageTitle.innerHTML='Me'
    LeftMessage.appendChild(LeftMessageTitle)
    LeftMessage.appendChild(LeftMessageBody)
    chatMessages.appendChild(LeftMessage)
    
   
    
 

//footer of chat box
var chatFooter=document.createElement('div')
var messageField=document.createElement('textarea')
messageField.placeholder='Enter Chat Here'
messageField.rows=1
var sendButton=document.createElement('button')
var icon=document.createElement('img')
icon.src='https://i.ibb.co/n8j8czF/send-Button.png'
sendButton.appendChild(icon)
chatFooter.appendChild(messageField)
chatFooter.appendChild(sendButton)
var nameInput = document.createElement('input')
var emailInput = document.createElement('input')
var messageInput = document.createElement('textarea')
var inputElements = document.getElementsByTagName('input')

// assign values
nameInput.placeholder = '*Name'
emailInput.placeholder = '*Email'
messageInput.placeholder = '*Message'
// appending
body.appendChild(chatButton)
body.appendChild(chat)
chat.appendChild(chatHeader)
chat.appendChild(chatBody)
chatBody.appendChild(chatDateRow)
chatBody.appendChild(chatMessages)
chat.appendChild(chatFooter)

css(chatButton, {
    background: 'linear-gradient(144.72deg, #1BA160 -58.12%, #2EDB90 136.39%)',
    border: '5px solid #FFFFFF',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
    color: 'red',
    padding: '15px',
    width:'75px',
    height:'75px',
    border: '0px',
    position: 'fixed',
    bottom: '0px',
    right: '0px',
    margin: '20px',
    'border-radius':'50%',
    zIndex:'99999'
});
css(chat, {
    overflow:'hidden',    
    boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.15)',
    borderRadius: '3px',
    height: '560px',
    width: '340px',
    minWidth:'300px',
    minHeight:'400px',
    display: 'none',
    // 'box-shadow': '5px 5px 5px #03A84E',
    position: 'fixed',
    bottom: '80px',
    right: '0px',
    margin: '20px',
    'background-color': '#fff',
    'flex-direction': 'column',
  
    // 'justify-content': 'space-around',
    'border-radius': '10px',
    transition: '',
    zIndex:'100000'
    // border:'1px solid red'


});

css(chatHeader, {
    padding: '15px',
    background: '#1BA160',
    display:'flex',
    justifyContent:'space-between',
    border: 'none',
    alignItems:'center',
    // 'box-shadow': '0px 8px 10px rgba(0, 0, 0, 0.3)',
    paddingLeft: '10px',
    paddingRight: '10px',
});
css(chatHeaderLeft, {
    gap:'10px',
    display:'flex',
    alignItems:'center',
});
css(chatHeaderLeftName, {
    color:'white',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    alignItems:'center',
});
css(chatHeaderRightButton, {
    background: '#198D55',
    borderRadius: '3px',
    border:'none',
    paddingLeft:'5px',
    paddingRight:'5px',
    paddingTop:'5px',
    paddingBottom:'5px',
    color:'white',
    fontEeight: '500'
});
css(chatBody,{
    padding: '15px',
display:'flex',
flexDirection:'column',
flexGrow:1
})
css(chatDateRow, {
    textAlign:'center',
    marginTop:'5px',
    marginBottom:'5px'
});
css(chatDate, {
    color: '#161C2D',
    textAlign:'center',
    marginTop:'5px',
    marginBottom:'5px',
    fontSize:'12px'
});
css(chatFooter,{
    display:'flex',
    
})
css(sendButton,{
    background: '#1BA160',
    paddingTop:'10px',
    paddingBottom:'10px',
    paddingRight:'20px',
    paddingLeft:'20px',
    border:'none'
})
css(messageField,{
    fontFamily: 'Poppins',

    flexGrow:1,
    border:'none',
    background: '#F4F4F4',
    padding:'10px',
    // paddingBottom:'10px',
})
css(chatMessages,{
    flexGrow:1,
    fontFamily: 'Poppins',
    // background:'red'
})

css(RightMessage,{
    width:'80%',
    marginLeft:'auto',
    marginRight:'10px'
  

})

css(RightMessageTitle,{
    marginBottom:'0px'
})
css(LeftMessageTitle,{
    marginBottom:'0px'
})
css(RightMessageBody,{
    background: '#FFFFFF',
    boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.15)',
    borderRadius: '10px 10px 0px 10px',
    padding:'10px',
    fontSize:'12px',
    fontWeight:'300'
})
css(LeftMessage,{
    width:'80%',
    marginRight:'auto',
    marginLeft:'10px'
  

})
css(LeftMessageBody,{
    background: '#1BA160',
    boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.15)',
    borderRadius: '10px 10px 10px 0px',
    padding:'10px',
    color:'white',
    fontSize:'12px',
    fontWeight:'300'
})

for (var i = 0; i < inputElements.length; i++) {
    css(inputElements[i], {
        display: 'block',
        margin: 0,
        padding: '10px',
        color: 'inherit',
        border: 'none',
        'border-radius': '0.4rem',
        transition: 'box-shadow var(--transitionDuration)'

    });
    console.log('hello')

}


chatButton.addEventListener('click', () => {
    console.log('button pressed')

    if (chat.style.display == 'flex') {
        chat.style.display = 'none'
        // chatButton.innerHTML = 'start chat'
    }

    else {
        chat.style.display = 'flex'
        // chatButton.innerHTML = 'close chat'
    }
})
chatHeaderRightButton.addEventListener('click',()=>{
   
        chat.style.display = 'none'
        // chatButton.innerHTML = 'start chat'
})
// socket client
var socket = io("https://localhost:3001", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});
socket.emit('chat message', 'hello ahad');






