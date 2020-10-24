{
    // Handle username input fixation
    const username_node = document.querySelector('#username');

    setInterval(() => {
        username_node.setAttribute('maxlength', '13'); 
        username_node.minlength = username_node.setAttribute('minlength', '2');       
        username_node.minlength = username_node.setAttribute('required', 'true');       
    }, 1);   
};