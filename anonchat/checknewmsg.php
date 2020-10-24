<?php
    include('config/db_connect.php');

    $sql = "SELECT `id`, `author`, `context`, `sent_at`, `reload_needed` FROM `message_info` ORDER BY `id`";
    $query = mysqli_query($conn, $sql);
    $response = mysqli_fetch_all($query, MYSQLI_ASSOC);   

    function time2str($time) {
        $periods = array('day'=>86400, 'hour'=>3600);
        $ret = '';
        foreach($periods as $name => $seconds){
            $num = floor($time / $seconds);
            $time -= ($num * $seconds);
            $ret .= $num.' '.$name.''.(($num > 1) ? 's': '').' ';
        }
        return trim($ret);
    } 

    foreach ($response as $info){
        $newtime = time2str(time() - $info['sent_at']);
        echo trim($info['author']."{b}{r}{e}{a}{k}".$info['context']."{b}{r}{e}{a}{k}".$info['id']."{b}{r}{e}{a}{k}".$newtime."{b}{r}{e}{a}{k}".$info['reload_needed']."{n}{e}{w}");
    } 
?>