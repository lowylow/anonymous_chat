{
    const msgcontext_node = document.querySelector('#send-context');
    const msgsend_node = document.querySelector('#send');
    const charsleft_node = document.querySelector('#chars-left');

    const EnterKey = 13;

    let shiftdown = false;

    msgcontext_node.onkeydown = (event) => {
        if (event.keyCode == EnterKey){
            if(!shiftdown){
                event.preventDefault();
                msgsend_node.click();

                charsleft_node.innerHTML = '100 chars left.';
                setTimeout(() => {scrollTo(0, document.querySelector('#messages').scrollHeight)}, 200);
            }
        }
        else if (event.key.toLowerCase() == 'shift'){
            shiftdown = true;
        }
    }
    msgcontext_node.onkeyup = (event) => {
        if (event.key.toLowerCase() == 'shift'){
            shiftdown = false;
        }
    }

    msgsend_node.onclick = () => {
        setTimeout(() => {scrollTo(0, document.querySelector('#messages').scrollHeight)}, 200);
    }
}