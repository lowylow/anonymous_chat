{
    const msgcontext_node = document.querySelector('#send-context');
    const msgsend_node = document.querySelector('#send');
    const charsleft_node = document.querySelector('#chars-left');

    const minchar = 1;
    const maxchar = 100;

    let charsleft;
    let charslefttxt;
    msgcontext_node.oninput = () => {
        if (msgcontext_node.value.length > maxchar){
            msgcontext_node.setAttribute('maxlength', '100');
            msgcontext_node.value = msgcontext_node.value.slice(0, maxchar);
        }
        else if (msgcontext_node.value.length < minchar){
            msgcontext_node.setAttribute('required', 'true');
            msgcontext_node.setAttribute('minlength', '1');
        }
        charsleft = maxchar - msgcontext_node.value.length;
        charslefttxt = `${charsleft} chars left.`;
        switch (charsleft){
            case 1:
                charsleft_node.innerHTML = '1 char left.';
                break;
            case 0:
                charsleft_node.innerHTML = 'no chars left.';
                break;
            default:
                charsleft_node.innerHTML = charslefttxt;
                break;
        }
    };

    const messages_div = document.querySelector('#messages')
    let messages;
    let colorlist = ['cyan', 'red', 'gold', 'whitesmoke', 'purple', 'lime', 'teal', 'brown'];
    let INDEX;
    let randomcolor;
    let currentauthor;  
    let authors = [];
    let count = 0;
    // Handle author coloring
    setInterval(() => {
        messages = document.querySelectorAll('.msg');
        messages.forEach(message => {
            function colorize(){
                INDEX = Math.floor(Math.random()*colorlist.length);
                randomcolor = colorlist[INDEX];
                currentauthor = message.firstChild;
                if (authors.indexOf(currentauthor.innerHTML) != '-1'){
                    currentauthor.setAttribute('style', `color: ${authors[authors.indexOf(currentauthor.innerHTML) + 1]}`)
                }
                else{
                    if (count < 10){
                        if (authors.indexOf(randomcolor) != "-1"){
                            count++;
                            colorize();
                        }
                        else{
                            currentauthor.setAttribute('style', `color: ${randomcolor};`);
                            authors.push(currentauthor.innerHTML);
                            authors.push(randomcolor)
                            count = 0;
                        }
                    }
                    else{
                        currentauthor.setAttribute('style', `color: ${randomcolor};`);
                        authors.push(currentauthor.innerHTML);
                        authors.push(randomcolor)
                        count = 0;
                    }
                }
            }
            colorize();
        });
    }, 100)

    setTimeout(() => {
        // Handle client text styling
        setInterval(() => {
            let msgs_node = document.querySelectorAll('.context');
            msgs_node.forEach(msgn => {
                // Hidden text with message header
                if (msgn.innerText.split('||').length == 3){
                    let secrettext = msgn.innerText.split('||')[1];
                    let showntitle = msgn.innerText.split('||')[2];
                    if (showntitle.trim() == ''){
                        showntitle = 'spoiler';
                    }
                    if (secrettext.trim() == ''){
                        secrettext = 'boom!';
                    }
                    msgn.innerText = showntitle
                    msgn.className += ' clienthiddenheader';
                    msgn.setAttribute('onclick', `revealtext("${secrettext}", "${msgn.id}")`);
                    msgn.style.cursor = 'pointer';
                }
                // Super text
                if (msgn.innerText.split('***').length == 3){
                    msgn.innerHTML = msgn.innerText.split('***')[1].bold()
                    msgn.className += ' clientsuper';
                }
                // Bold text
                if (msgn.innerText.split('**').length == 3){
                    msgn.innerHTML = msgn.innerText.split('**')[1].bold()
                    msgn.className += ' clientbold';
                }
                // Italic text
                if (msgn.innerText.split('*').length == 3){
                    msgn.innerText = msgn.innerText.split('*')[1];
                    msgn.className += ' clientitalic';
                }
                // Custom color text
                //.
                // Gold text
                if (msgn.innerText.split('$$').length == 3){
                    msgn.innerText = msgn.innerText.split('$$')[1];
                    msgn.className += ' clientgold'
                }
            })
        }, 100)
    },200)
    // Hidden text with message header [2]
    function revealtext(text, nodeid){
        let node = document.querySelector('#'+nodeid);
        node.style.cursor = 'default';
        node.style.backgroundColor = 'rgb(45,45,45)';
        setTimeout(() => {
            node.innerText = text;
        }, 150)
    }

    // Handle autoscrolling
    setTimeout(() => {
        scrollTo(0, document.querySelector('#messages').scrollHeight);
    }, 200)
};