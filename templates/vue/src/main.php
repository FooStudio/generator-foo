<!doctype html>
<html>
<head>
  <?php
    require('./lib/Meta.php');
    $meta = new Meta('share.json');
    $meta->write();
  ?>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=no">
<link rel="apple-touch-icon" sizes="180x180" href="static/img/favicons/apple-touch-icon.png">
<link rel="icon" type="image/png" href="static/img/favicons/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="static/img/favicons/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="static/img/favicons/manifest.json">
<link rel="mask-icon" href="static/img/favicons/safari-pinned-tab.svg" color="#5bbad5">
<link rel="shortcut icon" href="static/img/favicons/favicon.ico">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-TileImage" content="static/img/favicons/mstile-144x144.png">
<meta name="msapplication-config" content="static/img/favicons/browserconfig.xml">
<meta name="theme-color" content="#ffffff"></head>
  <body>
  <div id="main-loader">
      <h2> Loading </h2>
  </div>
  <div id="app"></div>
  <div id="fb-root"></div>
  <!-- built files will be auto injected -->
  </body>
</html>
