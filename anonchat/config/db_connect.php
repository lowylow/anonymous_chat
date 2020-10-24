<?php

    // Connect to database
    $conn = mysqli_connect('localhost', 'exampleusername', 'examplepass', 'anonchat');

    // Check connection
    if(!$conn){  
        echo "Connection error: " . mysqli_connect_error();
    }
?>