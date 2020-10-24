{
    // Always update messages.
    const messages_node = document.querySelector('#messages');

    let msgcount = 1;        
    let old_messages = [];
    let showing_messages = [];
    let once = true;
    setInterval(() => {
        let xml = new XMLHttpRequest();
        xml.onreadystatechange = () => {
            if (xml.readyState == 4 && xml.status == 200){
                let msgs = xml.responseText;


                let msgs_each = msgs.split('{n}{e}{w}');
                msgs_each.pop();

                msgs_each.forEach(msginfo => {
                    let author = msginfo.split('{b}{r}{e}{a}{k}')[0];
                    let context = msginfo.split('{b}{r}{e}{a}{k}')[1];
                    let id = msginfo.split('{b}{r}{e}{a}{k}')[2];
                    let sent_at = msginfo.split('{b}{r}{e}{a}{k}')[3];

                    if (sent_at == '0 day 0 hour'){
                        sent_at = 'Less than an hour ago.';
                    }
                    else if (sent_at.indexOf('0 day') == -1){
                        if (sent_at.split(' day')[0] == '1'){
                            sent_at = sent_at.split(' day')[0] + ' day ago.';
                        }
                        else{
                            sent_at = sent_at.split(' day')[0] + ' days ago.';
                        }
                    }
                    else if (sent_at.indexOf('0 hour') == -1){
                        sent_at = sent_at.split('day ')[1] + ' ago.';
                    }

                    let formatted_msg = author+context+id;

                    if (showing_messages.indexOf(formatted_msg) == -1){
                        let fullmsg_node = document.createElement('p');
                        fullmsg_node.className = 'msg';
                        fullmsg_node.id = 'msg'+msgcount;
                        messages_node.appendChild(fullmsg_node);
    
                        let author_node = document.createElement('span');
                        author_node.className = 'author';
                        author_node.id = 'author'+msgcount;
                        author_node.innerHTML = author;
                        
                        let sentat_node = document.createElement('span');
                        sentat_node.className = 'sent_at';
                        sentat_node.id = 'sent_at'+msgcount;
                        sentat_node.innerHTML = sent_at;

                        let linebreak = document.createElement('br');

                        let context_node = document.createElement('span');
                        context_node.className = 'context';
                        context_node.id = 'context'+msgcount;
                        context_node.innerHTML = context;

    
                        fullmsg_node.appendChild(author_node);
                        fullmsg_node.appendChild(sentat_node);
                        fullmsg_node.appendChild(linebreak);
                        fullmsg_node.appendChild(context_node);
                        showing_messages.push(author+context+id);
                        msgcount++;
                    }
                });
            };
        }; 
        xml.open('POST', 'checknewmsg.php');
        xml.send();
    }, 20);


    // Post the message
    const msgctx_node = document.querySelector('#send-context');
    const msgsend_node = document.querySelector('#send');
    msgsend_node.onclick = () => {
        let xmlpost = new XMLHttpRequest();

        xmlpost.onreadystatechange = () => {
            if (xmlpost.readyState == 4 && xmlpost.status == 200){
                console.log(xmlpost.responseText);
            }
        }

        xmlpost.open('GET', `addnewmsg.php?msg=${msgctx_node.value}&author=${entered_as}`);
        xmlpost.send();

        msgctx_node.value = "";
        msgctx_node.innerHTML = "";


    };
};
